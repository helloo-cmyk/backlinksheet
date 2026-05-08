const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, 'ibrat-next', 'src', 'app');
const dirs = fs.readdirSync(srcAppDir);

const toolPageDirs = dirs.filter(d => d.includes('brat') && d.includes('generator') || d === 'brat-maker');

const snippet = `
      {/* TOOL CALLOUT */}
      <section className="bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 text-center text-sm sm:text-base text-foreground/80">
          Use the <Link href="/" className="font-semibold text-primary hover:underline">free brat generator</Link> to create text, images, memes, and album covers in one place.
        </div>
      </section>
`;

toolPageDirs.forEach(dir => {
  if (dir === 'brat-text-generator') return; // We already edited this one specifically

  const pagePath = path.join(srcAppDir, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    if (content.includes('free brat generator') && content.includes('create text, images, memes, and album covers')) {
      console.log(`Skipping ${dir}, already has callout`);
      return;
    }

    // Insert after <main className="space-y-10">
    const lines = content.split('\n');
    const mainIndex = lines.findIndex(l => l.includes('<main className="space-y-10">'));
    if (mainIndex !== -1) {
      lines.splice(mainIndex + 1, 0, snippet);
      fs.writeFileSync(pagePath, lines.join('\n'));
      console.log(`Updated ${dir}`);
    } else {
      console.log(`Could not find <main> in ${dir}`);
    }
  }
});
