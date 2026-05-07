import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { createClient } from '@supabase/supabase-js';

// Setup Stealth
puppeteer.use(StealthPlugin());

export async function verifyBacklinkRealtime(siteUrl: string, targetUrl: string) {
  console.log(`📡 Real-time Monitoring: ${siteUrl}`);
  
  const browser = await (puppeteer as any).launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.goto(siteUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const linkInfo = await page.evaluate((target: string) => {
      const links = Array.from(document.querySelectorAll('a'));
      const foundLink = links.find(a => a.href.includes(target) || a.innerText.includes(target));
      return foundLink ? {
        exists: true,
        isNoFollow: foundLink.rel.includes('nofollow'),
        anchorText: foundLink.innerText.trim()
      } : { exists: false };
    }, targetUrl);

    return { status: linkInfo.exists ? 'live' : 'dropped', details: linkInfo };
  } catch (err: any) {
    return { status: 'error', error: err.message };
  } finally {
    await browser.close();
  }
}

export async function getRealDA(domain: string) {
  const browser = await (puppeteer as any).launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto('https://websiteseochecker.com/domain-authority-checker/', { waitUntil: 'networkidle2' });
    await page.type('#dom', domain);
    await page.click('#check');
    await page.waitForSelector('.table-responsive', { timeout: 10000 });
    
    const metrics = await page.evaluate(() => {
      const row = document.querySelectorAll('table tr')[1];
      const cells = row?.querySelectorAll('td');
      return cells ? {
        da: parseInt(cells[3]?.innerText) || 0,
        ss: parseInt(cells[5]?.innerText.replace('%', '')) || 0
      } : null;
    });
    return metrics;
  } catch (err) {
    return null;
  } finally {
    await browser.close();
  }
}
