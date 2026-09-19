import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/Shared';
import { CONFIG } from './data';
import { Society } from './types';
import { Check, Mic, Globe, Trophy, Users, Loader2, XCircle, AlertCircle, Quote, Share, Download, CheckCircle2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useRef, useEffect } from 'react';

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.99 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 14, scale: 0.99 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col flex-1 pt-[60px] pb-10 max-w-[480px] mx-auto w-full px-5"
  >
    {children}
  </motion.div>
);

export const LandingScreen = ({ onStart }: { onStart: () => void }) => (
  <ScreenWrapper>
    <div className="flex flex-col justify-between h-full pt-[34px]">
      <div>
        <div className="flex items-center gap-[11px] h-[38px]">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/SHU_LOGO.jpg" alt="SHU Logo" className="h-[30px] object-contain rounded" />
        </div>

        <div className="bg-paper border border-line rounded-[22px] mt-[26px] p-[26px_22px_24px] relative overflow-hidden shadow-sm ballot-card">
          <div className="absolute top-[18px] -right-[6px] w-[96px] h-[96px] border-[3px] border-danger rounded-full text-danger flex items-center justify-center text-center -rotate-12 opacity-85 font-extrabold text-[12px] tracking-[.04em] leading-[1.25] mix-blend-multiply before:absolute before:inset-1.5 before:border before:border-danger before:rounded-full">
            PRACTICE<br />ONLY
          </div>
          
          <div className="text-[11px] text-ink-faint tracking-[.04em] flex justify-between font-mono">
            <span>NO. 0226</span>
            <span>SHU / SU-2026</span>
          </div>

          <div className="mt-[22px]">
            <div className="text-[12.5px] text-ink-soft font-semibold">Student Body Elections</div>
            <h1 className="text-[32px] max-[360px]:text-[27px] font-extrabold leading-[1.08] mt-1.5 tracking-tight font-['Inter_Tight']">
              Student Elections<br />2026
            </h1>
            <p className="text-[15.5px] text-ink-soft font-medium mt-2">Practice Voting Experience</p>
          </div>

          <div className="mt-6 flex items-center gap-3 pt-[18px] border-t border-dashed border-line">
            <div className="w-[42px] h-[42px] rounded-lg border-[1.5px] border-dashed border-ink-faint shrink-0"></div>
            <div className="text-[11.5px] text-ink-faint leading-[1.4]">
              Voter verification box.<br />
              Nothing happens if you tap it. We checked.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-3 mt-[26px]">
        <Button onClick={onStart}>Start</Button>
        <p className="text-[12px] text-ink-faint mt-3.5 text-center leading-[1.5]">
          This is just for fun, the dev hates everyone equally. But if anyone still has a problem with it, text me and I'll take your details down.<br/>
          <a href="https://www.linkedin.com/in/nabil-anis/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent opacity-90 mt-1 block hover:underline">Built by your future Public Speaking Society's Vice President.</a>
        </p>
      </div>
    </div>
  </ScreenWrapper>
);

