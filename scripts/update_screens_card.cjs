const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../src/screens.tsx'), 'utf8');

const celebrateRegex = /export const CelebrateScreen = \(\{\s*subtext,\s*onContinue\s*\}:\s*any\)\s*=>\s*\([\s\S]*?<\/ScreenWrapper>\n\);/m;
const celebrateReplacement = `export const CelebrateScreen = ({ subtext, onDone, onVoteMore }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft mb-1">
        <Check size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">Vote recorded.</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{subtext}</p>
      <div className="mt-4 w-full max-w-[260px] flex flex-col gap-2.5">
        <Button variant="accent" onClick={onDone}>Done</Button>
        <Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Someone Else</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;
content = content.replace(celebrateRegex, celebrateReplacement);

const wastedRegex = /export const WastedScreen = \(\{\s*line1,\s*line2,\s*onContinue\s*\}:\s*any\)\s*=>\s*\([\s\S]*?<\/ScreenWrapper>\n\);/m;
const wastedReplacement = `export const WastedScreen = ({ line1, line2, onDone, onVoteMore }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#fdeceb] mb-1">
        <XCircle size={32} className="text-danger" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">{line1}</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{line2}</p>
      <div className="mt-4 w-full max-w-[260px] flex flex-col gap-2.5">
        <Button variant="danger" className="bg-danger text-white hover:bg-danger/90" onClick={onDone}>Done</Button>
        <Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Someone Else</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;
content = content.replace(wastedRegex, wastedReplacement);

fs.writeFileSync(path.join(__dirname, '../src/screens.tsx'), content);
console.log('Screens basic update complete');
