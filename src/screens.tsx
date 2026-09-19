import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/Shared';
import { CONFIG } from './data';
import { Society } from './types';
import { Check, Mic, Globe, Trophy, Users, Loader2, XCircle, AlertCircle, Quote } from 'lucide-react';

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
          This is a practice environment. Nothing here is legally binding. Probably. No one tell Asif Yaqoob about this.<br/>
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
      <Button variant="ghost" onClick={onFlip}>
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
              {name} {candidateId === 'nabil' && <span className="text-[16px] font-normal opacity-90 mb-0.5">21</span>}
            </div>
            {idTag && (
              <div className="text-white/90 text-[14px] font-medium flex items-center gap-1.5 tracking-wide mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> {idTag}
              </div>
            )}
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
      <Button variant="ghost" onClick={onFlip}>
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
  const [showAristotle, setShowAristotle] = useState(false);

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
            imageSrc="/assets/usaid.jpeg"
            idTag="F22MED001"
            quote="Transforming university media from quiet campus updates into viral cultural moments."
            traits={[
              { icon: <Mic size={14} />, title: "Vision", desc: "Can turn a boring campus notice into a trending hashtag." },
              { icon: <Trophy size={14} />, title: "Execution", desc: "Has never missed a framing shot in his life." }
            ]}
            isFlipped={flipped['usaid']}
            onFlip={() => toggleFlip('usaid', false)}
            onVote={() => onVote('usaid')}
          />
          <GenericCandidate
            candidateId="candidate1" name="Candidate 1" positionName="President" quote="I have an iPhone, I can be President." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')}
          />
          <GenericCandidate
            candidateId="candidate2" name="Candidate 2" positionName="President" quote="I will make a TikTok account for the society." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')}
          />
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
            badgeText="Event Mastermind"
            imageSrc="/assets/mohsin.jpeg"
            idTag="F23EVE099"
            quote="Delivering campus events that people remember long after graduation."
            traits={[
              { icon: <Globe size={14} />, title: "Logistics", desc: "Can organize a 500-person event with 12 hours notice and zero budget." },
              { icon: <Users size={14} />, title: "Crowd Control", desc: "People naturally form orderly lines when he enters the room." }
            ]}
            isFlipped={flipped['mohsin']}
            onFlip={() => toggleFlip('mohsin', false)}
            onVote={() => onVote('mohsin')}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I'll just hire a DJ." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="We should do a bake sale." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
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
            badgeText="Voice of Reason"
            imageSrc="/assets/Fatima.jpeg"
            idTag="F23PUB001"
            quote="Eloquence is not just the words we choose, but the standards we uphold."
            traits={[
              { icon: <Quote size={14} />, title: "Eloquence", desc: "Her casual conversations sound like TED talks." },
              { icon: <Users size={14} />, title: "Leadership", desc: "Inspires people to read the dictionary for fun." }
            ]}
            isFlipped={flipped['fatima']}
            onFlip={() => toggleFlip('fatima', false)}
            onVote={() => onVote('fatima')}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I talk loudly, therefore I am right." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="Public speaking is just talking to people." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
        </>
      );
    }

    if (soc === 'public-speaking' && pos === 'vp') {
      return (
        <>
          <FeaturedCandidate
            candidateId="nabil"
            name="Muhammad Nabil"
            positionName="Vice President"
            badgeText="Objectively the strongest candidate"
            imageSrc="/assets/nabil.jpeg"
            idTag="F23CSC009"
            quote="I have a slightly unhealthy relationship with microphones."
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
            showAristotleHandler={() => setShowAristotle(true)}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Vice President" quote="I will support the President. Or something." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Vice President" quote="What does a VP even do?" traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
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
            imageSrc="/assets/Sabeen.jpeg"
            idTag="F23PUB012"
            quote="Operational excellence turns ambitious ideas into lasting traditions."
            traits={[
              { icon: <Check size={14} />, title: "Efficiency", desc: "Her calendar has a calendar." },
              { icon: <Users size={14} />, title: "Management", desc: "Can herd cats with a single glance." }
            ]}
            isFlipped={flipped['sabeen']}
            onFlip={() => toggleFlip('sabeen', false)}
            onVote={() => onVote('sabeen')}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="General Secretary" quote="I will write emails." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="General Secretary" quote="I have a nice notebook." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
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
            imageSrc="/assets/rumaisa.jpeg"
            idTag="F23PUB034"
            quote="Every rupee accounted for, every budget maximized for student success."
            traits={[
              { icon: <Trophy size={14} />, title: "Finance", desc: "Can stretch 100 rupees to fund an entire gala." },
              { icon: <Check size={14} />, title: "Accountability", desc: "Audits her own dreams." }
            ]}
            isFlipped={flipped['rumaisa']}
            onFlip={() => toggleFlip('rumaisa', false)}
            onVote={() => onVote('rumaisa')}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="Treasurer" quote="I have a calculator." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="Treasurer" quote="Math is hard, but I'll try." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
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
            imageSrc="/assets/Sarib.jpeg"
            idTag="24BME004"
            quote="I don't just lead the council, I am the council."
            traits={[
              { icon: <Trophy size={14} />, title: "Leadership", desc: "Once successfully mediated a peace treaty between the library staff and noisy freshmen." },
              { icon: <Globe size={14} />, title: "Vision", desc: "Can see into the future, but only uses it to know when the cafeteria has fresh samosas." },
              { icon: <Users size={14} />, title: "Sheer Aura", desc: "His attendance doesn't drop; the university's standard drops when he's absent." },
              { icon: <Mic size={14} />, title: "Strategy", desc: "Plays 4D chess while everyone else is eating the checkers pieces." }
            ]}
            isFlipped={flipped['sarib']}
            onFlip={() => toggleFlip('sarib', false)}
            onVote={() => onVote('sarib')}
          />
          <GenericCandidate candidateId="candidate1" name="Candidate 1" positionName="President" quote="I want more pizza days." traits={genericTraits1} isFlipped={flipped['candidate1']} onFlip={() => toggleFlip('candidate1', true)} onVote={() => onVoteOther('candidate1')} />
          <GenericCandidate candidateId="candidate2" name="Candidate 2" positionName="President" quote="I will be a president for the people." traits={genericTraits2} isFlipped={flipped['candidate2']} onFlip={() => toggleFlip('candidate2', true)} onVote={() => onVoteOther('candidate2')} />
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
            badgeText="Determined"
            imageSrc="/assets/Shafaq.jpeg"
            idTag="F23VP001"
            quote="Empowering the student body, one initiative at a time."
            traits={[
              { icon: <Users size={14} />, title: "Teamwork", desc: "Believes in collaborative success." }
            ]}
            isFlipped={flipped['shafaq']}
            onFlip={() => toggleFlip('shafaq', false)}
            onVote={() => onVote('shafaq')}
          />
          <FeaturedCandidate
            candidateId="anish"
            name="Anish Ali"
            positionName="Vice President"
            badgeText="Visionary"
            imageSrc="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
            idTag="F23VP002"
            quote="Bringing a new perspective to student leadership."
            traits={[
              { icon: <Globe size={14} />, title: "Innovation", desc: "Always thinking outside the box." }
            ]}
            isFlipped={flipped['anish']}
            onFlip={() => toggleFlip('anish', false)}
            onVote={() => onVote('anish')}
          />
        </>
      );
    }

    if (soc === 'student-council' && pos === 'gensec') {
      return (
        <>
          <FeaturedCandidate
            candidateId="bakhtawar"
            name="Bakhtawar Khan Afridi"
            positionName="General Secretary"
            badgeText="Diligent"
            imageSrc="/assets/bakhtawar.jpeg"
            idTag="F23GS001"
            quote="Clear communication is the foundation of progress."
            traits={[
              { icon: <Check size={14} />, title: "Organization", desc: "Keeps everything in perfect order." }
            ]}
            isFlipped={flipped['bakhtawar']}
            onFlip={() => toggleFlip('bakhtawar', false)}
            onVote={() => onVote('bakhtawar')}
          />
          <FeaturedCandidate
            candidateId="zaki"
            name="Muhammad Zaki"
            positionName="General Secretary"
            badgeText="Reliable"
            imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
            idTag="F23GS002"
            quote="I ensure that every voice is documented and heard."
            traits={[
              { icon: <Users size={14} />, title: "Dependable", desc: "You can always count on him." }
            ]}
            isFlipped={flipped['zaki']}
            onFlip={() => toggleFlip('zaki', false)}
            onVote={() => onVote('zaki')}
          />
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
            badgeText="Analytical"
            imageSrc="/assets/Amna.jpeg"
            idTag="F23TR001"
            quote="Prudent financial planning for a thriving student community."
            traits={[
              { icon: <Trophy size={14} />, title: "Finance", desc: "Excellent with numbers." }
            ]}
            isFlipped={flipped['amna']}
            onFlip={() => toggleFlip('amna', false)}
            onVote={() => onVote('amna')}
          />
          <FeaturedCandidate
            candidateId="ashba"
            name="Ashba Humayun"
            positionName="Treasurer"
            badgeText="Strategic"
            imageSrc="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"
            idTag="F23TR002"
            quote="Maximizing resources to create the best student experience."
            traits={[
              { icon: <Check size={14} />, title: "Strategic", desc: "Always plans ahead." }
            ]}
            isFlipped={flipped['ashba']}
            onFlip={() => toggleFlip('ashba', false)}
            onVote={() => onVote('ashba')}
          />
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
        {showAristotle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => setShowAristotle(false)}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-[400px] text-center"
            >
              <p className="text-[#E5E0D8] text-[22px] md:text-[28px] font-serif leading-[1.6] italic tracking-wide">
                "Rhetoric is the art of ruling the minds of men... yet I traverse the fabric of time itself, sitting quietly in the front row, simply to witness the sheer oratorical supremacy and intellectual dominance of Nabil."
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="mt-8 text-[#A89F91] text-[15px] font-serif uppercase tracking-[0.2em]"
              >
                — Aristotle, 322 BC
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

export const CelebrateScreen = ({ subtext, onContinue }: any) => (
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

export const WastedScreen = ({ line1, line2, onContinue }: any) => (
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
