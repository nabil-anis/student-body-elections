const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../src/screens.tsx'), 'utf8');

// 1. Landing Screen Text
content = content.replace(
  'This is a practice environment. Nothing here is legally binding. Probably. No one tell Asif Yaqoob about this.',
  "This is just for fun, the dev hates everyone equally. But if anyone still has a problem with it, text me and I'll take your details down."
);

// 2. GenericCandidate button
content = content.replace(
  /<Button variant="ghost" onClick=\{onFlip\}>/g,
  '<Button variant="ghost" className="border-2 border-line bg-surface/50 hover:bg-surface shadow-sm" onClick={onFlip}>'
);

// 4. Update CandidatesScreen State
content = content.replace(
  'const [showAristotle, setShowAristotle] = useState(false);',
  'const [easterEgg, setEasterEgg] = useState<{ quote: string, author: string, year?: string } | null>(null);'
);

// 5. Update Aristotle handler in Nabil
content = content.replace(
  'showAristotleHandler={() => setShowAristotle(true)}',
  'showAristotleHandler={() => setEasterEgg({ quote: "Rhetoric is the art of ruling the minds of men... yet I traverse the fabric of time itself, sitting quietly in the front row, simply to witness the sheer oratorical supremacy and intellectual dominance of Nabil.", author: "Aristotle", year: "322 BC" })}'
);

// We need to add the easter egg trait and handler for ALL other featured candidates.
const replacements = [
  {
    id: 'usaid',
    quote: "I was going to direct a Hollywood blockbuster, but Usaid's campaign video had better cinematography.",
    author: "Christopher Nolan",
    trait: `{ icon: <Mic size={14} />, title: "The Director's Director", desc: "Christopher Nolan frequently asks him for lighting advice.", onClick: true }`
  },
  {
    id: 'mohsin',
    quote: "We thought we knew how to throw a party. Then we saw Mohsin’s event proposal. We have much to learn.",
    author: "The Great Gatsby",
    year: "1925",
    trait: `{ icon: <Globe size={14} />, title: "The Ultimate Host", desc: "Gatsby threw parties hoping Mohsin would show up.", onClick: true }`
  },
  {
    id: 'fatima',
    quote: "I used to think my speeches were good. Then Fatima spoke, and I realized I was just making noise.",
    author: "Winston Churchill",
    year: "1940",
    trait: `{ icon: <Quote size={14} />, title: "The Golden Voice", desc: "Her articulation is so precise it can shatter glass.", onClick: true }`
  },
  {
    id: 'sabeen',
    quote: "I tried to organize my empire, but Sabeen's Excel sheets were vastly superior. I should have hired her.",
    author: "Julius Caesar",
    year: "44 BC",
    trait: `{ icon: <Check size={14} />, title: "The Grand Organizer", desc: "Julius Caesar weeps at her efficiency.", onClick: true }`
  },
  {
    id: 'rumaisa',
    quote: "I thought I understood wealth. Then Rumaisa audited my accounts and found three inefficiencies.",
    author: "Mansa Musa",
    year: "1324",
    trait: `{ icon: <Trophy size={14} />, title: "The Treasury Guardian", desc: "Mansa Musa wishes she managed his gold.", onClick: true }`
  },
  {
    id: 'sarib',
    quote: "I conquered most of the known world, but even I wouldn't dare run against Sarib.",
    author: "Alexander the Great",
    year: "323 BC",
    trait: `{ icon: <Users size={14} />, title: "The Conqueror's Fear", desc: "Alexander the Great yields to his aura.", onClick: true }`
  },
  {
    id: 'shafaq',
    quote: "I led millions, but Shafaq's teamwork initiatives are frankly intimidating. She gets everyone on board.",
    author: "Genghis Khan",
    year: "1227",
    trait: `{ icon: <Users size={14} />, title: "The Unifier", desc: "Genghis Khan takes notes on her leadership.", onClick: true }`
  },
  {
    id: 'anish',
    quote: "I thought I invented innovation. Then Anish showed me his student council platform.",
    author: "Steve Jobs",
    year: "2007",
    trait: `{ icon: <Globe size={14} />, title: "The Visionary's Visionary", desc: "Steve Jobs wishes he had this guy's foresight.", onClick: true }`
  },
  {
    id: 'bakhtawar',
    quote: "I spent my life pursuing order, but Bakhtawar’s meeting minutes are the true manifestation of perfection.",
    author: "Confucius",
    year: "479 BC",
    trait: `{ icon: <Check size={14} />, title: "The Pillar of Order", desc: "Confucius considers her his greatest teacher.", onClick: true }`
  },
  {
    id: 'zaki',
    quote: "I thought I was dependable holding up the sky, but Zaki’s reliability is something else entirely.",
    author: "Atlas",
    year: "Mythology",
    trait: `{ icon: <Users size={14} />, title: "The Unshakeable", desc: "Atlas asked him to hold the sky while he took a break.", onClick: true }`
  },
  {
    id: 'amna',
    quote: "I invented calculus, but Amna's budget forecasts are beyond my mathematical comprehension.",
    author: "Isaac Newton",
    year: "1687",
    trait: `{ icon: <Trophy size={14} />, title: "The Calculus Master", desc: "Isaac Newton is baffled by her precision.", onClick: true }`
  },
  {
    id: 'ashba',
    quote: "I mastered the art of war, but Ashba’s strategic resource allocation is the ultimate victory.",
    author: "Sun Tzu",
    year: "5th Century BC",
    trait: `{ icon: <Check size={14} />, title: "The Master Strategist", desc: "Sun Tzu read her manifesto twice.", onClick: true }`
  }
];

for (const cand of replacements) {
  const regex = new RegExp(`(candidateId="${cand.id}"[\\s\\S]*?traits=\\{\\[[\\s\\S]*?)(\\n\\s*\\]\\})`, 'm');
  content = content.replace(regex, `$1,\n              ${cand.trait}$2`);
  
  const voteRegex = new RegExp(`(candidateId="${cand.id}"[\\s\\S]*?onVote=\\{[^}]+\\})([\\s\\S]*?\\/>)`, 'm');
  content = content.replace(voteRegex, `$1\n            showAristotleHandler={() => setEasterEgg({ quote: "${cand.quote}", author: "${cand.author}", year: "${cand.year || ''}" })}$2`);
}

// 6. Replace the AnimatePresence block to use easterEgg state
const oldModalRegex = /<AnimatePresence>\s*\{showAristotle && \([\s\S]*?<\/AnimatePresence>/m;
const newModal = `<AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => setEasterEgg(null)}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-[400px] text-center"
            >
              <p className="text-[#E5E0D8] text-[22px] md:text-[28px] font-serif leading-[1.6] italic tracking-wide">
                "{easterEgg.quote}"
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="mt-8 text-[#A89F91] text-[15px] font-serif uppercase tracking-[0.2em]"
              >
                — {easterEgg.author}{easterEgg.year ? \`, \${easterEgg.year}\` : ''}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 4, duration: 1 }}
                className="mt-12 text-[#A89F91] text-[11px] uppercase tracking-widest"
              >
                Tap anywhere to return
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>`;
      
content = content.replace(oldModalRegex, newModal);

fs.writeFileSync(path.join(__dirname, '../src/screens.tsx'), content);
console.log('Successfully updated screens.tsx with easter eggs and borders');
