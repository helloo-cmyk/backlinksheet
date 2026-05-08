const fs = require('fs');

const sitesTsPath = 'd:/backlink-saas/src/data/sites.ts';
let content = fs.readFileSync(sitesTsPath, 'utf8');

// The issue is in the "tip" field where multiple quotes were appended.
// We'll use a regex to find "tip": followed by any number of quotes and clean them up.
// Regex explained: 
// "tip":\s*      -> find the tip key
// ("+)?          -> find any number of leading double quotes
// (.*?)          -> capture the content
// ("+)?          -> find any number of trailing double quotes
// ,\n            -> until the end of the line

content = content.replace(/"tip":\s*"+(.*?)"*,?\n/g, (match, p1) => {
    // Escape any double quotes inside the string and wrap in single double quotes
    const cleanText = p1.replace(/"/g, '\\"').trim();
    return `        "tip": "${cleanText}",\n`;
});

fs.writeFileSync(sitesTsPath, content);
console.log("✅ Fixed all quote syntax errors in src/data/sites.ts");
