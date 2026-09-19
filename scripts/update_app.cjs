const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../src/App.tsx'), 'utf8');

// Add votes state
content = content.replace(
  'const [theme, setTheme] = useState<Theme>(null);',
  `const [theme, setTheme] = useState<Theme>(null);\n  const [votes, setVotes] = useState<Record<string, any>>({});`
);

// Add logic to handleVoteSuccess
content = content.replace(
  'const handleVoteSuccess = (candidateId: string) => {',
  `const handleVoteSuccess = (candidateId: string) => {
    if (selectedSociety && selectedPosition) {
      setVotes(prev => ({
        ...prev,
        [\`\${selectedSociety.id}_\${selectedPosition.id}\`]: {
          candidateId,
          candidateName: (CONFIG.candidates as any)[candidateId]?.name || "Candidate " + candidateId,
          societyId: selectedSociety.id,
          societyName: selectedSociety.name,
          positionId: selectedPosition.id,
          positionName: selectedPosition.name
        }
      }));
    }`
);

content = content.replace(
  'setWastedContent(CONFIG.wastedSequence[0]);',
  `setWastedContent(CONFIG.wastedSequence[0]);
      if (pendingCandidate && selectedSociety && selectedPosition) {
        setVotes(prev => ({
          ...prev,
          [\`\${selectedSociety.id}_\${selectedPosition.id}\`]: {
            candidateId: pendingCandidate,
            candidateName: (CONFIG.candidates as any)[pendingCandidate]?.name || "Candidate " + pendingCandidate,
            societyId: selectedSociety.id,
            societyName: selectedSociety.name,
            positionId: selectedPosition.id,
            positionName: selectedPosition.name
          }
        }));
      }`
);

// Add 'generating' and 'election_card' to ScreenId type in App.tsx? 
// No, ScreenId is in types.ts. We will just pass it, TS might complain if ScreenId is tightly typed. We'll fix types.ts later.

content = content.replace(
  `<CelebrateScreen key="celebrate" subtext={celebrateSubtext} onContinue={() => navigate('hub', true)} />`,
  `<CelebrateScreen key="celebrate" subtext={celebrateSubtext} onDone={() => navigate('generating' as any, true)} onVoteMore={() => navigate('hub', true)} />`
);

content = content.replace(
  `<WastedScreen key="wasted" line1={wastedContent.title} line2={wastedContent.sub} onContinue={() => navigate('hub', true)} />`,
  `<WastedScreen key="wasted" line1={wastedContent.title} line2={wastedContent.sub} onDone={() => navigate('generating' as any, true)} onVoteMore={() => navigate('hub', true)} />`
);

const screensRegex = /(<EasterEggScreen key="easter" onContinue=\{\(\) => navigate\('hub', true\)\} \/>)/;
content = content.replace(screensRegex, 
  `$1
          {currentScreen === ('generating' as any) && <GeneratingScreen key="generating" onComplete={() => navigate('election_card' as any, true)} />}
          {currentScreen === ('election_card' as any) && <ElectionCardScreen key="election_card" votes={Object.values(votes)} theme={theme} />}`
);

content = content.replace(
  'CelebrateScreen, ProcessingScreen, WastedScreen, EasterEggScreen',
  'CelebrateScreen, ProcessingScreen, WastedScreen, EasterEggScreen, GeneratingScreen, ElectionCardScreen'
);

fs.writeFileSync(path.join(__dirname, '../src/App.tsx'), content);
console.log('App.tsx updated');
