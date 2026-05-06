const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config({ path: '../.env.local' });

puppeteer.use(StealthPlugin());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for backend updates

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBacklinks() {
  console.log("📡 Starting Backlink Monitor...");
  
  // 1. Fetch all 'live' backlinks and their project target URLs
  const { data: backlinks, error } = await supabase
    .from('project_backlinks')
    .select(`
      id,
      site_id,
      status,
      projects ( target_url )
    `)
    .eq('status', 'live');

  if (error) {
    console.error("❌ Error fetching backlinks:", error.message);
    return;
  }

  if (!backlinks || backlinks.length === 0) {
    console.log("✅ No live backlinks to check.");
    return;
  }

  console.log(`🔍 Found ${backlinks.length} live backlinks to verify.`);

  const browser = await puppeteer.launch({ headless: "new" });
  
  // We need the actual URLs from our sites.ts or master_results.csv
  // For now, we assume the user has entered the 'Live' URL in notes or we use a fallback
  // In a real scenario, we'd store the 'verified_url' in the DB.
  // For this demo, let's assume we are checking the site's main URL.
  
  const { sitesData } = require('../src/data/sites');

  for (const bl of backlinks) {
    const site = sitesData.find(s => s.id === bl.site_id);
    if (!site) continue;

    const targetUrl = bl.projects.target_url;
    const siteUrl = site.url;

    console.log(`👀 Checking ${site.name} (${siteUrl}) for ${targetUrl}...`);

    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
      await page.goto(siteUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      const content = await page.content();
      const isFound = content.toLowerCase().includes(targetUrl.toLowerCase().replace('https://', '').replace('http://', '').split('/')[0]);

      if (isFound) {
        console.log(`  ✅ Link found!`);
        await supabase
          .from('project_backlinks')
          .update({ last_checked_at: new Date().toISOString() })
          .eq('id', bl.id);
      } else {
        console.log(`  ❌ Link NOT found! Marking as DROPPED.`);
        await supabase
          .from('project_backlinks')
          .update({ 
            status: 'dropped',
            last_checked_at: new Date().toISOString(),
            notes: `⚠️ DROPPED: Could not find ${targetUrl} on this page at ${new Date().toLocaleDateString()}`
          })
          .eq('id', bl.id);
      }
      await page.close();
    } catch (err) {
      console.error(`  ⚠️ Failed to check ${site.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log("🏁 Backlink check complete.");
}

checkBacklinks();
