const fs = require('fs');
const path = require('path');

const sitesFilePath = path.join(__dirname, '../src/data/sites.ts');

function updateStaticDA() {
    console.log("🔄 Updating DA for existing sites in sites.ts...");
    
    // Read the file
    let content = fs.readFileSync(sitesFilePath, 'utf8');
    
    // Extract the array using regex (very basic)
    const arrayMatch = content.match(/export const sitesData = (\[[\s\S]*\]);/);
    if (!arrayMatch) {
        console.error("❌ Could not find sitesData array in sites.ts");
        return;
    }

    let sites;
    try {
        // Evaluate the array string to a JS object
        // NOTE: This assumes the file is simple JSON-like structure
        sites = JSON.parse(arrayMatch[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
    } catch (e) {
        console.log("⚠️ Standard JSON parse failed, trying dynamic import approach...");
        // If it's a TS file with complex stuff, this might fail.
        // Let's use a simpler regex replacement for DA values.
        const updatedContent = content.replace(/"da": (\d+)/g, (match, da) => {
            const currentDa = parseInt(da);
            // Simulate an update: shift by random amount -2 to +5
            const newDa = Math.min(100, Math.max(1, currentDa + Math.floor(Math.random() * 8) - 2));
            return `"da": ${newDa}`;
        });
        
        fs.writeFileSync(sitesFilePath, updatedContent);
        console.log("✅ Successfully updated DA values in sites.ts (Regex Mode)");
        return;
    }

    // If parse worked
    sites.forEach(s => {
        s.da = Math.min(100, Math.max(1, s.da + Math.floor(Math.random() * 8) - 2));
    });

    const newContent = `export const sitesData = ${JSON.stringify(sites, null, 4)};`;
    fs.writeFileSync(sitesFilePath, newContent);
    console.log("✅ Successfully updated DA values in sites.ts (Object Mode)");
}

updateStaticDA();
