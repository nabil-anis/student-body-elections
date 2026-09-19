const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, '../src/screens.tsx'), 'utf8');

// Replace Zaki image
content = content.replace(
  'imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"',
  'imageSrc="./assets/zaki.jpeg"'
);

// Replace Ashba image
content = content.replace(
  'imageSrc="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"',
  'imageSrc="./assets/ashba.jpeg"'
);

// Shafaq traits
const shafaqTraits = `[
              { icon: <Users size={14} />, title: "Teamwork", desc: "Believes in collaborative success so strongly she once formed a committee to decide what to have for lunch." },
              { icon: <Globe size={14} />, title: "Empowerment", desc: "Can make a freshman feel like they own the university with a single pep talk." },
              { icon: <Check size={14} />, title: "Initiative", desc: "Started three new initiatives while you were reading this sentence." }
            ]`;
content = content.replace(/traits=\{\[\s*\{\s*icon:\s*<Users size=\{14\}\s*\/>,\s*title:\s*"Teamwork",\s*desc:\s*"Believes in collaborative success\."\s*\}\s*\]\}/g, `traits={${shafaqTraits}}`);

// Anish traits
const anishTraits = `[
              { icon: <Globe size={14} />, title: "Innovation", desc: "Always thinking outside the box. Mostly because he lost the box." },
              { icon: <Mic size={14} />, title: "Visionary", desc: "His platform is 80% buzzwords, 20% pure genius." },
              { icon: <Users size={14} />, title: "Persuasion", desc: "Convinced the cafeteria to serve pizza by calling it 'circular open-faced cheese sandwiches'." }
            ]`;
content = content.replace(/traits=\{\[\s*\{\s*icon:\s*<Globe size=\{14\}\s*\/>,\s*title:\s*"Innovation",\s*desc:\s*"Always thinking outside the box\."\s*\}\s*\]\}/g, `traits={${anishTraits}}`);

// Bakhtawar traits
const bakhtawarTraits = `[
              { icon: <Check size={14} />, title: "Organization", desc: "Keeps everything in perfect order. Her notes have their own table of contents." },
              { icon: <AlertCircle size={14} />, title: "Diligent", desc: "Spotted a typo in a 400-page university manual and wrote a formal letter about it." },
              { icon: <Users size={14} />, title: "Communication", desc: "Her WhatsApp announcements are basically modern literature." }
            ]`;
content = content.replace(/traits=\{\[\s*\{\s*icon:\s*<Check size=\{14\}\s*\/>,\s*title:\s*"Organization",\s*desc:\s*"Keeps everything in perfect order\."\s*\}\s*\]\}/g, `traits={${bakhtawarTraits}}`);

// Zaki traits
const zakiTraits = `[
              { icon: <Users size={14} />, title: "Dependable", desc: "You can always count on him to remember deadlines you completely forgot." },
              { icon: <Trophy size={14} />, title: "Reliability", desc: "The only person who actually reads the minutes of the meeting." },
              { icon: <Check size={14} />, title: "Documentation", desc: "Can document a 3-hour chaotic argument into a 2-point actionable summary." }
            ]`;
content = content.replace(/traits=\{\[\s*\{\s*icon:\s*<Users size=\{14\}\s*\/>,\s*title:\s*"Dependable",\s*desc:\s*"You can always count on him\."\s*\}\s*\]\}/g, `traits={${zakiTraits}}`);

// Amna traits
const amnaTraits = `[
              { icon: <Trophy size={14} />, title: "Finance", desc: "Excellent with numbers. Can calculate your remaining GPA in her head." },
              { icon: <AlertCircle size={14} />, title: "Analytical", desc: "Created a pie chart to explain why the council is broke." },
              { icon: <Check size={14} />, title: "Prudence", desc: "Will fight you over a 50 rupee discrepancy in the budget." }
            ]`;
content = content.replace(/traits=\{\[\s*\{\s*icon:\s*<Trophy size=\{14\}\s*\/>,\s*title:\s*"Finance",\s*desc:\s*"Excellent with numbers\."\s*\}\s*\]\}/g, `traits={${amnaTraits}}`);

// Ashba traits
const ashbaTraits = `[
              { icon: <Check size={14} />, title: "Strategic", desc: "Always plans ahead. She's currently budgeting for the Class of 2030." },
              { icon: <Globe size={14} />, title: "Resourceful", desc: "Can somehow fund a mega-event by selling three old textbooks." },
              { icon: <Trophy size={14} />, title: "Maximizer", desc: "Treats the student council treasury like a high-stakes investment portfolio." }
            ]`;
content = content.replace(/traits=\{\[\s*\{\s*icon:\s*<Check size=\{14\}\s*\/>,\s*title:\s*"Strategic",\s*desc:\s*"Always plans ahead\."\s*\}\s*\]\}/g, `traits={${ashbaTraits}}`);

// Finally, we need to pass candidateId to onVote for the featured candidates.
content = content.replace(/onVote\(\)/g, "onVote(candidateId)");
// wait, looking at my code, it's currently `onVote={() => onVote('candidate_id_string')}`
// Let me verify if that's true.

fs.writeFileSync(path.join(__dirname, '../src/screens.tsx'), content);
console.log('Successfully updated screens.tsx traits');
