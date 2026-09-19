const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../src/screens.tsx'), 'utf8');

// 1. Add new imports at the top
if (!content.includes("import { toPng } from 'html-to-image';")) {
  content = content.replace(
    "import { Check, Mic, Globe, Trophy, Users, Loader2, XCircle, AlertCircle, Quote } from 'lucide-react';",
    "import { Check, Mic, Globe, Trophy, Users, Loader2, XCircle, AlertCircle, Quote, Share, Download, CheckCircle2 } from 'lucide-react';\nimport { toPng } from 'html-to-image';\nimport { useRef, useEffect } from 'react';"
  );
}

// 2. Replace CelebrateScreen
const celebrateRegex = /export const CelebrateScreen = \(\{\s*subtext,\s*onContinue\s*\}:\s*any\)\s*=>\s*\([\s\S]*?<\/ScreenWrapper>\n\);/m;
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
        <Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Someone Else</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;
if(content.match(celebrateRegex)) {
    content = content.replace(celebrateRegex, celebrateReplacement);
}

// 3. Replace WastedScreen
const wastedRegex = /export const WastedScreen = \(\{\s*line1,\s*line2,\s*onContinue\s*\}:\s*any\)\s*=>\s*\([\s\S]*?<\/ScreenWrapper>\n\);/m;
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
        <Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Someone Else</Button>
      </div>
    </div>
  </ScreenWrapper>
);`;
if (content.match(wastedRegex)) {
    content = content.replace(wastedRegex, wastedReplacement);
}

// 4. Append the new screens
const newScreens = `

const LoadingText = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute inset-0 flex items-center justify-center text-center px-4"
  >
    <h2 className="text-[19px] font-extrabold font-['Inter_Tight'] tracking-wide">{text}</h2>
  </motion.div>
);

export const GeneratingScreen = ({ onComplete }: any) => {
  const [step, setStep] = useState(0);
  const steps = [
    "FINALIZING DEMOCRATIC DAMAGE...",
    "COUNTING QUESTIONABLE DECISIONS...",
    "CONSULTING ARISTOTLE...",
    "GENERATING VOTER PROFILE..."
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      } else {
        setStep(currentStep);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft animate-spin mb-8">
        <Loader2 size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <div className="relative h-12 w-full">
        <AnimatePresence mode="wait">
          <LoadingText key={step} text={steps[step] || ""} />
        </AnimatePresence>
      </div>
    </div>
  );
};

const getPersonality = (votes: any[]) => {
  const count = votes.length;
  const hasNabil = votes.some((v: any) => v.candidateId === 'nabil');
  const hasSarib = votes.some((v: any) => v.candidateId === 'sarib');
  const hasWasted = votes.some((v: any) => v.candidateId.startsWith('candidate'));

  if (count === 0) return { title: "THE BYSTANDER", desc: "You didn't vote for anyone. A true observer of chaos." };
  if (hasNabil && hasSarib) return { title: "THE POWER BROKER", desc: "Aligning with the strongest auras. Very strategic." };
  if (hasWasted && count === 1) return { title: "THE AGENT OF CHAOS", desc: "You came, you wasted your vote, you left." };
  if (hasWasted) return { title: "THE ANARCHIST", desc: "Some men just want to watch the GPA burn." };
  if (count === 1) return { title: "THE LASER-FOCUSED", desc: "You knew exactly what you wanted and ignored the rest." };
  if (count > 5) return { title: "THE OVER-ENGAGED", desc: "Democracy is exhausted, but thanks you." };
  return { title: "THE STRATEGIC MENACE", desc: "You didn't just vote. You conducted an investigation." };
};

export const ElectionCardScreen = ({ votes, theme }: any) => {
  const [voterName, setVoterName] = useState(() => "VOTER #" + Math.floor(1000 + Math.random() * 9000));
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const personality = getPersonality(votes);

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'election-card.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Election Card',
          text: 'My unofficial SHU Student Body Elections 2026 ballot.',
          files: [file]
        });
      } else {
        const link = document.createElement('a');
        link.download = 'election-card.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'election-card.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ScreenWrapper>
      <div className="flex-1 flex flex-col pb-6 items-center">
        <div 
          ref={cardRef} 
          className="w-full max-w-[400px] bg-paper border-[1.5px] border-line rounded-[24px] shadow-sm overflow-hidden p-6 relative"
        >
          <div className="absolute top-[18px] -right-[6px] w-[96px] h-[96px] border-[3px] border-accent rounded-full text-accent flex items-center justify-center text-center -rotate-12 opacity-85 font-extrabold text-[12px] tracking-[.04em] leading-[1.25] mix-blend-multiply before:absolute before:inset-1.5 before:border before:border-accent before:rounded-full z-0">
            OFFICIAL<br />BALLOT
          </div>

          <div className="relative z-10">
            <div className="text-[11px] text-ink-faint tracking-[.04em] font-mono mb-2">SHU / SU-2026</div>
            <h1 className="text-[24px] font-extrabold leading-[1.1] tracking-tight font-['Inter_Tight'] mb-1">
              Student Body<br/>Elections 2026
            </h1>
            <div className="text-[13px] text-ink-soft font-medium pb-4 border-b border-line">
              Unofficial Election Card. Probably.
            </div>

            <div className="py-4">
              <input 
                type="text" 
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="text-[18px] font-bold text-accent bg-transparent border-b border-dashed border-accent outline-none w-full pb-1 uppercase placeholder-accent/50"
                placeholder="YOUR NAME / VOTER ID"
                maxLength={30}
              />
            </div>

            <div className="flex flex-col gap-3 py-2 min-h-[120px]">
              {votes.length === 0 ? (
                <div className="text-[14px] text-ink-faint italic py-4">No votes cast.</div>
              ) : (
                votes.map((vote: any, i: number) => (
                  <div key={i} className="bg-surface/50 rounded-xl p-3 border border-line shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/80"></div>
                    <div className="text-[10.5px] uppercase font-bold text-ink-faint mb-1 tracking-wider pl-1.5">
                      {vote.societyName} • {vote.positionName}
                    </div>
                    <div className="text-[15.5px] font-bold text-ink flex items-center gap-2 pl-1.5">
                      <CheckCircle2 size={15} className="text-accent" />
                      {vote.candidateName}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-dashed border-line">
              <div className="text-[10.5px] uppercase font-bold text-ink-faint tracking-widest mb-1.5">Voter Personality Type</div>
              <div className="text-[17px] font-black text-ink tracking-tight uppercase">{personality.title}</div>
              <div className="text-[13px] text-ink-soft leading-[1.4] mt-1">{personality.desc}</div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[400px] mt-6 flex gap-3 px-1">
          <Button variant="accent" onClick={handleShare} className="flex-1 flex items-center justify-center gap-2" disabled={downloading}>
            {downloading ? <Loader2 size={16} className="animate-spin" /> : <Share size={16} />}
            Share
          </Button>
          <Button variant="ghost" onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 border-[1.5px] border-line bg-surface/50" disabled={downloading}>
            <Download size={16} />
            Download
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};
`;

if (!content.includes('GeneratingScreen')) {
    content += newScreens;
}

fs.writeFileSync(path.join(__dirname, '../src/screens.tsx'), content);
console.log('Successfully updated screens.tsx with new components');
