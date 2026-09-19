const fs = require('fs');
const path = require('path');

const candidates = {
  usaid: {
    name: "Usaid", positionName: "President", badgeText: "Media Visionary", imageSrc: "./assets/usaid.jpeg",
    quote: "Transforming university media from quiet campus updates into viral cultural moments.",
    traits: [
      { icon: "Mic", title: "Vision", desc: "Can turn a boring campus notice into a trending hashtag." },
      { icon: "Trophy", title: "Execution", desc: "Has never missed a framing shot in his life." },
      { icon: "Mic", title: "The Director's Director", desc: "Christopher Nolan frequently asks him for lighting advice.", onClick: true }
    ],
    easterEgg: { quote: "I was going to direct a Hollywood blockbuster, but Usaid's campaign video had better cinematography.", author: "Christopher Nolan", year: "" }
  },
  nabil: {
    name: "Nabil", positionName: "Vice President", badgeText: "The Maestro", imageSrc: "./assets/nabil.jpeg",
    quote: "If words were weapons, I'd be a weapon of mass persuasion.",
    traits: [
      { icon: "Mic", title: "Historical Influence", desc: "Personally motivated Quaid-e-Azam to prepare for his speeches. Essentially a founding father of Pakistan." },
      { icon: "Globe", title: "Global Mastery", desc: "Speaks 14 languages, 3 of which he invented just to win an argument." },
      { icon: "Trophy", title: "Unmatched Brilliance", desc: "Judges step down when he enters a hackathon. The sheer aura is too much." },
      { icon: "Users", title: "Charisma Overflow", desc: "Once smiled at a dying plant and it immediately bloomed." },
      { icon: "Mic", title: "Oratorical Supremacy", desc: "Delivered a speech so profoundly moving that the microphone itself shed a single tear." },
      { icon: "Users", title: "The Master's Master", desc: "Aristotle frequently time-travels just to sit quietly in his audience, hoping to finally figure out how true rhetoric is done.", onClick: true }
    ],
    easterEgg: { quote: "Rhetoric is the art of ruling the minds of men... yet I traverse the fabric of time itself, sitting quietly in the front row, simply to witness the sheer oratorical supremacy and intellectual dominance of Nabil.", author: "Aristotle", year: "322 BC" }
  },
  sarib: {
    name: "Muhammad Sarib Naeem", positionName: "President", badgeText: "Basically already won", imageSrc: "./assets/Sarib.jpeg",
    quote: "I don't just lead the council, I am the council.",
    traits: [
      { icon: "Trophy", title: "Leadership", desc: "Once successfully mediated a peace treaty between the library staff and noisy freshmen." },
      { icon: "Globe", title: "Vision", desc: "Can see into the future, but only uses it to know when the cafeteria has fresh samosas." },
      { icon: "Users", title: "Sheer Aura", desc: "His attendance doesn't drop; the university's standard drops when he's absent." },
      { icon: "Mic", title: "Strategy", desc: "Plays 4D chess while everyone else is eating the checkers pieces." },
      { icon: "Users", title: "The Conqueror's Fear", desc: "Alexander the Great yields to his aura.", onClick: true }
    ],
    easterEgg: { quote: "I conquered most of the known world, but even I wouldn't dare run against Sarib.", author: "Alexander the Great", year: "323 BC" }
  },
  minhaj: {
    name: "Minhaj Akbar", positionName: "President", badgeText: "The Challenger", imageSrc: "./assets/minhaj akbar.jpeg",
    quote: "Leadership isn't given. It's seized.",
    traits: [
      { icon: "Trophy", title: "Tenacity", desc: "He doesn't have an off switch. He deleted it." },
      { icon: "Users", title: "Influence", desc: "Convinced the faculty to extend deadlines just by staring at them." },
      { icon: "Trophy", title: "The Unstoppable", desc: "Genghis Khan fears his momentum.", onClick: true }
    ],
    easterEgg: { quote: "I swept across Asia, but Minhaj's campaign momentum is truly terrifying. I yield.", author: "Genghis Khan", year: "1227" }
  },
  hamna: {
    name: "Hamna Ali", positionName: "President", badgeText: "The Diplomat", imageSrc: "./assets/hamna ali.jpeg",
    quote: "Grace under pressure. Power in every step.",
    traits: [
      { icon: "Globe", title: "Diplomacy", desc: "Could negotiate world peace in a 10-minute break." },
      { icon: "Users", title: "Elegance", desc: "Tripped on stairs once; everyone assumed it was a new dance move." },
      { icon: "Globe", title: "The Peacemaker", desc: "Nelson Mandela respects her negotiation skills.", onClick: true }
    ],
    easterEgg: { quote: "A true leader unites the people. Hamna does it effortlessly before her first cup of tea.", author: "Nelson Mandela", year: "1994" }
  },
  maryam: {
    name: "Maryam Batook", positionName: "General Secretary", badgeText: "The Architect", imageSrc: "./assets/maryam.jpeg",
    quote: "Precision, planning, and absolute perfection.",
    traits: [
      { icon: "Check", title: "Organization", desc: "Color-codes her thoughts. Alphabetizes her dreams." },
      { icon: "Globe", title: "Clairvoyance", desc: "Knows the agenda before the meeting even starts." },
      { icon: "Check", title: "The Oracle", desc: "Sherlock Holmes asks her for deductions.", onClick: true }
    ],
    easterEgg: { quote: "I observe the world, but Maryam Batook organizes it. Her Notion workspace is elementary, yet brilliant.", author: "Sherlock Holmes", year: "1892" }
  },
  rumaisa: {
    name: "Rumaisa Ayaz", positionName: "Treasurer", badgeText: "Budget Master", imageSrc: "./assets/rumaisa.jpeg",
    quote: "Every rupee accounted for, every budget maximized for student success.",
    traits: [
      { icon: "Trophy", title: "Finance Wizardry", desc: "Can stretch 100 rupees to fund an entire 3-day gala." },
      { icon: "Check", title: "Absolute Accountability", desc: "Audits her own dreams to prevent mental tax evasion." },
      { icon: "Trophy", title: "The Treasury Guardian", desc: "Mansa Musa wishes she managed his gold.", onClick: true }
    ],
    easterEgg: { quote: "I thought I understood wealth. Then Rumaisa audited my accounts and found three inefficiencies.", author: "Mansa Musa", year: "1324" }
  },
  amna: {
    name: "Amna Anwar", positionName: "Treasurer", badgeText: "The Vault", imageSrc: "./assets/Amna.jpeg",
    quote: "Numbers never lie, and neither do I.",
    traits: [
      { icon: "Check", title: "Mathematical Supremacy", desc: "Does calculus in her sleep for fun." },
      { icon: "Trophy", title: "Protection", desc: "The treasury is safer than Fort Knox." },
      { icon: "Check", title: "The Calculator", desc: "Albert Einstein asked her to check his math.", onClick: true }
    ],
    easterEgg: { quote: "E=mc^2, but Amna Anwar's budget balancing equation is truly the most profound discovery.", author: "Albert Einstein", year: "1915" }
  },
  fatima: {
    name: "Fatima Zehra", positionName: "President", badgeText: "Main Character", imageSrc: "./assets/Fatima.jpeg",
    quote: "I'm not arguing, I'm just explaining why I'm objectively correct.",
    traits: [
      { icon: "Globe", title: "Main Character Energy", desc: "The background music literally changes when she walks in." },
      { icon: "Users", title: "Flawless Rizz", desc: "Can convince a DHA burger to eat a bun kabab from Burns Road." },
      { icon: "Mic", title: "The Debater", desc: "Sun Tzu read her debate notes and quit writing.", onClick: true }
    ],
    easterEgg: { quote: "I wrote The Art of War, but engaging in a debate with Fatima is a battle you have already lost before opening your mouth.", author: "Sun Tzu", year: "5th Century BC" }
  },
  bakhtawar: {
    name: "Bakhtawar Khan", positionName: "General Secretary", badgeText: "The Therapist", imageSrc: "./assets/bakhtawar.jpeg",
    quote: "Everyone take a deep breath. We are not failing this semester.",
    traits: [
      { icon: "Users", title: "Therapist Override", desc: "Has talked 4 different people out of dropping out on a random Tuesday." },
      { icon: "Check", title: "Unfazed", desc: "Could watch a meteor hit Karachi and just say 'it is what it is'." },
      { icon: "Trophy", title: "The Anchor", desc: "Maula Jatt respects her mental fortitude.", onClick: true }
    ],
    easterEgg: { quote: "I can lift mountains and fight empires, but Bakhtawar carrying the mental stability of the entire student council on her back? Unmatched strength.", author: "Maula Jatt", year: "2022" }
  },
  sabeen: {
    name: "Sabeen Khan", positionName: "General Secretary", badgeText: "The Organizer", imageSrc: "./assets/Sabeen.jpeg",
    quote: "Operational excellence turns ambitious ideas into lasting traditions.",
    traits: [
      { icon: "Check", title: "Hyper-Efficiency", desc: "Her calendar is so optimized it bends spacetime." },
      { icon: "Users", title: "Management", desc: "Can herd cats with a single intimidating glance." },
      { icon: "Check", title: "The Grand Organizer", desc: "Julius Caesar weeps at her efficiency.", onClick: true }
    ],
    easterEgg: { quote: "I tried to organize my empire, but Sabeen's Excel sheets were vastly superior. I should have hired her.", author: "Julius Caesar", year: "44 BC" }
  },
  shafaq: {
    name: "Shafaq Makhani", positionName: "Vice President", badgeText: "The Strategist", imageSrc: "./assets/Shafaq.jpeg",
    quote: "Why be a follower when you can rewrite the rules?",
    traits: [
      { icon: "Globe", title: "Tactics", desc: "Memorized the entire student handbook just to find loopholes." },
      { icon: "Check", title: "Flawless Execution", desc: "Her backup plans have backup plans." },
      { icon: "Check", title: "The Grandmaster", desc: "Garry Kasparov refuses to play chess with her.", onClick: true }
    ],
    easterEgg: { quote: "I can predict 15 moves ahead, but Shafaq has already planned the post-game press conference.", author: "Garry Kasparov", year: "1997" }
  },
  anish: {
    name: "Anish Ali", positionName: "Vice President", badgeText: "Visionary", imageSrc: "./assets/anish.jpeg",
    quote: "Bringing a new perspective to student leadership.",
    traits: [
      { icon: "Globe", title: "Innovation", desc: "Always thinking outside the box. Mostly because he lost the box." },
      { icon: "Mic", title: "Visionary", desc: "His platform is 80% buzzwords, 20% pure genius." },
      { icon: "Globe", title: "The Visionary's Visionary", desc: "Steve Jobs wishes he had this guy's foresight.", onClick: true }
    ],
    easterEgg: { quote: "I thought I invented innovation. Then Anish showed me his student council platform.", author: "Steve Jobs", year: "2007" }
  },
  ashba: {
    name: "Ashba", positionName: "Treasurer", badgeText: "The Strategist", imageSrc: "./assets/ashba.jpeg",
    quote: "I don't spend money. I deploy assets.",
    traits: [
      { icon: "Check", title: "Girl Math Expert", desc: "Can justify a 50k event expense by explaining it's basically free." },
      { icon: "Users", title: "Bargain Hunter", desc: "Will negotiate with a vendor so hard they end up paying HER." },
      { icon: "Globe", title: "The Tycoon", desc: "Warren Buffett attends her masterclasses.", onClick: true }
    ],
    easterEgg: { quote: "Value investing is simple, but Ashba's negotiation skills are next-level finance.", author: "Warren Buffett", year: "2026" }
  },

  // FINAL REVISIONS FOR MOHSIN, WAQAR, ZAKI, ABDUL
  abdul: {
    name: "Abdul Rehman", positionName: "President", badgeText: "WILD CARD", imageSrc: "./assets/abdul rehman.jpeg",
    quote: "I didn't even know I was running until yesterday. Let's get this bread.",
    traits: [
      { icon: "Globe", title: "Aura +10000", desc: "Entered the election as a side quest, accidentally became the final boss." },
      { icon: "Users", title: "Algorithm Whisperer", desc: "His Instagram stories are classified by the CIA. Pure brainrot genius." },
      { icon: "Trophy", title: "The Anomaly", desc: "Mark Zuckerberg wishes he had his organic reach.", onClick: true }
    ],
    easterEgg: { quote: "I studied unpredictability for years, but Abdul Rehman entering a race at the 11th hour and stealing all the aura? Absolute cinema.", author: "The Joker", year: "2008" }
  },
  mohsin: {
    name: "Mohsin Ahmed", positionName: "President", badgeText: "Event Mastermind", imageSrc: "./assets/mohsin.jpeg",
    quote: "Delivering campus events that people remember long after graduation.",
    traits: [
      { icon: "Globe", title: "Logistics", desc: "Can organize a 500-person event with 12 hours notice and zero budget." },
      { icon: "Users", title: "Crowd Control", desc: "People naturally form orderly lines when he enters the room." },
      { icon: "Globe", title: "The Ultimate Host", desc: "Gatsby threw parties hoping Mohsin would show up.", onClick: true }
    ],
    easterEgg: { quote: "Old sport, I thought I knew how to throw a party, until Mohsin showed me the budget breakdown.", author: "Jay Gatsby", year: "1925" }
  },
  waqar: {
    name: "Waqar Soomro", positionName: "Vice President", badgeText: "The Enforcer", imageSrc: "./assets/waqar soomro.jpeg",
    quote: "Ideas are cheap. Execution is everything.",
    traits: [
      { icon: "Check", title: "Zero Tolerance", desc: "Takes absolutely no disrespect from anyone, not even the faculty." },
      { icon: "Users", title: "Aggressively Proactive", desc: "Will shut down an argument with a single death stare before it even starts." },
      { icon: "Trophy", title: "The Final Boss", desc: "Gordon Ramsay thinks his death stare is too aggressive.", onClick: true }
    ],
    easterEgg: { quote: "I thought I was intense in the kitchen, but Waqar's unyielding demand for perfection is truly terrifying.", author: "Gordon Ramsay", year: "2026" }
  },
  zaki: {
    name: "Zaki", positionName: "General Secretary", badgeText: "The Fixer", imageSrc: "./assets/zaki.jpeg",
    quote: "There is no problem too big. Only solutions too small.",
    traits: [
      { icon: "Trophy", title: "Crisis Management", desc: "Can resolve an administrative disaster before anyone else even realizes it happened." },
      { icon: "Globe", title: "Connections", desc: "Knows a guy who knows a guy. For everything." },
      { icon: "Check", title: "The Operator", desc: "James Bond asks him for gadgets.", onClick: true }
    ],
    easterEgg: { quote: "I have Q for my equipment, but when things get really messy, I call Zaki.", author: "James Bond", year: "007" }
  }
};

