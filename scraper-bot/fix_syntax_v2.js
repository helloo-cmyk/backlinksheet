const fs = require('fs');

function fixFile(path) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    
    // Fix the "tip" field
    // It should be "tip": "string",
    // We find cases where it has multiple quotes or starts with triple quotes
    
    const lines = content.split('\n');
    const fixedLines = lines.map(line => {
        if (line.includes('"tip":')) {
            // Extract the content between the first and last quote
            // Example: "tip": """text",
            const match = line.match(/"tip":\s*"+(.*?)"*,?$/);
            if (match) {
                const text = match[1].replace(/"/g, '\\"').trim();
                return `        "tip": "${text}",`;
            }
        }
        return line;
    });
    
    fs.writeFileSync(path, fixedLines.join('\n'));
    console.log(`✅ Fixed ${path}`);
}

fixFile('d:/backlink-saas/src/data/sites.ts');
fixFile('d:/ibratgenerator/src/data/sites.ts');
