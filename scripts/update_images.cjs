const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/screens.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
    'usaid': '/assets/usaid.jpeg',
    'mohsin': '/assets/mohsin.jpeg',
    'fatima': '/assets/Fatima.jpeg',
    'nabil': '/assets/nabil.jpeg',
    'sabeen': '/assets/Sabeen.jpeg',
    'rumaisa': '/assets/rumaisa.jpeg',
    'sarib': '/assets/Sarib.jpeg',
    'shafaq': '/assets/Shafaq.jpeg',
    'bakhtawar': '/assets/bakhtawar.jpeg',
    'amna': '/assets/Amna.jpeg'
};

for (const [candidate, img] of Object.entries(replacements)) {
    const regex = new RegExp(`(candidateId="${candidate}"[\\s\\S]*?imageSrc=")[^"]+(")`, 'g');
    content = content.replace(regex, `$1${img}$2`);
}

fs.writeFileSync(filePath, content);
console.log("Images updated!");
