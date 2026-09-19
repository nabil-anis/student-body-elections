const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../src/screens.tsx');
let content = fs.readFileSync(filepath, 'utf8');

const celebrateRegex = /export const CelebrateScreen = \(\{ subtext, onContinue \}: any\) => \([\s\S]*?<\/ScreenWrapper>\n\);/m;
const celebrateReplacement = `export const CelebrateScreen = ({ subtext, onDone, onVoteMore }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft mb-1">
        <Check size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">Vote recorded.</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{subtext}</p>
      <div className="mt-6 w-full max-w-[260px] flex flex-col gap-3">
        <Button variant="accent" onClick={onDone}>Done</Button>
        <Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Others</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;

// There might be another variation if my previous script did a partial update before.
// I will just use string replacement if possible.
const oldCelebrate = `export const CelebrateScreen = ({ subtext, onContinue }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft mb-1">
        <Check size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">Vote recorded.</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{subtext}</p>
      <div className="mt-2.5 w-full max-w-[220px]">
        <Button variant="accent" onClick={onContinue}>Continue</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;

if (content.includes(oldCelebrate)) {
  content = content.replace(oldCelebrate, celebrateReplacement);
} else {
  // Try regex
  content = content.replace(celebrateRegex, celebrateReplacement);
}

const oldWasted = `export const WastedScreen = ({ line1, line2, onContinue }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#fdeceb] mb-1">
        <XCircle size={32} className="text-danger" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">{line1}</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{line2}</p>
      <div className="mt-2.5 w-full max-w-[240px]">
        <Button onClick={onContinue}>Continue Anyway</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;

const wastedReplacement = `export const WastedScreen = ({ line1, line2, onDone, onVoteMore }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#fdeceb] mb-1">
        <XCircle size={32} className="text-danger" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">{line1}</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{line2}</p>
      <div className="mt-6 w-full max-w-[260px] flex flex-col gap-3">
        <Button variant="danger" className="bg-danger text-white hover:bg-danger/90" onClick={onDone}>Done</Button>
        <Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Others</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;

if (content.includes(oldWasted)) {
  content = content.replace(oldWasted, wastedReplacement);
} else {
  const wastedRegex = /export const WastedScreen = \(\{ line1, line2, onContinue \}: any\) => \([\s\S]*?<\/ScreenWrapper>\n\);/m;
  content = content.replace(wastedRegex, wastedReplacement);
}

fs.writeFileSync(filepath, content);
console.log('Fixed screens buttons');