export const HubScreen = ({ theme, onSelectSociety, onLocked }: any) => {
  return (
    <ScreenWrapper>
      <div className="mb-[22px]">
        <p className="text-[13px] font-semibold text-accent mb-1.5 uppercase">
          WELCOME, VOTER
        </p>
        <h2 className="text-[26px] font-extrabold tracking-tight font-['Inter_Tight']">Student Bodies</h2>
        <p className="text-[14.5px] text-ink-soft mt-1.5 leading-[1.4]">
          Choose a society to view its open positions.
        </p>
      </div>

      <div className="h-[118px] rounded-[22px] bg-gradient-to-b from-accent-soft to-white/60 relative overflow-hidden mb-[26px] flex items-end justify-center gap-3.5 pb-0">
        {[26, 22, 30, 20].map((width, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="opacity-90 pb-0"
          >
            <svg width={width} viewBox="0 0 24 40" fill="none">
              <circle cx="12" cy="6" r="5" fill="var(--color-accent)"/>
              <path d="M4 38 C4 24 4 18 12 18 C20 18 20 24 20 38" fill="var(--color-accent)"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {CONFIG.societies.map((soc: Society) => (
          <div
            key={soc.id}
            onClick={() => soc.available ? onSelectSociety(soc) : onLocked()}
            className={`flex items-center justify-between p-[17px_18px] rounded-[18px] bg-surface border border-line cursor-pointer transition-all ${
              soc.available ? 'shadow-sm active:scale-[0.985]' : 'opacity-50 grayscale active:scale-99'
            }`}
          >
            <div className="flex items-center gap-[13px]">
              <div className={`w-[9px] h-[9px] rounded-full shrink-0 ${soc.available ? 'bg-accent shadow-[0_0_0_4px_var(--color-accent-soft)]' : 'bg-ink-faint'}`} />
              <div>
                <div className="text-[16px] font-semibold leading-tight">{soc.name}</div>
                <div className="text-[12.5px] text-ink-faint mt-1">
                  {soc.available ? 'Open for voting' : 'Not currently active'}
                </div>
              </div>
            </div>
            <span className="text-ink-faint text-[14px]">›</span>
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );
};

export const PositionsScreen = ({ society, onSelectPosition, onLocked }: any) => {
  const positions = CONFIG.positions[society?.id as keyof typeof CONFIG.positions] || [];
  return (
    <ScreenWrapper>
      <div className="mb-[22px]">
        <p className="text-[13px] font-semibold text-accent mb-1.5 uppercase">
          {society?.name || 'SOCIETY'}
        </p>
        <h2 className="text-[26px] font-extrabold tracking-tight font-['Inter_Tight']">Positions</h2>
        <p className="text-[14.5px] text-ink-soft mt-1.5 leading-[1.4]">
          Select a position to view its candidates.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {positions.map((pos: any) => (
          <div
            key={pos.id}
            onClick={() => pos.available ? onSelectPosition(pos) : onLocked()}
            className={`flex items-center justify-between p-[17px_18px] rounded-[18px] bg-surface border border-line cursor-pointer transition-all ${
              pos.available ? 'shadow-sm active:scale-[0.985]' : 'opacity-50 grayscale active:scale-99'
            }`}
          >
            <div className="flex items-center gap-[13px]">
              <div className={`w-[9px] h-[9px] rounded-full shrink-0 ${pos.available ? 'bg-accent shadow-[0_0_0_4px_var(--color-accent-soft)]' : 'bg-ink-faint'}`} />
              <div>
                <div className="text-[16px] font-semibold leading-tight">{pos.name}</div>
                <div className="text-[12.5px] text-ink-faint mt-1">
                  {pos.available ? 'Candidates Available' : 'Not currently active'}
                </div>
              </div>
            </div>
            <span className="text-ink-faint text-[14px]">›</span>
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );
};

const BioItem = ({ icon, title, desc, onClick }: any) => (
  <div 
    className={`flex gap-[11px] ${onClick ? 'cursor-pointer group active:scale-[0.98] transition-transform' : ''}`}
    onClick={onClick}
  >
    <div className={`w-[30px] h-[30px] rounded-[9px] shrink-0 bg-accent-soft text-accent flex items-center justify-center ${onClick ? 'group-hover:bg-accent group-hover:text-white transition-colors' : ''}`}>
      {icon}
    </div>
    <div>
      <div className="text-[13px] font-bold flex items-center gap-1.5">
        {title}
        {onClick && <span className="text-[9px] bg-accent/15 text-accent px-[5px] py-[2px] rounded-full uppercase tracking-wider font-bold leading-none">Tap</span>}
      </div>
      <div className="text-[12.5px] text-ink-soft mt-[1px] leading-[1.4]">{desc}</div>
    </div>
  </div>
);

const FlipCard = ({ isFlipped, front, back, className = '' }: any) => (
  <div className={`relative perspective-1600 ${className}`}>
    <motion.div
      className="w-full h-full relative preserve-3d"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 backface-hidden bg-surface rounded-[26px] border border-line shadow-sm overflow-hidden flex flex-col items-center text-center">
        {front}
      </div>
      <div className="absolute inset-0 backface-hidden bg-surface rounded-[26px] border border-line shadow-sm overflow-y-auto p-[24px_20px] flex flex-col items-center text-center" style={{ transform: 'rotateY(180deg)' }}>
        {back}
      </div>
    </motion.div>
  </div>
);

// Generic card generator
const GenericCandidate = ({ candidateId, name, positionName, quote, traits, isFlipped, onFlip, onVote }: any) => (
  <div className="flex flex-col gap-3">
    <span className="ml-5 text-[11px] text-ink-faint font-semibold bg-surface border border-line px-2.5 py-1 rounded-full self-start">
      Also running, technically
    </span>
    <FlipCard
      className="h-[392px]"
      isFlipped={isFlipped}
      front={
        <div className="flex flex-col items-center justify-center p-[24px_20px] w-full h-full bg-background rounded-[26px]">
          <div className="w-[76px] h-[76px] rounded-full mb-3.5 bg-background border-[1.5px] border-line p-2 text-ink shrink-0">
            <svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="16" r="9" stroke="currentColor" strokeWidth="2.4"/><path d="M14 52 C14 34 18 28 30 28 C42 28 46 34 46 52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M21 9c2-3 16-3 18 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="30" cy="5" r="2" fill="currentColor"/></svg>
          </div>
          <div className="text-[20px] font-extrabold tracking-tight text-ink-soft uppercase">{name}</div>
          <div className="text-[13.5px] text-ink-soft mt-1">Candidate for {positionName}</div>
          <div className="mt-3.5 text-[13.5px] italic text-ink bg-background border border-line rounded-[14px] p-[12px_14px] leading-[1.5]">
            "{quote}"
          </div>
        </div>
      }
      back={
        <div className="flex flex-col w-full h-full text-left">
          <div className="flex flex-col gap-3 w-full">
            {traits.map((t: any, i: number) => (
              <BioItem key={i} icon={t.icon} title={t.title} desc={t.desc} />
            ))}
          </div>
        </div>
      }
    />
    <div className="flex flex-col gap-2">
      <Button variant="ghost" className="border-2 border-line bg-surface/50 hover:bg-surface shadow-sm" onClick={onFlip}>
        {isFlipped ? 'Hide Details' : 'Why ' + name + '?'}
      </Button>
      <Button className="bg-ink" onClick={onVote}>
        Vote for {name}
      </Button>
    </div>
  </div>
);

// Main featured candidate card generator
const FeaturedCandidate = ({ candidateId, name, positionName, badgeText, imageSrc, idTag, quote, traits, isFlipped, onFlip, onVote, showAristotleHandler }: any) => (
  <div className="relative">
    {badgeText && (
      <span className="absolute -top-[11px] left-5 z-10 bg-accent text-white text-[11.5px] font-bold tracking-[0.01em] px-[13px] py-1.5 rounded-full shadow-[0_6px_16px_color-mix(in_srgb,var(--color-accent)_45%,transparent)] -rotate-2">
        {badgeText}
      </span>
    )}
    <FlipCard
      className="h-[452px]"
      isFlipped={isFlipped}
      front={
        <div className="w-full h-full relative border-[1.5px] border-accent rounded-[26px] overflow-hidden shadow-[0_0_0_5px_var(--color-accent-soft),var(--shadow-lg)] bg-black">
          {imageSrc ? (
            <img src={imageSrc} alt={name} className={`w-full h-full object-cover ${candidateId === 'sarib' ? 'opacity-80 grayscale mix-blend-luminosity' : 'opacity-90'}`} />
          ) : (
            <div className="w-full h-full bg-ink-faint flex items-center justify-center text-white/50">No Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-[24px_20px] text-left">
            <div className="text-white text-[24px] font-extrabold tracking-tight flex items-end gap-2 leading-none mb-1 uppercase">
              {name}
            </div>
            <div className="mt-3 text-[14px] italic text-white/90 bg-white/10 backdrop-blur-md rounded-[12px] p-[10px_14px] leading-[1.4]">
              "{quote}"
            </div>
          </div>
        </div>
      }
      back={
        <div className="flex flex-col w-full h-full">
          <div className="text-[18px] font-bold mb-4 border-b border-line pb-2 shrink-0">Why {name}?</div>
          <div className="flex flex-col gap-3 text-left overflow-y-auto pr-2 pb-2">
            {traits.map((t: any, i: number) => (
              <BioItem key={i} icon={t.icon} title={t.title} desc={t.desc} onClick={t.onClick ? showAristotleHandler : undefined} />
            ))}
          </div>
          <div className="text-[11px] text-ink-faint mt-auto pt-3 shrink-0 border-t border-line">Tap "Hide Details" to flip back.</div>
        </div>
      }
    />
    <div className="flex flex-col gap-2 mt-3 relative z-10">
      <Button variant="ghost" className="border-2 border-line bg-surface/50 hover:bg-surface shadow-sm" onClick={onFlip}>
        {isFlipped ? 'Hide Details' : 'Why ' + name + '?'}
      </Button>
      <Button variant="accent" className="shadow-[0_10px_24px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]" onClick={onVote}>
        Vote for {name}
      </Button>
    </div>
  </div>
);


export const CandidatesScreen = ({ society, position, onVote, onVoteOther, onDiscourage }: any) => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [easterEgg, setEasterEgg] = useState<{ quote: string, author: string, year?: string } | null>(null);

  const toggleFlip = (id: string, isRival: boolean) => {
    if (isRival && !flipped[id]) {
      onDiscourage(id, () => {
        setFlipped(prev => ({ ...prev, [id]: true }));
      });
    } else {
      setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const genericTraits1 = [
    { icon: <Users size={14} />, title: "Leadership", desc: "Successfully managed a WhatsApp group for 12 minutes before accidentally removing himself as admin." },
    { icon: <AlertCircle size={14} />, title: "Problem Solving", desc: "Tries to fix Wi-Fi issues by turning his monitor on and off." }
  ];

  const genericTraits2 = [
    { icon: <Users size={14} />, title: "Strategy", desc: "Creates elaborate mind maps for tasks like 'making tea' and still gets it wrong." },
    { icon: <AlertCircle size={14} />, title: "Crisis Management", desc: "Response to any crisis is 'Let's just journal about it'." }
  ];

            const getCandidatesForContext = () => {
    const soc = society?.id;
    const pos = position?.id;

    if (soc === 'marketing-media' && pos === 'president') {
      return (
        <>
          <FeaturedCandidate
            candidateId="usaid"
            name="Usaid"
            positionName="President"
            badgeText="Media Visionary"
            imageSrc="./assets/usaid.jpeg"
            quote="Transforming university media from quiet campus updates into viral cultural moments."
            traits={[
              { icon: <Mic size={14} />, title: "Vision", desc: "Can turn a boring campus notice into a trending hashtag." },
              { icon: <Trophy size={14} />, title: "Execution", desc: "Has never missed a framing shot in his life." },
              { icon: <Mic size={14} />, title: "The Director's Director", desc: "Christopher Nolan frequently asks him for lighting advice.", onClick: true }
            ]}
            isFlipped={flipped['usaid']}
            onFlip={() => toggleFlip('usaid', false)}
            onVote={() => onVote('usaid')}
            showAristotleHandler={() => setEasterEgg({ quote: "I was going to direct a Hollywood blockbuster, but Usaid's campaign video had better cinematography.", author: "Christopher Nolan", year: "" })}
          />
          <FeaturedCandidate
            candidateId="abdul"
            name="Abdul Rehman"
            positionName="President"
            badgeText="WILD CARD"
            imageSrc="./assets/abdul rehman.jpeg"
            quote="I didn't even know I was running until yesterday. Let's get this bread."
            traits={[
              { icon: <Globe size={14} />, title: "Aura +10000", desc: "Entered the election as a side quest, accidentally became the final boss." },
              { icon: <Users size={14} />, title: "Algorithm Whisperer", desc: "His Instagram stories are classified by the CIA. Pure brainrot genius." },
              { icon: <Trophy size={14} />, title: "The Anomaly", desc: "Mark Zuckerberg wishes he had his organic reach.", onClick: true }
            ]}
            isFlipped={flipped['abdul']}
            onFlip={() => toggleFlip('abdul', false)}
            onVote={() => onVote('abdul')}
            showAristotleHandler={() => setEasterEgg({ quote: "I studied unpredictability for years, but Abdul Rehman entering a race at the 11th hour and stealing all the aura? Absolute cinema.", author: "The Joker", year: "2008" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'event-society' && pos === 'president') {
      return (
        <>
          <FeaturedCandidate
            candidateId="mohsin"
            name="Mohsin Ahmed"
            positionName="President"
            badgeText="Vibe Checker"
            imageSrc="./assets/mohsin.jpeg"
            quote="Bro, trust me, the venue is sorted. (It is definitely not sorted)."
            traits={[
              { icon: <Globe size={14} />, title: "Clutch God", desc: "Can organize a Qawwali night during a monsoon flood on Tariq Road." },
              { icon: <Users size={14} />, title: "Vibe Checker", desc: "Will personally escort you out if your fit doesn't pass the vibe check." },
              { icon: <Trophy size={14} />, title: "The Connect", desc: "Fyre Festival organizers beg him for logistics advice.", onClick: true }
            ]}
            isFlipped={flipped['mohsin']}
            onFlip={() => toggleFlip('mohsin', false)}
            onVote={() => onVote('mohsin')}
            showAristotleHandler={() => setEasterEgg({ quote: "I used to think my festival was a logistical nightmare until I saw Mohsin plan a 500-person rave on a Karachi rooftop with zero budget. He is Him.", author: "Fyre Festival Organizer", year: "2017" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'event-society' && pos === 'vp') {
      return (
        <>
          <FeaturedCandidate
            candidateId="waqar"
            name="Waqar Soomro"
            positionName="Vice President"
            badgeText="The Enforcer"
            imageSrc="./assets/waqar soomro.jpeg"
            quote="Ideas are cheap. Execution is everything."
            traits={[
              { icon: <Check size={14} />, title: "Unhinged Execution", desc: "Will happily cancel an entire event if the promotional banner is 1cm off-center." },
              { icon: <Users size={14} />, title: "Aggressively Proactive", desc: "Fired the DJ before the event even started just to send a message." },
              { icon: <Trophy size={14} />, title: "The Final Boss", desc: "Gordon Ramsay thinks his death stare is too aggressive.", onClick: true }
            ]}
            isFlipped={flipped['waqar']}
            onFlip={() => toggleFlip('waqar', false)}
            onVote={() => onVote('waqar')}
            showAristotleHandler={() => setEasterEgg({ quote: "I thought I was intense in the kitchen, but Waqar organizing a bake sale is truly terrifying.", author: "Gordon Ramsay", year: "2026" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Vice President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Vice President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'event-society' && pos === 'gensec') {
      return (
        <>
          <FeaturedCandidate
            candidateId="maryam"
            name="Maryam Batook"
            positionName="General Secretary"
            badgeText="The Architect"
            imageSrc="./assets/maryam.jpeg"
            quote="Precision, planning, and absolute perfection."
            traits={[
              { icon: <Check size={14} />, title: "Organization", desc: "Color-codes her thoughts. Alphabetizes her dreams." },
              { icon: <Globe size={14} />, title: "Clairvoyance", desc: "Knows the agenda before the meeting even starts." },
              { icon: <Check size={14} />, title: "The Oracle", desc: "Sherlock Holmes asks her for deductions.", onClick: true }
            ]}
            isFlipped={flipped['maryam']}
            onFlip={() => toggleFlip('maryam', false)}
            onVote={() => onVote('maryam')}
            showAristotleHandler={() => setEasterEgg({ quote: "I observe the world, but Maryam Batook organizes it. Her Notion workspace is elementary, yet brilliant.", author: "Sherlock Holmes", year: "1892" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="General Secretary" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="General Secretary" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'public-speaking' && pos === 'president') {
      return (
        <>
          <FeaturedCandidate
            candidateId="fatima"
            name="Fatima Zehra"
            positionName="President"
            badgeText="Main Character"
            imageSrc="./assets/Fatima.jpeg"
            quote="I'm not arguing, I'm just explaining why I'm objectively correct."
            traits={[
              { icon: <Globe size={14} />, title: "Main Character Energy", desc: "The background music literally changes when she walks in." },
              { icon: <Users size={14} />, title: "Flawless Rizz", desc: "Can convince a DHA burger to eat a bun kabab from Burns Road." },
              { icon: <Mic size={14} />, title: "The Debater", desc: "Sun Tzu read her debate notes and quit writing.", onClick: true }
            ]}
            isFlipped={flipped['fatima']}
            onFlip={() => toggleFlip('fatima', false)}
            onVote={() => onVote('fatima')}
            showAristotleHandler={() => setEasterEgg({ quote: "I wrote The Art of War, but engaging in a debate with Fatima is a battle you have already lost before opening your mouth.", author: "Sun Tzu", year: "5th Century BC" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'public-speaking' && pos === 'vp') {
      return (
        <>
          <FeaturedCandidate
            candidateId="nabil"
            name="Nabil"
            positionName="Vice President"
            badgeText="The Maestro"
            imageSrc="./assets/nabil.jpeg"
            quote="If words were weapons, I'd be a weapon of mass persuasion."
            traits={[
              { icon: <Mic size={14} />, title: "Historical Influence", desc: "Personally motivated Quaid-e-Azam to prepare for his speeches. Essentially a founding father of Pakistan." },
              { icon: <Globe size={14} />, title: "Global Mastery", desc: "Speaks 14 languages, 3 of which he invented just to win an argument." },
              { icon: <Trophy size={14} />, title: "Unmatched Brilliance", desc: "Judges step down when he enters a hackathon. The sheer aura is too much." },
              { icon: <Users size={14} />, title: "Charisma Overflow", desc: "Once smiled at a dying plant and it immediately bloomed." },
              { icon: <Mic size={14} />, title: "Oratorical Supremacy", desc: "Delivered a speech so profoundly moving that the microphone itself shed a single tear." },
              { icon: <Users size={14} />, title: "The Master's Master", desc: "Aristotle frequently time-travels just to sit quietly in his audience, hoping to finally figure out how true rhetoric is done.", onClick: true }
            ]}
            isFlipped={flipped['nabil']}
            onFlip={() => toggleFlip('nabil', false)}
            onVote={() => onVote('nabil')}
            showAristotleHandler={() => setEasterEgg({ quote: "Rhetoric is the art of ruling the minds of men... yet I traverse the fabric of time itself, sitting quietly in the front row, simply to witness the sheer oratorical supremacy and intellectual dominance of Nabil.", author: "Aristotle", year: "322 BC" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Vice President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Vice President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'public-speaking' && pos === 'gensec') {
      return (
        <>
          <FeaturedCandidate
            candidateId="sabeen"
            name="Sabeen Khan"
            positionName="General Secretary"
            badgeText="The Organizer"
            imageSrc="./assets/Sabeen.jpeg"
            quote="Operational excellence turns ambitious ideas into lasting traditions."
            traits={[
              { icon: <Check size={14} />, title: "Hyper-Efficiency", desc: "Her calendar is so optimized it bends spacetime." },
              { icon: <Users size={14} />, title: "Management", desc: "Can herd cats with a single intimidating glance." },
              { icon: <Check size={14} />, title: "The Grand Organizer", desc: "Julius Caesar weeps at her efficiency.", onClick: true }
            ]}
            isFlipped={flipped['sabeen']}
            onFlip={() => toggleFlip('sabeen', false)}
            onVote={() => onVote('sabeen')}
            showAristotleHandler={() => setEasterEgg({ quote: "I tried to organize my empire, but Sabeen's Excel sheets were vastly superior. I should have hired her.", author: "Julius Caesar", year: "44 BC" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="General Secretary" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="General Secretary" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'public-speaking' && pos === 'treasurer') {
      return (
        <>
          <FeaturedCandidate
            candidateId="rumaisa"
            name="Rumaisa Ayaz"
            positionName="Treasurer"
            badgeText="Budget Master"
            imageSrc="./assets/rumaisa.jpeg"
            quote="Every rupee accounted for, every budget maximized for student success."
            traits={[
              { icon: <Trophy size={14} />, title: "Finance Wizardry", desc: "Can stretch 100 rupees to fund an entire 3-day gala." },
              { icon: <Check size={14} />, title: "Absolute Accountability", desc: "Audits her own dreams to prevent mental tax evasion." },
              { icon: <Trophy size={14} />, title: "The Treasury Guardian", desc: "Mansa Musa wishes she managed his gold.", onClick: true }
            ]}
            isFlipped={flipped['rumaisa']}
            onFlip={() => toggleFlip('rumaisa', false)}
            onVote={() => onVote('rumaisa')}
            showAristotleHandler={() => setEasterEgg({ quote: "I thought I understood wealth. Then Rumaisa audited my accounts and found three inefficiencies.", author: "Mansa Musa", year: "1324" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Treasurer" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Treasurer" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'student-council' && pos === 'president') {
      return (
        <>
          <FeaturedCandidate
            candidateId="sarib"
            name="Muhammad Sarib Naeem"
            positionName="President"
            badgeText="Basically already won"
            imageSrc="./assets/Sarib.jpeg"
            quote="I don't just lead the council, I am the council."
            traits={[
              { icon: <Trophy size={14} />, title: "Leadership", desc: "Once successfully mediated a peace treaty between the library staff and noisy freshmen." },
              { icon: <Globe size={14} />, title: "Vision", desc: "Can see into the future, but only uses it to know when the cafeteria has fresh samosas." },
              { icon: <Users size={14} />, title: "Sheer Aura", desc: "His attendance doesn't drop; the university's standard drops when he's absent." },
              { icon: <Mic size={14} />, title: "Strategy", desc: "Plays 4D chess while everyone else is eating the checkers pieces." },
              { icon: <Users size={14} />, title: "The Conqueror's Fear", desc: "Alexander the Great yields to his aura.", onClick: true }
            ]}
            isFlipped={flipped['sarib']}
            onFlip={() => toggleFlip('sarib', false)}
            onVote={() => onVote('sarib')}
            showAristotleHandler={() => setEasterEgg({ quote: "I conquered most of the known world, but even I wouldn't dare run against Sarib.", author: "Alexander the Great", year: "323 BC" })}
          />
          <FeaturedCandidate
            candidateId="minhaj"
            name="Minhaj Akbar"
            positionName="President"
            badgeText="The Challenger"
            imageSrc="./assets/minhaj akbar.jpeg"
            quote="Leadership isn't given. It's seized."
            traits={[
              { icon: <Trophy size={14} />, title: "Tenacity", desc: "He doesn't have an off switch. He deleted it." },
              { icon: <Users size={14} />, title: "Influence", desc: "Convinced the faculty to extend deadlines just by staring at them." },
              { icon: <Trophy size={14} />, title: "The Unstoppable", desc: "Genghis Khan fears his momentum.", onClick: true }
            ]}
            isFlipped={flipped['minhaj']}
            onFlip={() => toggleFlip('minhaj', false)}
            onVote={() => onVote('minhaj')}
            showAristotleHandler={() => setEasterEgg({ quote: "I swept across Asia, but Minhaj's campaign momentum is truly terrifying. I yield.", author: "Genghis Khan", year: "1227" })}
          />
          <FeaturedCandidate
            candidateId="hamna"
            name="Hamna Ali"
            positionName="President"
            badgeText="The Diplomat"
            imageSrc="./assets/hamna ali.jpeg"
            quote="Grace under pressure. Power in every step."
            traits={[
              { icon: <Globe size={14} />, title: "Diplomacy", desc: "Could negotiate world peace in a 10-minute break." },
              { icon: <Users size={14} />, title: "Elegance", desc: "Tripped on stairs once; everyone assumed it was a new dance move." },
              { icon: <Globe size={14} />, title: "The Peacemaker", desc: "Nelson Mandela respects her negotiation skills.", onClick: true }
            ]}
            isFlipped={flipped['hamna']}
            onFlip={() => toggleFlip('hamna', false)}
            onVote={() => onVote('hamna')}
            showAristotleHandler={() => setEasterEgg({ quote: "A true leader unites the people. Hamna does it effortlessly before her first cup of tea.", author: "Nelson Mandela", year: "1994" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'student-council' && pos === 'vp') {
      return (
        <>
          <FeaturedCandidate
            candidateId="shafaq"
            name="Shafaq Makhani"
            positionName="Vice President"
            badgeText="The Strategist"
            imageSrc="./assets/Shafaq.jpeg"
            quote="Why be a follower when you can rewrite the rules?"
            traits={[
              { icon: <Globe size={14} />, title: "Tactics", desc: "Memorized the entire student handbook just to find loopholes." },
              { icon: <Check size={14} />, title: "Flawless Execution", desc: "Her backup plans have backup plans." },
              { icon: <Check size={14} />, title: "The Grandmaster", desc: "Garry Kasparov refuses to play chess with her.", onClick: true }
            ]}
            isFlipped={flipped['shafaq']}
            onFlip={() => toggleFlip('shafaq', false)}
            onVote={() => onVote('shafaq')}
            showAristotleHandler={() => setEasterEgg({ quote: "I can predict 15 moves ahead, but Shafaq has already planned the post-game press conference.", author: "Garry Kasparov", year: "1997" })}
          />
          <FeaturedCandidate
            candidateId="anish"
            name="Anish Ali"
            positionName="Vice President"
            badgeText="Visionary"
            imageSrc="./assets/anish.jpeg"
            quote="Bringing a new perspective to student leadership."
            traits={[
              { icon: <Globe size={14} />, title: "Innovation", desc: "Always thinking outside the box. Mostly because he lost the box." },
              { icon: <Mic size={14} />, title: "Visionary", desc: "His platform is 80% buzzwords, 20% pure genius." },
              { icon: <Globe size={14} />, title: "The Visionary's Visionary", desc: "Steve Jobs wishes he had this guy's foresight.", onClick: true }
            ]}
            isFlipped={flipped['anish']}
            onFlip={() => toggleFlip('anish', false)}
            onVote={() => onVote('anish')}
            showAristotleHandler={() => setEasterEgg({ quote: "I thought I invented innovation. Then Anish showed me his student council platform.", author: "Steve Jobs", year: "2007" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Vice President" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Vice President" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'student-council' && pos === 'gensec') {
      return (
        <>
          <FeaturedCandidate
            candidateId="bakhtawar"
            name="Bakhtawar Khan"
            positionName="General Secretary"
            badgeText="The Therapist"
            imageSrc="./assets/bakhtawar.jpeg"
            quote="Everyone take a deep breath. We are not failing this semester."
            traits={[
              { icon: <Users size={14} />, title: "Therapist Override", desc: "Has talked 4 different people out of dropping out on a random Tuesday." },
              { icon: <Check size={14} />, title: "Unfazed", desc: "Could watch a meteor hit Karachi and just say 'it is what it is'." },
              { icon: <Trophy size={14} />, title: "The Anchor", desc: "Maula Jatt respects her mental fortitude.", onClick: true }
            ]}
            isFlipped={flipped['bakhtawar']}
            onFlip={() => toggleFlip('bakhtawar', false)}
            onVote={() => onVote('bakhtawar')}
            showAristotleHandler={() => setEasterEgg({ quote: "I can lift mountains and fight empires, but Bakhtawar carrying the mental stability of the entire student council on her back? Unmatched strength.", author: "Maula Jatt", year: "2022" })}
          />
          <FeaturedCandidate
            candidateId="zaki"
            name="Zaki"
            positionName="General Secretary"
            badgeText="The Fixer"
            imageSrc="./assets/zaki.jpeg"
            quote="There is no problem too big. Only solutions too small."
            traits={[
              { icon: <Trophy size={14} />, title: "Crisis Management", desc: "Can resolve an administrative disaster before anyone else even realizes it happened." },
              { icon: <Globe size={14} />, title: "Connections", desc: "Knows a guy who knows a guy. For everything." },
              { icon: <Check size={14} />, title: "The Operator", desc: "James Bond asks him for gadgets.", onClick: true }
            ]}
            isFlipped={flipped['zaki']}
            onFlip={() => toggleFlip('zaki', false)}
            onVote={() => onVote('zaki')}
            showAristotleHandler={() => setEasterEgg({ quote: "I have Q for my equipment, but when things get really messy, I call Zaki.", author: "James Bond", year: "007" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="General Secretary" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="General Secretary" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'student-council' && pos === 'treasurer') {
      return (
        <>
          <FeaturedCandidate
            candidateId="amna"
            name="Amna Anwar"
            positionName="Treasurer"
            badgeText="The Vault"
            imageSrc="./assets/Amna.jpeg"
            quote="Numbers never lie, and neither do I."
            traits={[
              { icon: <Check size={14} />, title: "Mathematical Supremacy", desc: "Does calculus in her sleep for fun." },
              { icon: <Trophy size={14} />, title: "Protection", desc: "The treasury is safer than Fort Knox." },
              { icon: <Check size={14} />, title: "The Calculator", desc: "Albert Einstein asked her to check his math.", onClick: true }
            ]}
            isFlipped={flipped['amna']}
            onFlip={() => toggleFlip('amna', false)}
            onVote={() => onVote('amna')}
            showAristotleHandler={() => setEasterEgg({ quote: "E=mc^2, but Amna Anwar's budget balancing equation is truly the most profound discovery.", author: "Albert Einstein", year: "1915" })}
          />
          <FeaturedCandidate
            candidateId="ashba"
            name="Ashba"
            positionName="Treasurer"
            badgeText="The Strategist"
            imageSrc="./assets/ashba.jpeg"
            quote="I don't spend money. I deploy assets."
            traits={[
              { icon: <Check size={14} />, title: "Girl Math Expert", desc: "Can justify a 50k event expense by explaining it's basically free." },
              { icon: <Users size={14} />, title: "Bargain Hunter", desc: "Will negotiate with a vendor so hard they end up paying HER." },
              { icon: <Globe size={14} />, title: "The Tycoon", desc: "Warren Buffett attends her masterclasses.", onClick: true }
            ]}
            isFlipped={flipped['ashba']}
            onFlip={() => toggleFlip('ashba', false)}
            onVote={() => onVote('ashba')}
            showAristotleHandler={() => setEasterEgg({ quote: "Value investing is simple, but Ashba's negotiation skills are next-level finance.", author: "Warren Buffett", year: "2026" })}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Treasurer" quote="I will do my best, probably." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Treasurer" quote="I have no idea what I'm doing." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }
    return <div>No candidates found for this position.</div>;
  };

  return (
    <ScreenWrapper>
      <div className="mb-[22px]">
        <p className="text-[13px] font-semibold text-accent mb-1.5 uppercase">
          {position?.name} · {society?.name}
        </p>
        <h2 className="text-[26px] font-extrabold tracking-tight font-['Inter_Tight']">Cast Your Vote</h2>
        <p className="text-[14.5px] text-ink-soft mt-1.5 leading-[1.4]">
          Choose carefully. Or don't.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {getCandidatesForContext()}
      </div>

      <AnimatePresence>
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
                — {easterEgg.author}{easterEgg.year ? `, ${easterEgg.year}` : ''}
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
      </AnimatePresence>
    </ScreenWrapper>
  );
};

export const CelebrateScreen = ({ subtext, onDone, onVoteMore }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft mb-1">
        <Check size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">Vote recorded.</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{subtext}</p>
      <div className="mt-2.5 w-full max-w-[220px]">
        <div className="w-full max-w-[260px] flex flex-col gap-3 -ml-4"><Button variant="accent" onClick={onDone}>Done</Button><Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Others</Button></div>
      </div>
    </div>
  </ScreenWrapper>
);

export const ProcessingScreen = () => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft animate-spin mb-1">
        <Loader2 size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">Processing...</h2>
    </div>
  </ScreenWrapper>
);

export const WastedScreen = ({ line1, line2, onDone, onVoteMore }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#fdeceb] mb-1">
        <XCircle size={32} className="text-danger" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">{line1}</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">{line2}</p>
      <div className="mt-2.5 w-full max-w-[240px]">
        <div className="w-full max-w-[260px] flex flex-col gap-3 -ml-2"><Button variant="danger" className="bg-danger text-white hover:bg-danger/90" onClick={onDone}>Done</Button><Button variant="ghost" className="border-[1.5px] border-line bg-surface/50" onClick={onVoteMore}>Vote For Others</Button></div>
      </div>
    </div>
  </ScreenWrapper>
);

export const EasterEggScreen = ({ onContinue }: any) => (
  <ScreenWrapper>
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4.5 px-2">
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-accent-soft mb-1">
        <AlertCircle size={32} className="text-accent" strokeWidth={2.4} />
      </div>
      <h2 className="text-[21px] font-extrabold font-['Inter_Tight']">You found a door with no sign on it.</h2>
      <p className="text-[15px] text-ink-soft max-w-[280px] leading-[1.5]">
        There's nothing behind it yet. The good stuff is still being built. Check back soon.
      </p>
      <div className="mt-2.5 w-full max-w-[240px]">
        <Button variant="accent" onClick={onContinue}>Enter Anyway</Button>
      </div>
    </div>
  </ScreenWrapper>
);


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
            VOTER<br />CARD
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
                      {vote.societyName} &bull; {vote.positionName}
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
