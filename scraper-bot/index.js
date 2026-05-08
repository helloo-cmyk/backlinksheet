const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const fileName = 'master_results.csv';

async function scrapeDuckDuckGo(keywords) {
  if (!keywords || keywords.length === 0) {
    console.error("Please provide search keywords.");
    process.exit(1);
  }

  const seenUrls = new Set();
  
  // 1. Load from static sites.ts to avoid duplicates from the built-in list
  try {
    const { sitesData } = require('../src/data/sites');
    sitesData.forEach(s => seenUrls.add(s.url.trim()));
    console.log(`📊 Pre-loaded ${seenUrls.size} sites from sites.ts`);
  } catch (e) { console.log("⚠️ Could not load sites.ts for duplicate checking."); }

  // 2. Load from master_results.csv
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName, 'utf8');
    content.split('\n').forEach(line => {
      // Improved regex to handle quoted URLs in CSV
      const match = line.match(/"(https?:\/\/[^"]+)"/) || line.match(/(https?:\/\/[^\s,]+)/);
      if (match) seenUrls.add((match[1] || match[0]).trim());
    });
    console.log(`📂 Total seen URLs (including CSV): ${seenUrls.size}`);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const allResults = [];
  
  for (const query of keywords) {
    console.log(`\n🔎 Searching Footprint: "${query}"`);
    let searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    
    try {
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });
      
      const searchResults = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.result')).map(item => {
          const titleEl = item.querySelector('.result__title .result__a');
          const urlEl = item.querySelector('.result__url');
          if (titleEl && urlEl) {
            let rawUrl = urlEl.getAttribute('href').trim();
            const title = titleEl.innerText.trim();
            
            // Filter out submission services and agencies
            const badKeywords = ['we submit', 'submit your saas', 'submission service', 'effortlessly', 'list of directories', 'agency', 'marketing'];
            const isBad = badKeywords.some(kw => title.toLowerCase().includes(kw));
            
            if (isBad) return null;

            if (rawUrl.includes('uddg=')) {
              const match = rawUrl.match(/uddg=([^&]+)/);
              if (match) rawUrl = decodeURIComponent(match[1]);
            }
            return { title: title, url: rawUrl };
          }
          return null;
        }).filter(r => r && r.url.startsWith('http'));
      });

      for (const res of searchResults) {
        if (seenUrls.has(res.url)) continue;

        console.log(`  👀 Checking: ${res.url}`);
        
        // 1. Visit the page to see if it's a LIST or a DIRECTORY
        try {
          const subPage = await browser.newPage();
          const response = await subPage.goto(res.url, { waitUntil: 'networkidle2', timeout: 20000 });
          
          if (!response || response.status() !== 200) {
            console.log(`    ❌ Skipping broken link: ${res.url} (Status: ${response ? response.status() : 'Timeout'})`);
            await subPage.close();
            continue;
          }

          const pageType = await subPage.evaluate(() => {
            const text = document.body.innerText.toLowerCase();
            const title = document.title.toLowerCase();
            const linkCount = document.querySelectorAll('a').length;
            
            const hasDirectoryIntent = title.includes('directory') || title.includes('submit') || title.includes('list') || text.includes('add your startup');
            const isList = text.includes('list of') || text.includes('directories') || (linkCount > 40 && text.includes('submit'));
            
            if (!hasDirectoryIntent && linkCount < 10) return 'TRASH';
            return isList ? 'LIST' : 'DIRECTORY';
          });

          if (pageType === 'TRASH') {
            console.log(`    🗑️ Identified as irrelevant content. Skipping.`);
            await subPage.close();
            continue;
          }

          if (pageType === 'LIST') {
            console.log(`    📜 Identified as a LIST PAGE. Extracting directory links...`);
            const subLinks = await subPage.evaluate(() => {
              return Array.from(document.querySelectorAll('a'))
                .map(a => ({ title: a.innerText.trim(), url: a.href }))
                .filter(a => {
                  const isExternal = a.url.startsWith('http') && !a.url.includes(window.location.hostname);
                  const isLikelyDirectory = a.title.toLowerCase().includes('submit') || a.title.toLowerCase().includes('directory') || a.url.includes('submit');
                  return isExternal && isLikelyDirectory;
                });
            });

            console.log(`    ✨ Found ${subLinks.length} sub-directories in this list.`);
            for (const sub of subLinks) {
              if (!seenUrls.has(sub.url)) {
                seenUrls.add(sub.url);
                allResults.push({ title: sub.title, url: sub.url, source: res.url, type: 'EXTRACTED' });
              }
            }
          } else {
            // It's a direct directory, extract contact info
            const contactInfo = await subPage.evaluate(() => {
              const emailMatch = document.body.innerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
              const contactLink = Array.from(document.querySelectorAll('a')).find(a => a.innerText.toLowerCase().includes('contact') || a.href.toLowerCase().includes('contact'));
              return { email: emailMatch ? emailMatch[0] : '', contactUrl: contactLink ? contactLink.href : '' };
            });

            seenUrls.add(res.url);
            allResults.push({ 
              title: res.title, 
              url: res.url, 
              source: 'SEARCH', 
              type: 'DIRECTORY',
              email: contactInfo.email,
              contact_url: contactInfo.contactUrl
            });
          }
          await subPage.close();
        } catch (e) {
          console.error(`    ⚠️ Failed to crawl ${res.url}: ${e.message}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error searching "${query}":`, err.message);
    }
  }

  await browser.close();

  if (allResults.length > 0) {
    const csvWriter = createObjectCsvWriter({
      path: fileName,
      header: [
        { id: 'title', title: 'Website Title' },
        { id: 'url', title: 'Target URL' },
        { id: 'type', title: 'Type' },
        { id: 'source', title: 'Found via List' },
        { id: 'email', title: 'Contact Email' },
        { id: 'contact_url', title: 'Contact Page' }
      ],
      append: fs.existsSync(fileName)
    });

    await csvWriter.writeRecords(allResults);
    console.log(`\n🎉 DONE! Added ${allResults.length} records (including sub-links from lists).`);
  }
}

let keywords = process.argv.slice(2);
if (keywords.length === 0) {
  keywords = ["list of startup directories", "submit saas tool directory", "places to get backlinks for startups"];
}

scrapeDuckDuckGo(keywords);
