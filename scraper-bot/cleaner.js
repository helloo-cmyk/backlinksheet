const fs = require('fs');

const fileName = 'master_results.csv';
const uselessKeywords = [
  'we submit',
  'submit your saas',
  'submission service',
  'effortlessly',
  'list of directories',
  'submission sites list',
  'automate your submission',
  'listingbott',
  'submitsaas.com',
  'submitsuite',
  'submitatool',
  'submitpal'
];

function cleanDatabase() {
  if (!fs.existsSync(fileName)) {
    console.error("❌ master_results.csv not found.");
    return;
  }

  console.log("🧹 Cleaning database from useless submission services...");
  
  const content = fs.readFileSync(fileName, 'utf8');
  const lines = content.split('\n');
  const header = lines[0];
  const dataLines = lines.slice(1);

  let removedCount = 0;
  const cleanedLines = dataLines.filter(line => {
    const isUseless = uselessKeywords.some(kw => line.toLowerCase().includes(kw));
    if (isUseless) {
      removedCount++;
      return false;
    }
    return true;
  });

  fs.writeFileSync(fileName, header + '\n' + cleanedLines.join('\n'));
  
  console.log(`✅ Cleaned! Removed ${removedCount} useless sites.`);
  console.log(`📊 Remaining unique sites: ${cleanedLines.length}`);
}

cleanDatabase();
