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

            const uselessDomains = ['facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com', 'youtube.com', 'google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com', 'wikipedia.org'];
            const isUseless = uselessDomains.some(domain => rawUrl.toLowerCase().includes(domain));

            if (!isUseless && rawUrl.startsWith('http')) {
              results.push({
                title: titleEl.innerText.trim().replace(/,/g, ''), // Basic CSV escaping
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
          seenUrls.add(res.url);
          allResults.push(res);
          addedCount++;
        }
      }
      console.log(`✅ Added ${addedCount} new unique links. Total in memory: ${allResults.length}`);

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
        { id: 'snippet', title: 'Description/Snippet' }
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
  keywords = [
    "submit a tool",
    "add startup directory",
    "submit SaaS tool",
    "startup submission sites",
    "list of tool directories",
    "submit website for review",
    "SaaS tool list",
    "submit startup for free",
    "add your tool to directory",
    "best tool submission sites"
  ];
}

scrapeDuckDuckGo(keywords);