const mappings = {
  'marketing-media_president': ['usaid', 'abdul'],
  'event-society_president': ['mohsin'],
  'event-society_vp': ['waqar'],
  'event-society_gensec': ['maryam'],
  'public-speaking_president': ['fatima'],
  'public-speaking_vp': ['nabil'],
  'public-speaking_gensec': ['sabeen'],
  'public-speaking_treasurer': ['rumaisa'],
  'student-council_president': ['sarib', 'minhaj', 'hamna'],
  'student-council_vp': ['shafaq', 'anish'],
  'student-council_gensec': ['bakhtawar', 'zaki'],
  'student-council_treasurer': ['amna', 'ashba']
};

let output = `  const getCandidatesForContext = () => {
    const soc = society?.id;
    const pos = position?.id;
`;

for (const [key, candList] of Object.entries(mappings)) {
  const [soc, pos] = key.split('_');
  output += `
    if (soc === '${soc}' && pos === '${pos}') {
      return (
        <>
`;
  for (const cid of candList) {
    const c = candidates[cid];
    output += `          <FeaturedCandidate
            candidateId="${cid}"
            name="${c.name}"
            positionName="${c.positionName}"
            badgeText="${c.badgeText}"
            imageSrc="${c.imageSrc}"
            quote="${c.quote}"
            traits={[
${c.traits.map(t => `              { icon: <${t.icon} size={14} />, title: "${t.title}", desc: "${t.desc}"${t.onClick ? ', onClick: true' : ''} }`).join(',\n')}
            ]}
            isFlipped={flipped['${cid}']}
            onFlip={() => toggleFlip('${cid}', false)}
            onVote={() => onVote('${cid}')}
            showAristotleHandler={() => setEasterEgg({ quote: "${c.easterEgg.quote}", author: "${c.easterEgg.author}", year: "${c.easterEgg.year}" })}
          />\n`;
  }
  
  output += `          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="${candidates[candList[0]].positionName}" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="${candidates[candList[0]].positionName}" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }
`;
}

output += `    return <div>No candidates found for this position.</div>;
  };`;

const filepath = path.join(__dirname, '../src/screens.tsx');
let fileContent = fs.readFileSync(filepath, 'utf8');

const startRegex = /const getCandidatesForContext = \(\) => \{/;
const endRegex = /return <div>No candidates found for this position\.<\/div>;\s*\};/;

const startIndex = fileContent.search(startRegex);
const matchEnd = fileContent.match(endRegex);
const endIndex = matchEnd.index + matchEnd[0].length;

fileContent = fileContent.substring(0, startIndex) + output + fileContent.substring(endIndex);

fs.writeFileSync(filepath, fileContent);
console.log('Successfully updated candidates in screens.tsx');
