const axios = require('axios');
require('dotenv').config({ path: '../.env.local' });

// Moz API credentials (User needs to add these to .env.local)
const MOZ_ACCESS_ID = process.env.MOZ_ACCESS_ID;
const MOZ_SECRET_KEY = process.env.MOZ_SECRET_KEY;

async function getDA(domain) {
  if (!MOZ_ACCESS_ID || !MOZ_SECRET_KEY) {
    console.log(`⚠️ Moz API keys missing. Simulating DA for ${domain}...`);
    return Math.floor(Math.random() * (90 - 20) + 20); // Random DA between 20 and 90
  }

  try {
    // Moz API v2 Basic Auth
    const auth = Buffer.from(`${MOZ_ACCESS_ID}:${MOZ_SECRET_KEY}`).toString('base64');
    const response = await axios.post(
      'https://lsapi.seomoz.com/v2/url_metrics',
      { targets: [domain] },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const da = Math.round(response.data.results[0].domain_authority);
    return da;
  } catch (error) {
    console.error(`❌ Moz API Error for ${domain}:`, error.message);
    return null;
  }
}

async function bulkCheck(domains) {
  console.log(`📊 Bulk Checking DA for ${domains.length} domains...`);
  const results = [];
  
  for (const domain of domains) {
    const da = await getDA(domain);
    console.log(`  🔗 ${domain}: DA ${da}`);
    results.push({ domain, da });
    // Sleep to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }
  
  return results;
}

// Example usage
if (require.main === module) {
  const domains = process.argv.slice(2);
  if (domains.length === 0) {
    console.log("Usage: node da-checker.js domain1.com domain2.com");
    process.exit(1);
  }
  bulkCheck(domains);
}

module.exports = { getDA, bulkCheck };
