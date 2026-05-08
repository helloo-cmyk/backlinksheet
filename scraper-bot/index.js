const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

puppeteer.use(StealthPlugin());

async function scrapeDuckDuckGo(keywords) {
  if (!keywords || keywords.length === 0) {
    console.error("Please provide search keywords.");
    process.exit(1);
  }

  const fileName = 'master_results.csv';
  const seenUrls = new Set();

  // Load existing URLs from master_results.csv if it exists
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName, 'utf8');
    const lines = content.split('\n');
    lines.forEach(line => {
      // Very basic URL extraction from CSV line
      const match = line.match(/https?:\/\/[^\s,]+/);
      if (match) seenUrls.add(match[0].trim());
    });
    console.log(`📂 Pre-loaded ${seenUrls.size} existing URLs from ${fileName}`);
  }

  console.log(`🚀 Starting scraper for ${keywords.length} footprints...`);
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const allResults = [];
  
  for (const query of keywords) {
    if (allResults.length >= 200) break; 

    console.log(`\n🔎 Footprint: "${query}"`);
    let currentUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    
    try {
      await page.goto(currentUrl, { waitUntil: 'domcontentloaded' });
      
      const pageData = await page.evaluate(() => {
        const items = document.querySelectorAll('.result');
        const results = [];
        
        items.forEach(item => {
          const titleEl = item.querySelector('.result__title .result__a');
          const urlEl = item.querySelector('.result__url');
          const snippetEl = item.querySelector('.result__snippet');
          
          if (titleEl && urlEl) {
            let rawUrl = urlEl.getAttribute('href').trim();
            if (rawUrl.includes('uddg=')) {
              const match = rawUrl.match(/uddg=([^&]+)/);
              if (match) rawUrl = decodeURIComponent(match[1]);
            }
            if (rawUrl.startsWith('//')) rawUrl = 'https:' + rawUrl;

            const uselessDomains = ['facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com', 'youtube.com', 'google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com', 'wikipedia.org', 'medium.com', 'reddit.com', 'quora.com', 'lifewire.com', 'howtogeek.com', 'techcrunch.com', 'theverge.com', 'forbes.com', 'businessinsider.com', 'nytimes.com', 'theguardian.com'];
            const uselessKeywords = ['blog', 'how to', 'best of', 'article', 'guide', 'news', 'tutorial', 'top 10', 'review', 'why', 'what is', 'compare', 'vs', 'features of'];

            const isUselessDomain = uselessDomains.some(domain => rawUrl.toLowerCase().includes(domain));
            const isUselessContent = uselessKeywords.some(kw => 
              titleEl.innerText.toLowerCase().includes(kw) || 
              (snippetEl && snippetEl.innerText.toLowerCase().includes(kw))
            );

            if (!isUselessDomain && !isUselessContent && rawUrl.startsWith('http')) {
              results.push({
                title: titleEl.innerText.trim().replace(/,/g, ''),
                url: rawUrl,
                snippet: snippetEl ? snippetEl.innerText.trim().replace(/,/g, '') : ''
              });
            }
          }
        });
        return results;
      });

      let addedCount = 0;
      for (const res of pageData) {
        if (!seenUrls.has(res.url)) {
          console.log(`🕵️ Deep crawling: ${res.url}...`);
          try {
            const deepPage = await browser.newPage();
            await deepPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
            await deepPage.goto(res.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
            
            const contactInfo = await deepPage.evaluate(() => {
              const emailMatch = document.body.innerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
              const links = Array.from(document.querySelectorAll('a'));
              const contactLink = links.find(a => 
                a.innerText.toLowerCase().includes('contact') || 
                a.innerText.toLowerCase().includes('submit') ||
                a.href.toLowerCase().includes('contact') ||
                a.href.toLowerCase().includes('submit')
              );
              
              return {
                email: emailMatch ? emailMatch[0] : '',
                contactUrl: contactLink ? contactLink.href : ''
              };
            });
            
            res.email = contactInfo.email;
            res.contactUrl = contactInfo.contactUrl;
            await deepPage.close();
          } catch (deepErr) {
            console.log(`⚠️ Deep crawl failed for ${res.url}: ${deepErr.message}`);
          }

          seenUrls.add(res.url);
          allResults.push(res);
          addedCount++;
        }
      }
      console.log(`✅ Added ${addedCount} new unique links with contact info. Total: ${allResults.length}`);

    } catch (err) {
      console.error(`❌ Error scraping "${query}":`, err.message);
    }
  }

  await browser.close();

  if (allResults.length > 0) {
    const csvWriter = createObjectCsvWriter({
      path: fileName,
      header: [
        { id: 'title', title: 'Website Title' },
        { id: 'url', title: 'Target URL' },
        { id: 'snippet', title: 'Description/Snippet' },
        { id: 'email', title: 'Contact Email' },
        { id: 'contactUrl', title: 'Contact/Submit Page' }
      ],
      append: fs.existsSync(fileName) // Append if file exists
    });

    await csvWriter.writeRecords(allResults);
    console.log(`\n🎉 DONE! Added ${allResults.length} new unique opportunities to ${fileName}.`);
  } else {
    console.log("❌ No NEW results found. All scraped links were already in the master file.");
  }
}

// Support for multiple keywords from command line or default list
let keywords = process.argv.slice(2);
if (keywords.length === 0) {
  // Default list if none provided
    // High-intent footprints for direct submission portals
    "inurl:submit-tool \"SaaS\"",
    "inurl:add-listing \"Directory\"",
    "intitle:\"submit your tool\"",
    "intitle:\"submit your startup\" -blog",
    "inurl:directory \"add a site\"",
    "\"submit a tool\" \"for free\"",
    "\"add your startup\" directory",
    "inurl:/submit \"tool\"",
    "inurl:add-startup \"list\"",
    "\"submit a SaaS\" -article -guide"
  ];
}

scrapeDuckDuckGo(keywords);
