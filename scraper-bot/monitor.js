const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

puppeteer.use(StealthPlugin());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyBacklink(siteUrl, targetUrl) {
  console.log(`📡 Verifying: ${targetUrl} on ${siteUrl}...`);
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    await page.goto(siteUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Check for the link in the DOM
    const linkInfo = await page.evaluate((target) => {
      const links = Array.from(document.querySelectorAll('a'));
      const foundLink = links.find(a => a.href.includes(target) || a.innerText.includes(target));
      
      if (foundLink) {
        return {
          exists: true,
          isNoFollow: foundLink.rel.includes('nofollow'),
          isSponsered: foundLink.rel.includes('sponsored'),
          anchorText: foundLink.innerText.trim()
        };
      }
      return { exists: false };
    }, targetUrl);

    if (linkInfo.exists) {
      console.log(`✅ LINK FOUND! Type: ${linkInfo.isNoFollow ? 'NoFollow' : 'DoFollow'}`);
      return { status: 'live', details: linkInfo };
    } else {
      console.log(`❌ LINK NOT FOUND.`);
      return { status: 'dropped', details: null };
    }
  } catch (err) {
    console.error(`⚠️ Error checking ${siteUrl}: ${err.message}`);
    return { status: 'error', details: err.message };
  } finally {
    await browser.close();
  }
}

async function runBulkMonitor(projectId) {
  console.log(`🚀 Starting Bulk Monitor for Project: ${projectId}`);
  
  const { data: project } = await supabase.from('projects').select('*').eq('id', projectId).single();
  const { data: backlinks } = await supabase.from('project_backlinks').select('*').eq('project_id', projectId);

  if (!backlinks || backlinks.length === 0) {
    console.log("No backlinks to monitor.");
    return;
  }

  for (const link of backlinks) {
    // We need the site URL from the sitesData or local db
    // For now, let's assume we store the 'url' in the backlink record or can fetch it
    const result = await verifyBacklink(link.site_url, project.target_url);
    
    await supabase.from('project_backlinks')
      .update({ 
        status: result.status, 
        last_checked_at: new Date().toISOString(),
        notes: `Auto-verified: ${result.status === 'live' ? 'Found' : 'Missing'}`
      })
      .eq('id', link.id);
  }
  
  console.log("🏁 Monitor batch complete.");
}

module.exports = { verifyBacklink, runBulkMonitor };
