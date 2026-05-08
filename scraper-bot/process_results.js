const fs = require('fs');
const path = require('path');

const csvPath = 'd:/backlink-saas/scraper-bot/master_results.csv';
const sitesTsPath = 'd:/backlink-saas/src/data/sites.ts';

if (!fs.existsSync(csvPath)) {
    console.error("CSV file not found.");
    process.exit(1);
}

const csvData = fs.readFileSync(csvPath, 'utf8');
const lines = csvData.split('\n');
const headers = lines[0].split(',');

const sitesTsContent = fs.readFileSync(sitesTsPath, 'utf8');

const relevantKeywords = ['submit', 'directory', 'list', 'saas', 'startup', 'tool', 'ai', 'add', 'database', 'discover', 'explore'];
const irrelevantKeywords = ['windows', 'how to', 'support', 'lifewire', 'geek', 'config', 'support.microsoft', 'theitbros', 'solveyourtech', 'thewindowsclub', 'techbout', 'howtogeek', 'windowsdigitals', 'windowsreport', 'intowindows', 'elevenforum', 'shellhacks', 'superuser', 'stackoverflow', 'spiceworks', 'techviral', 'windowsloop', 'popularmechanics', 'thisoldhouse', 'homegrail', 'bobvila', 'familyhandyman', 'tooltrip', 'popsci', 'ranker'];

const cleanResults = [];
const seenDomains = new Set();

// Extract domains from sites.ts to avoid duplicates
const domainRegex = /https?:\/\/([^\/\s"']+)/g;
let match;
while ((match = domainRegex.exec(sitesTsContent)) !== null) {
    seenDomains.add(match[1].replace('www.', '').toLowerCase());
}

lines.slice(1).forEach(line => {
    if (!line.trim()) return;
    
    // Split by comma but handle potential quotes
    const parts = line.split(',');
    if (parts.length < 2) return;
    
    const title = parts[0].trim().replace(/^"|"$/g, '');
    const url = parts[1].trim().replace(/^"|"$/g, '');
    const snippet = parts.slice(2).join(',').trim().replace(/^"|"$/g, '');

    const lowerTitle = title.toLowerCase();
    const lowerSnippet = snippet.toLowerCase();
    const lowerUrl = url.toLowerCase();

    // 1. Basic relevance check
    const isRelevant = relevantKeywords.some(kw => lowerTitle.includes(kw) || lowerSnippet.includes(kw));
    const isIrrelevant = irrelevantKeywords.some(kw => lowerTitle.includes(kw) || lowerSnippet.includes(kw) || lowerUrl.includes(kw));

    if (isRelevant && !isIrrelevant) {
        try {
            const domain = new URL(url).hostname.replace('www.', '').toLowerCase();
            if (!seenDomains.has(domain)) {
                seenDomains.add(domain);
                cleanResults.push({ title, url, snippet });
            }
        } catch (e) {}
    }
});

console.log(`✅ Filtered down to ${cleanResults.length} high-quality, new sites.`);

// Save cleaned CSV
const newCsvContent = [lines[0], ...cleanResults.map(r => `"${r.title}","${r.url}","${r.snippet}"`)].join('\n');
fs.writeFileSync(csvPath, newCsvContent);

// Prepare sites.ts additions
// Find the last ID in sites.ts
const idMatch = sitesTsContent.match(/"id":\s*(\d+)/g);
let lastId = 0;
if (idMatch) {
    lastId = Math.max(...idMatch.map(m => parseInt(m.match(/\d+/)[0])));
}

const newSites = cleanResults.map((site, index) => {
    const id = lastId + index + 1;
    return `    {
        "id": ${id},
        "category": "New Scraped Discoveries",
        "name": "${site.title.split(' - ')[0].split(' | ')[0].trim()}",
        "da": 30, // Default for new discoveries
        "type": "Dofollow",
        "url": "${site.url}",
        "steps": [
            "Visit the submission page.",
            "Fill in your tool details (Name, URL, Tagline).",
            "Submit for review."
        ],
        "tip": "${site.snippet.slice(0, 100)}...",
        "pricing": "Free"
    }`;
});

if (newSites.length > 0) {
    // Append to sites.ts before the final ]
    const lastBracketIndex = sitesTsContent.lastIndexOf('];');
    const updatedContent = sitesTsContent.slice(0, lastBracketIndex).trim() + ',\n' + newSites.join(',\n') + '\n];';
    fs.writeFileSync(sitesTsPath, updatedContent);
    console.log(`🚀 Successfully added ${newSites.length} sites to src/data/sites.ts`);
} else {
    console.log("No new sites to add to database.");
}
