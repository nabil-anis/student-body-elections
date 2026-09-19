const fs = require('fs');
const path = require('path');
let content = fs.readFileSync(path.join(__dirname, '../src/App.tsx'), 'utf8');

content = content.replace(
  "{currentScreen === 'easter' && <EasterEggScreen key=\"easter\" onContinue={() => navigate('hub', true)} />\r\n          {currentScreen === ('generating' as any) && <GeneratingScreen key=\"generating\" onComplete={() => navigate('election_card' as any, true)} />}\r\n          {currentScreen === ('election_card' as any) && <ElectionCardScreen key=\"election_card\" votes={Object.values(votes)} theme={theme} />}}",
  "{currentScreen === 'easter' && <EasterEggScreen key=\"easter\" onContinue={() => navigate('hub', true)} />}\r\n          {currentScreen === ('generating' as any) && <GeneratingScreen key=\"generating\" onComplete={() => navigate('election_card' as any, true)} />}\r\n          {currentScreen === ('election_card' as any) && <ElectionCardScreen key=\"election_card\" votes={Object.values(votes)} theme={theme} />}"
);

content = content.replace(
  "{currentScreen === 'easter' && <EasterEggScreen key=\"easter\" onContinue={() => navigate('hub', true)} />\n          {currentScreen === ('generating' as any) && <GeneratingScreen key=\"generating\" onComplete={() => navigate('election_card' as any, true)} />}\n          {currentScreen === ('election_card' as any) && <ElectionCardScreen key=\"election_card\" votes={Object.values(votes)} theme={theme} />}}",
  "{currentScreen === 'easter' && <EasterEggScreen key=\"easter\" onContinue={() => navigate('hub', true)} />}\n          {currentScreen === ('generating' as any) && <GeneratingScreen key=\"generating\" onComplete={() => navigate('election_card' as any, true)} />}\n          {currentScreen === ('election_card' as any) && <ElectionCardScreen key=\"election_card\" votes={Object.values(votes)} theme={theme} />}"
);

fs.writeFileSync(path.join(__dirname, '../src/App.tsx'), content);
console.log('Fixed syntax error in App.tsx');
