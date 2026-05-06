const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const directoryPath = 'd:/backlink-saas/scraper-bot';
const masterFile = path.join(directoryPath, 'master_results.csv');
const seenUrls = new Set();
const allResults = [];

// 1. Read existing master file if it exists to preserve data
if (fs.existsSync(masterFile)) {
    const content = fs.readFileSync(masterFile, 'utf8');
    const lines = content.split('\n');
    lines.forEach(line => {
        const match = line.match(/https?:\/\/[^\s,]+/);
        if (match) seenUrls.add(match[0].trim());
    });
}

// 2. Read all result files
const files = fs.readdirSync(directoryPath).filter(file => file.startsWith('results_') && file.endsWith('.csv'));

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').slice(1); // Skip header

    lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.split(',');
        if (parts.length >= 2) {
            const title = parts[0].trim();
            const url = parts[1].trim();
            const snippet = parts.slice(2).join(',').trim();

            if (url.startsWith('http') && !seenUrls.has(url)) {
                seenUrls.add(url);
                allResults.push({ title, url, snippet });
            }
        }
    });
});

console.log(`📊 Found ${allResults.length} new unique results to merge.`);

if (allResults.length > 0) {
    const csvWriter = createObjectCsvWriter({
        path: masterFile,
        header: [
            { id: 'title', title: 'Website Title' },
            { id: 'url', title: 'Target URL' },
            { id: 'snippet', title: 'Description/Snippet' }
        ],
        append: fs.existsSync(masterFile)
    });

    csvWriter.writeRecords(allResults).then(() => {
        console.log(`✅ Successfully merged all files into master_results.csv`);
        
        // 3. Delete old files
        files.forEach(file => {
            fs.unlinkSync(path.join(directoryPath, file));
            console.log(`🗑️ Deleted ${file}`);
        });
    });
} else {
    console.log("No new unique results found to merge.");
}
