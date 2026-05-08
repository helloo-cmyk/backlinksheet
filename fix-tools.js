const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, 'ibrat-next', 'src', 'app');
const dirs = fs.readdirSync(srcAppDir);

const toolPageDirs = dirs.filter(d => d.includes('brat') && d.includes('generator') || d === 'brat-maker');

const pSnippet = `            <p className="mb-5">
              Looking for the full tool? Use the <Link href="/" className="text-primary underline hover:no-underline font-semibold">free brat generator</Link> to create images, memes, and more in one place.
            </p>`;

toolPageDirs.forEach(dir => {
  if (dir === 'brat-text-generator') return; // We didn't add it here

  const pagePath = path.join(srcAppDir, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // 1. Remove TOOL CALLOUT block
    const calloutRegex = /\s*\{\/\* TOOL CALLOUT \*\/\}\s*<section className="bg-primary\/5 border-b border-primary\/10">\s*<div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 text-center text-sm sm:text-base text-foreground\/80">\s*Use the <Link href="\/" className="font-semibold text-primary hover:underline">free brat generator<\/Link> to create text, images, memes, and album covers in one place.\s*<\/div>\s*<\/section>\s*/m;
    content = content.replace(calloutRegex, '\n\n');

    // Remove legacy one if it had a different format
    const fallbackCalloutRegex = /\s*<section className="bg-primary\/5 border-b border-primary\/10">[\s\S]*?<\/section>\s*/m;
    if (content.includes('TOOL CALLOUT')) {
      content = content.replace(/\s*\{\/\* TOOL CALLOUT \*\/\}\s*/g, '');
      content = content.replace(fallbackCalloutRegex, '\n\n');
    }

    // 2. Add the paragraph after the first <p className="mb-5"> in the text-center div
    if (!content.includes('Looking for the full tool?')) {
        // Find the first </p> after an <h1>
        const h1Index = content.indexOf('<h1');
        if (h1Index !== -1) {
            const firstPAfterH1 = content.indexOf('</p>', h1Index);
            if (firstPAfterH1 !== -1) {
                const insertPos = firstPAfterH1 + 4;
                content = content.substring(0, insertPos) + '\n' + pSnippet + content.substring(insertPos);
                fs.writeFileSync(pagePath, content);
                console.log(`Updated ${dir}`);
                return;
            }
        }
    }
  }
});
