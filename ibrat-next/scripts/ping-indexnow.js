const https = require('https');

const KEY = 'ibrat-index-now-key-2026';
const HOST = 'ibratgenerator.com';

// The URL you want to index is passed as an argument
const targetUrl = process.argv[2];

if (!targetUrl) {
  console.error('\n❌ Please provide a URL to ping.');
  console.error('Usage: node scripts/ping-indexnow.js <URL>');
  console.error('Example: node scripts/ping-indexnow.js https://ibratgenerator.com/blog/brat-summer-meaning/\n');
  process.exit(1);
}

// Ensure the URL belongs to the domain
if (!targetUrl.startsWith(`https://${HOST}`)) {
  console.error(`\n❌ Error: The URL must start with https://${HOST}\n`);
  process.exit(1);
}

console.log(`\n🚀 Pinging IndexNow for: ${targetUrl}...`);

// The IndexNow API endpoint
const apiUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(targetUrl)}&key=${KEY}`;

https.get(apiUrl, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Success! Search engines (Bing, Yandex, Seznam) have been notified.');
    console.log('They will crawl the URL shortly to update their indexes.\n');
  } else if (res.statusCode === 202) {
    console.log('⏳ Accepted. The URL was received and will be processed.');
  } else if (res.statusCode === 400) {
    console.error('❌ Bad Request (400). Invalid URL format.');
  } else if (res.statusCode === 403) {
    console.error('❌ Forbidden (403). The key was not valid or could not be found on the server.');
    console.error(`Make sure https://${HOST}/${KEY}.txt is accessible!`);
  } else {
    console.error(`⚠️ Unexpected response status: ${res.statusCode}`);
  }
}).on('error', (e) => {
  console.error(`❌ Request failed: ${e.message}\n`);
});
