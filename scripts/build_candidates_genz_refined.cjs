const fs = require('fs');
const path = require('path');

const candidates = {
  // Keep original Grandeur
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

  // FIXED REWRITES (No Karachi specific spots, just relatable Gen Z / Uni culture)
  abdul: {
    name: "Abdul Rehman", positionName: "President", badgeText: "WILD CARD", imageSrc: "./assets/abdul rehman.jpeg",
    quote: "I didn't even know I was running until yesterday. Let's get this bread.",
    traits: [
      { icon: "Globe", title: "Aura +10000", desc: "Entered the election as a side quest, accidentally became the final boss." },
      { icon: "Users", title: "Algorithm Whisperer", desc: "His FYP is so curated it predicts the future. Pure brainrot genius." },
      { icon: "Trophy", title: "The Anomaly", desc: "Mark Zuckerberg wishes he had his organic reach.", onClick: true }
    ],
    easterEgg: { quote: "I studied unpredictability for years, but Abdul Rehman entering a race at the 11th hour and stealing all the aura? Absolute cinema.", author: "The Joker", year: "2008" }
  },
  mohsin: {
    name: "Mohsin Ahmed", positionName: "President", badgeText: "Vibe Architect", imageSrc: "./assets/mohsin.jpeg",
    quote: "Bro, trust me, the venue is sorted. (It is definitely not sorted).",
    traits: [
      { icon: "Globe", title: "Clutch God", desc: "Can pull off a 500-person mega-event with a budget of zero and 4 hours notice." },
      { icon: "Users", title: "Vibe Checker", desc: "If the playlist is bad, he will personally unplug the speakers." },
      { icon: "Trophy", title: "The Connect", desc: "Fyre Festival organizers beg him for logistics advice.", onClick: true }
    ],
    easterEgg: { quote: "I used to think my festival was a logistical nightmare until I saw Mohsin plan a massive rave with literally no budget. He is Him.", author: "Fyre Festival Organizer", year: "2017" }
  },
  waqar: {
    name: "Waqar Soomro", positionName: "Vice President", badgeText: "The Enforcer", imageSrc: "./assets/waqar soomro.jpeg",
    quote: "We are locking in. Stop yapping and start working.",
    traits: [
      { icon: "Check", title: "Locked In", desc: "When he puts his AirPods on noise cancellation, the whole campus goes quiet." },
      { icon: "Users", title: "No Yapping", desc: "Will literally cut your mic if you take more than 2 minutes in a meeting." },
      { icon: "Trophy", title: "The Final Boss", desc: "Gordon Ramsay thinks his death stare is too aggressive.", onClick: true }
    ],
    easterEgg: { quote: "I thought I was intense, but Waqar's death stare when someone talks over him is genuinely terrifying.", author: "Gordon Ramsay", year: "2026" }
  },
  sabeen: {
    name: "Sabeen Khan", positionName: "General Secretary", badgeText: "Type-A Menace", imageSrc: "./assets/Sabeen.jpeg",
    quote: "If you're 5 minutes early, you're already 10 minutes late. Be serious.",
    traits: [
      { icon: "Globe", title: "Time Weaver", desc: "Has never submitted an assignment at 11:59. Submits it three days early." },
      { icon: "Users", title: "Group Chat Admin", desc: "Her 'read' receipts induce pure panic in the committee WhatsApp." },
      { icon: "Check", title: "The Optimizer", desc: "Elon Musk stole his Mars colonization schedule from her Notion board.", onClick: true }
    ],
    easterEgg: { quote: "I thought I was efficient, but Sabeen's Notion dashboard makes my space colonization plan look like a joke.", author: "Elon Musk", year: "2026" }
  },
  shafaq: {
    name: "Shafaq Makhani", positionName: "Vice President", badgeText: "The Plotter", imageSrc: "./assets/Shafaq.jpeg",
    quote: "Don't stress it, I know a guy who knows a guy.",
    traits: [
      { icon: "Check", title: "Plot Armor", desc: "Everything just magically works out for her. It's honestly unfair." },
      { icon: "Globe", title: "Master Manipulator", desc: "Can convince the strictest professor to extend a deadline just by nodding sympathetically." },
      { icon: "Trophy", title: "The Mastermind", desc: "The Professor took notes from her.", onClick: true }
    ],
    easterEgg: { quote: "I pulled off the greatest heist in history, but Shafaq finessing the university admin to get a 3-day weekend? That is the real heist.", author: "The Professor (Money Heist)", year: "2021" }
  },
  anish: {
    name: "Anish Ali", positionName: "Vice President", badgeText: "Delulu Tech Bro", imageSrc: "./assets/anish.jpeg",
    quote: "Bro, hear me out. What if we make an AI app for that?",
    traits: [
      { icon: "Globe", title: "Delulu is the Solulu", desc: "Manifests success by simply refusing to accept reality." },
      { icon: "Mic", title: "Professional Yapper", desc: "Can talk for 45 minutes straight without actually making a single point." },
      { icon: "Users", title: "The Visionary", desc: "Sam Altman asked him for ChatGPT prompts.", onClick: true }
    ],
    easterEgg: { quote: "We trained GPT-4 on billions of parameters, but Anish's ability to yap infinitely without substance? Unreplicable.", author: "Sam Altman", year: "2024" }
  },
  zaki: {
    name: "Zaki", positionName: "General Secretary", badgeText: "Jugaad Pro Max", imageSrc: "./assets/zaki.jpeg",
    quote: "Give me 10 minutes and a cup of chai, I'll handle it.",
    traits: [
      { icon: "Trophy", title: "Jugaad Pro Max", desc: "Can fix a broken sound system using just a paperclip and sheer willpower." },
      { icon: "Globe", title: "The Plug", desc: "Needs notes? Needs past papers? Needs a VIP pass? Zaki knows a guy." },
      { icon: "Check", title: "The Operator", desc: "Batman wishes he had his utility belt.", onClick: true }
    ],
    easterEgg: { quote: "I used to think my gadgets were cool, until I saw Zaki bypass a security lock with a bobby pin 5 minutes before the event.", author: "Batman", year: "Gotham" }
  },
  ashba: {
    name: "Ashba", positionName: "Treasurer", badgeText: "The Hustler", imageSrc: "./assets/ashba.jpeg",
    quote: "Why buy it when we can finesse a sponsorship?",
    traits: [
      { icon: "Check", title: "Girl Math Expert", desc: "Can justify a 50k event expense by explaining it's basically free." },
      { icon: "Users", title: "Bargain Hunter", desc: "Will negotiate with a vendor so hard they end up paying HER for the privilege." },
      { icon: "Trophy", title: "The Finesse", desc: "MrBeast asked her how to fund videos.", onClick: true }
    ],
    easterEgg: { quote: "I give away millions of dollars for views, but Ashba finessing a free venue by promising them 'exposure' is the greatest trade deal in history.", author: "MrBeast", year: "2026" }
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
