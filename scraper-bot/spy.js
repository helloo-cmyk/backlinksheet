const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

puppeteer.use(StealthPlugin());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function spyCompetitor(domain) {
  console.log(`🕵️‍♂️ Starting Spy Mode for: ${domain}`);
  
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Search footprint: find pages mentioning the domain but NOT the domain itself
  const query = `"${domain}" -site:${domain} directory OR submit OR "add tool"`;
  const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;

  try {
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    
    // Extract results
    const results = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.result__title a'))
        .map(a => ({
          name: a.innerText,
          url: a.href
        }))
        .filter(r => r.url.includes('http'));
    });

    console.log(`📊 Found ${results.length} potential competitor backlinks.`);
    
    // Save to a specific file
    const spyFile = `./spy_results_${domain.replace(/\./g, '_')}.csv`;
    const csvHeader = "Name,URL\n";
    const csvRows = results.map(r => `"${r.name}","${r.url}"`).join('\n');
    fs.writeFileSync(spyFile, csvHeader + csvRows);

    console.log(`✅ Results saved to ${spyFile}`);
  } catch (err) {
    console.error(`❌ Spy failed: ${err.message}`);
  }

  await browser.close();
}

const targetDomain = process.argv[2];
if (!targetDomain) {
  console.error("Usage: node spy.js competitor.com");
  process.exit(1);
}

spyCompetitor(targetDomain);
