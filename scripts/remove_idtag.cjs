const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../src/screens.tsx'), 'utf8');

// 1. Remove age "21" next to Nabil's name
content = content.replace(
  `{name} {candidateId === 'nabil' && <span className="text-[16px] font-normal opacity-90 mb-0.5">21</span>}`,
  `{name}`
);

// 2. Remove idTag display block
content = content.replace(
  /\s*\{idTag && \(\s*<div className="text-white\/90[^>]*>\s*<span className="w-2[^>]*><\/span> \{idTag\}\s*<\/div>\s*\)\}/g,
  ''
);

// 3. Remove all idTag= props from FeaturedCandidate usages
content = content.replace(/\s*idTag="[^"]*"\r?\n/g, '\n');

fs.writeFileSync(path.join(__dirname, '../src/screens.tsx'), content);
console.log('Successfully removed idTag and age from screens.tsx');
