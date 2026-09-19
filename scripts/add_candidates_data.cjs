const fs = require('fs');
const path = require('path');
let content = fs.readFileSync(path.join(__dirname, '../src/data.ts'), 'utf8');

const newCandidates = `
    maryam: { name: "Maryam Batook", discourage: false },
    waqar: { name: "Waqar Soomro", discourage: false },
    minhaj: { name: "Minhaj Akbar", discourage: false },
    hamna: { name: "Hamna Ali", discourage: false },
    abdul: { name: "Abdul Rehman", discourage: false },`;

if (!content.includes('maryam:')) {
    content = content.replace('candidates: {', 'candidates: {' + newCandidates);
}

// Ensure Event Society has vp and gensec in positions
const eventSocietyPositions = `    "event-society": [
      { id: "president", name: "President", available: true },
      { id: "vp", name: "Vice President", available: true },
      { id: "gensec", name: "General Secretary", available: true },
    ] as Position[]`;

content = content.replace(/"event-society":\s*\[[\s\S]*?\]\s*as\s*Position\[\]/, eventSocietyPositions);

fs.writeFileSync(path.join(__dirname, '../src/data.ts'), content);
console.log('Updated data.ts');
