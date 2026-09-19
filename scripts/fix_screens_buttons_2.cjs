const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../src/screens.tsx');
let content = fs.readFileSync(filepath, 'utf8');

// Replace CelebrateScreen signature and button
content = content.replace(
  /export const CelebrateScreen = \(\{ subtext, onContinue \}: any\) => \(/g,
  'export const CelebrateScreen = ({ subtext, onDone, onVoteMore }: any) => ('
);

content = content.replace(
  /<Button variant="accent" onClick=\{onContinue\}>Continue<\/Button>/g,
  '<div className="w-full max-w-[260px] flex flex-col gap-3 -ml-4"><Button variant="accent" onClick={onDone}>Done</Button><Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Others</Button></div>'
);

// Replace WastedScreen signature and button
content = content.replace(
  /export const WastedScreen = \(\{ line1, line2, onContinue \}: any\) => \(/g,
  'export const WastedScreen = ({ line1, line2, onDone, onVoteMore }: any) => ('
);

content = content.replace(
  /<Button onClick=\{onContinue\}>Continue Anyway<\/Button>/g,
  '<div className="w-full max-w-[260px] flex flex-col gap-3 -ml-2"><Button variant="danger" className="bg-danger text-white hover:bg-danger/90" onClick={onDone}>Done</Button><Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Others</Button></div>'
);

fs.writeFileSync(filepath, content);
console.log('Fixed screens again');
