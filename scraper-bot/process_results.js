const fs = require('fs');
const csv = require('csv-parser');

const results = [];
const sitesTsPath = '../src/data/sites.ts';
let lastId = 600; // Starting ID for new discoveries

// Read existing sites.ts to avoid duplicates and find last ID
if (fs.existsSync(sitesTsPath)) {
    const content = fs.readFileSync(sitesTsPath, 'utf8');
    const idMatches = content.match(/"id":\s*(\d+)/g);
    if (idMatches) {
        lastId = Math.max(...idMatches.map(m => parseInt(m.match(/\d+/)[0]))) + 1;
    }
}

console.log(`🚀 Starting merge from master_results.csv (Starting ID: ${lastId})`);

fs.createReadStream('master_results.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Filter for quality and relevance
    const filtered = results.filter(site => {
        const title = site['Website Title']?.toLowerCase() || '';
        const url = site['Target URL']?.toLowerCase() || '';
        const snippet = site['Description/Snippet']?.toLowerCase() || '';
        
        // Exclude common irrelevant stuff
        const irrelevant = ['facebook', 'twitter', 'linkedin', 'google', 'blog', 'news', 'article', 'how-to', 'guide'];
        const isIrrelevant = irrelevant.some(term => title.includes(term) || url.includes(term));
        
        // Must look like a directory or submission page
        const isSubmission = title.includes('submit') || title.includes('add') || title.includes('directory') || title.includes('list') ||
                           url.includes('submit') || url.includes('directory') || url.includes('add');
        
        return !isIrrelevant && isSubmission;
    });

    console.log(`✅ Filtered ${filtered.length} high-quality candidates from ${results.length} total raw links.`);

    let newEntries = '';
    filtered.forEach((site, index) => {
        const id = lastId + index;
        const title = site['Website Title'].split(' - ')[0].split(' | ')[0].trim();
        const url = site['Target URL'];
        const snippet = site['Description/Snippet'].slice(0, 150).replace(/"/g, "'") + '...';
        const email = site['Contact Email'] || '';
        const contactUrl = site['Contact/Submit Page'] || '';

        newEntries += `    {
        "id": ${id},
        "category": "New Scraped Discoveries",
        "name": "${title}",
        "da": 30,
        "type": "Dofollow",
        "url": "${url}",
        "steps": [
            "Visit the submission page.",
            "Fill in your tool details.",
            "Submit for review."
        ],
        "tip": "${snippet}",
        "pricing": "Free",
        "contact_email": "${email}",
        "contact_url": "${contactUrl}"
    },\n`;
    });

    if (newEntries) {
        let sitesContent = fs.readFileSync(sitesTsPath, 'utf8');
        // Find the last closing bracket of the array
        const lastBracketIndex = sitesContent.lastIndexOf('];');
        const updatedContent = sitesContent.slice(0, lastBracketIndex) + newEntries + sitesContent.slice(lastBracketIndex);
        
        fs.writeFileSync(sitesTsPath, updatedContent);
        console.log(`🎉 Successfully appended ${filtered.length} new sites to src/data/sites.ts`);
    } else {
        console.log("⚠️ No new qualifying sites found to append.");
    }
  });
