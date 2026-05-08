// SEO Engine with Lazy Loading to fix Next.js build errors
export async function verifyBacklinkRealtime(siteUrl: string, targetUrl: string) {
  // Lazy load modules only when called
  const puppeteer = (await import('puppeteer-extra')).default;
  const StealthPlugin = (await import('puppeteer-extra-plugin-stealth')).default;
  
  if (!(puppeteer as any)._plugins?.length) {
    (puppeteer as any).use(StealthPlugin());
  }

  console.log(`📡 Real-time Monitoring: ${siteUrl}`);
  
  const browser = await (puppeteer as any).launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    const response = await page.goto(siteUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    if (!response || response.status() !== 200) {
      return { status: 'dead', error: `Site Offline (Status: ${response?.status()})` };
    }

    // Check for "Domain Parked" or "For Sale" indicators
    const isDead = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();
      return text.includes('domain for sale') || text.includes('this domain is parked') || text.includes('buy this domain');
    });

    if (isDead) {
      return { status: 'dead', error: 'Domain Expired/Parked' };
    }
    
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
  const puppeteer = (await import('puppeteer-extra')).default;
  const StealthPlugin = (await import('puppeteer-extra-plugin-stealth')).default;
  
  if (!(puppeteer as any)._plugins?.length) {
    (puppeteer as any).use(StealthPlugin());
  }

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
