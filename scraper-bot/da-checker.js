const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function getRealMetrics(domain) {
  console.log(`🔍 Fetching real-time DA & Spam Score for: ${domain}...`);
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // Using a reliable free checker
    await page.goto('https://websiteseochecker.com/domain-authority-checker/', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Fill the form
    await page.type('#dom', domain);
    
    // Click check (Note: This site often has a captcha, so we try our best or use a workaround)
    await page.click('#check');
    
    // Wait for results table
    await page.waitForSelector('.table-responsive', { timeout: 15000 });
    
    const metrics = await page.evaluate(() => {
      const rows = document.querySelectorAll('table tr');
      if (rows.length > 1) {
        const cells = rows[1].querySelectorAll('td');
        return {
          da: parseInt(cells[3]?.innerText) || 0,
          pa: parseInt(cells[4]?.innerText) || 0,
          spam_score: parseInt(cells[5]?.innerText.replace('%', '')) || 0,
          age: cells[7]?.innerText || 'N/A'
        };
      }
      return null;
    });

    if (metrics) {
      console.log(`✅ Success: DA ${metrics.da} | Spam: ${metrics.spam_score}%`);
      return metrics;
    }
  } catch (err) {
    console.error(`❌ Scraping failed: ${err.message}`);
    // Fallback to a secondary site or return null
  } finally {
    await browser.close();
  }
  return null;
}

async function bulkCheck(domains) {
  const finalResults = [];
  for (const domain of domains) {
    const result = await getRealMetrics(domain);
    if (result) finalResults.push({ domain, ...result });
    // Random delay to avoid IP blocks
    await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
  }
  return finalResults;
}

if (require.main === module) {
  const domains = process.argv.slice(2);
  if (domains.length > 0) {
    bulkCheck(domains).then(res => console.log(JSON.stringify(res, null, 2)));
  } else {
    console.log("Usage: node da-checker.js domain1.com domain2.com");
  }
}

module.exports = { getRealMetrics, bulkCheck };
