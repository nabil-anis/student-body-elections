import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './components/Shared';
import { CONFIG } from './data';
import { Society } from './types';
import { Check, Mic, Globe, Trophy, Users, Loader2, XCircle, AlertCircle } from 'lucide-react';

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
          {/* Add your logo src here later */}
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
                  {pos.available ? '3 candidates' : 'Not currently active'}
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

import { AnimatePresence } from 'motion/react';

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

  const isPublicSpeakingVP = society?.id === 'public-speaking' && position?.id === 'vp';
  const isCouncilPresident = society?.id === 'student-council' && position?.id === 'president';

  return (
    <ScreenWrapper>
      <div className="mb-[22px]">
        <p className="text-[13px] font-semibold text-accent mb-1.5 uppercase">
          {position?.name} · {society?.name}
        </p>
        <h2 className="text-[26px] font-extrabold tracking-tight font-['Inter_Tight']">Cast Your Vote</h2>
        <p className="text-[14.5px] text-ink-soft mt-1.5 leading-[1.4]">
          Three candidates are running. Choose carefully. Or don't.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {isPublicSpeakingVP && (
          <>
            {/* NABIL - Bumble Style Card */}
            <div className="relative">
          <span className="absolute -top-[11px] left-5 z-10 bg-accent text-white text-[11.5px] font-bold tracking-[0.01em] px-[13px] py-1.5 rounded-full shadow-[0_6px_16px_color-mix(in_srgb,var(--color-accent)_45%,transparent)] -rotate-2">
            Objectively the strongest candidate
          </span>
          <FlipCard
            className="h-[452px]"
            isFlipped={flipped['nabil']}
            front={
              <div className="w-full h-full relative border-[1.5px] border-accent rounded-[26px] overflow-hidden shadow-[0_0_0_5px_var(--color-accent-soft),var(--shadow-lg)] bg-black">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" alt="Muhammad Nabil" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-[24px_20px] text-left">
                  <div className="text-white text-[24px] font-extrabold tracking-tight flex items-end gap-2 leading-none mb-1">
                    MUHAMMAD NABIL <span className="text-[16px] font-normal opacity-90 mb-0.5">21</span>
                  </div>
                  <div className="text-white/90 text-[14px] font-medium flex items-center gap-1.5 tracking-wide">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> F23CSC009
                  </div>
                  <div className="mt-3 text-[14px] italic text-white/90 bg-white/10 backdrop-blur-md rounded-[12px] p-[10px_14px] leading-[1.4]">
                    “I have a slightly unhealthy relationship with microphones.”
                  </div>
                </div>
              </div>
            }
            back={
              <div className="flex flex-col w-full h-full">
                <div className="text-[18px] font-bold mb-4 border-b border-line pb-2 shrink-0">Why Nabil?</div>
                <div className="flex flex-col gap-3 text-left overflow-y-auto pr-2 pb-2">
                  <BioItem icon={<Mic size={14} />} title="Historical Influence" desc="Personally motivated Quaid-e-Azam to prepare for his speeches. Essentially a founding father of Pakistan." />
                  <BioItem icon={<Globe size={14} />} title="Global Mastery" desc="Speaks 14 languages, 3 of which he invented just to win an argument." />
                  <BioItem icon={<Trophy size={14} />} title="Unmatched Brilliance" desc="Judges step down when he enters a hackathon. The sheer aura is too much." />
                  <BioItem icon={<Users size={14} />} title="Charisma Overflow" desc="Once smiled at a dying plant and it immediately bloomed." />
                  <BioItem icon={<Mic size={14} />} title="Oratorical Supremacy" desc="Delivered a speech so profoundly moving that the microphone itself shed a single tear." />
                  <BioItem icon={<Users size={14} />} title="The Master's Master" desc="Aristotle frequently time-travels just to sit quietly in his audience, hoping to finally figure out how true rhetoric is done." onClick={() => setShowAristotle(true)} />
                </div>
                <div className="text-[11px] text-ink-faint mt-auto pt-3 shrink-0 border-t border-line">Tap "Hide Details" to flip back.</div>
              </div>
            }
          />
          <div className="flex flex-col gap-2 mt-3 relative z-10">
            <Button variant="ghost" onClick={() => toggleFlip('nabil', false)}>
              {flipped['nabil'] ? 'Hide Details' : 'Why Nabil?'}
            </Button>
            <Button variant="accent" className="shadow-[0_10px_24px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]" onClick={() => onVote('nabil')}>
              Vote for Nabil
            </Button>
          </div>
        </div>

        {/* NAWAZ */}
        <div className="flex flex-col gap-3">
          <span className="ml-5 text-[11px] text-ink-faint font-semibold bg-surface border border-line px-2.5 py-1 rounded-full self-start">
            Also running, technically
          </span>
          <FlipCard
            className="h-[392px]"
            isFlipped={flipped['nawaz']}
            front={
              <div className="flex flex-col items-center justify-center p-[24px_20px] w-full h-full bg-background rounded-[26px]">
                <div className="w-[76px] h-[76px] rounded-full mb-3.5 bg-background border-[1.5px] border-line p-2 text-ink shrink-0">
                  <svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="16" r="9" stroke="currentColor" strokeWidth="2.4"/><path d="M14 52 C14 34 18 28 30 28 C42 28 46 34 46 52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M22 15c2-4 14-4 16 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
                </div>
                <div className="text-[20px] font-extrabold tracking-tight text-ink-soft">MUHAMMAD NAWAZ</div>
                <div className="text-[13.5px] text-ink-soft mt-1">Candidate for Vice President</div>
                <div className="mt-3.5 text-[13.5px] italic text-ink bg-background border border-line rounded-[14px] p-[12px_14px] leading-[1.5]">
                  “I'm not saying I'm the best, mostly because I still don't know what 'best' means.”
                </div>
              </div>
            }
            back={
              <div className="flex flex-col w-full h-full text-left">
                <div className="flex flex-col gap-3 w-full">
                  <BioItem icon={<Mic size={14} />} title="Public Speaking" desc="Read his entire speech from a piece of paper. The paper was blank. He just forgot to write it." />
                  <BioItem icon={<Globe size={14} />} title="Crisis Management" desc="Got stuck in a revolving door for 45 minutes because he thought he had to wait for it to stop." />
                  <BioItem icon={<Trophy size={14} />} title="Debate Record" desc="Lost a debate to a guy who wasn't even participating." />
                  <BioItem icon={<Users size={14} />} title="Campaign Strategy" desc="Tried to distribute digital flyers via AirDrop. To a room full of Android users." />
                </div>
              </div>
            }
          />
          <div className="flex flex-col gap-2">
            <Button variant="ghost" onClick={() => toggleFlip('nawaz', true)}>
              {flipped['nawaz'] ? 'Hide Details' : 'Why Nawaz?'}
            </Button>
            <Button className="bg-ink" onClick={() => onVoteOther('nawaz')}>
              Vote for Nawaz
            </Button>
          </div>
        </div>

        {/* WANIZA */}
        <div className="flex flex-col gap-3">
          <span className="ml-5 text-[11px] text-ink-faint font-semibold bg-surface border border-line px-2.5 py-1 rounded-full self-start">
            Also running, technically
          </span>
          <FlipCard
            className="h-[392px]"
            isFlipped={flipped['waniza']}
            front={
              <div className="flex flex-col items-center justify-center p-[24px_20px] w-full h-full bg-background rounded-[26px]">
                <div className="w-[76px] h-[76px] rounded-full mb-3.5 bg-background border-[1.5px] border-line p-2 text-ink shrink-0">
                  <svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="16" r="9" stroke="currentColor" strokeWidth="2.4"/><path d="M14 52 C14 34 18 28 30 28 C42 28 46 34 46 52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M21 9c2-3 16-3 18 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="30" cy="5" r="2" fill="currentColor"/></svg>
                </div>
                <div className="text-[20px] font-extrabold tracking-tight text-ink-soft">WANIZA BATOOL</div>
                <div className="text-[13.5px] text-ink-soft mt-1">Candidate for Vice President</div>
                <div className="mt-3.5 text-[13.5px] italic text-ink bg-background border border-line rounded-[14px] p-[12px_14px] leading-[1.5]">
                  “Confidence is just enthusiasm nobody has corrected yet.”
                </div>
              </div>
            }
            back={
              <div className="flex flex-col w-full h-full text-left">
                <div className="flex flex-col gap-3 w-full">
                  <BioItem icon={<Mic size={14} />} title="Public Speaking" desc="Prepared a 10-minute speech, read for 45 seconds, sat down. Cried." />
                  <BioItem icon={<Globe size={14} />} title="Crisis Management" desc="Organized an event so poorly that people thought it was a social experiment on despair." />
                  <BioItem icon={<Trophy size={14} />} title="Team Leadership" desc="Delegates everything, including the cognitive effort required to breathe." />
                  <BioItem icon={<Users size={14} />} title="Campaign Strategy" desc="Her only strategy is hoping everyone else accidentally drops out." />
                </div>
              </div>
            }
          />
          <div className="flex flex-col gap-2">
            <Button variant="ghost" onClick={() => toggleFlip('waniza', true)}>
              {flipped['waniza'] ? 'Hide Details' : 'Why Waniza?'}
            </Button>
            <Button className="bg-ink" onClick={() => onVoteOther('waniza')}>
              Vote for Waniza
            </Button>
          </div>
        </div>
        </>
        )}

        {isCouncilPresident && (
          <>
            {/* SARIB - God-Tier Profile */}
            <div className="relative">
              <span className="absolute -top-[11px] left-5 z-10 bg-accent text-white text-[11.5px] font-bold tracking-[0.01em] px-[13px] py-1.5 rounded-full shadow-[0_6px_16px_color-mix(in_srgb,var(--color-accent)_45%,transparent)] -rotate-2">
                Basically already won
              </span>
              <FlipCard
                className="h-[452px]"
                isFlipped={flipped['sarib']}
                front={
                  <div className="w-full h-full relative border-[1.5px] border-accent rounded-[26px] overflow-hidden shadow-[0_0_0_5px_var(--color-accent-soft),var(--shadow-lg)] bg-black">
                    <img src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80" alt="Muhammad Sarib Naeem" className="w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-[24px_20px] text-left">
                      <div className="text-white text-[24px] font-extrabold tracking-tight flex items-end gap-2 leading-none mb-1">
                        MUHAMMAD SARIB NAEEM
                      </div>
                      <div className="text-white/90 text-[14px] font-medium flex items-center gap-1.5 tracking-wide mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> 24BME004
                      </div>
                      <div className="mt-3 text-[14px] italic text-white/90 bg-white/10 backdrop-blur-md rounded-[12px] p-[10px_14px] leading-[1.4]">
                        “I don't just lead the council, I am the council.”
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col w-full h-full">
                    <div className="text-[18px] font-bold mb-4 border-b border-line pb-2 shrink-0">Why Sarib?</div>
                    <div className="flex flex-col gap-3 text-left overflow-y-auto pr-2 pb-2">
                      <BioItem icon={<Trophy size={14} />} title="Leadership" desc="Once successfully mediated a peace treaty between the library staff and noisy freshmen." />
                      <BioItem icon={<Globe size={14} />} title="Vision" desc="Can see into the future, but only uses it to know when the cafeteria has fresh samosas." />
                      <BioItem icon={<Users size={14} />} title="Sheer Aura" desc="His attendance doesn't drop; the university's standard drops when he's absent." />
                      <BioItem icon={<Mic size={14} />} title="Strategy" desc="Plays 4D chess while everyone else is eating the checkers pieces." />
                    </div>
                    <div className="text-[11px] text-ink-faint mt-auto pt-3 shrink-0 border-t border-line">Tap "Hide Details" to flip back.</div>
                  </div>
                }
              />
              <div className="flex flex-col gap-2 mt-3 relative z-10">
                <Button variant="ghost" onClick={() => toggleFlip('sarib', false)}>
                  {flipped['sarib'] ? 'Hide Details' : 'Why Sarib?'}
                </Button>
                <Button variant="accent" className="shadow-[0_10px_24px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]" onClick={() => onVote('sarib')}>
                  Vote for Sarib
                </Button>
              </div>
            </div>

            {/* MINHAJ */}
            <div className="flex flex-col gap-3">
              <span className="ml-5 text-[11px] text-ink-faint font-semibold bg-surface border border-line px-2.5 py-1 rounded-full self-start">
                Also running, technically
              </span>
              <FlipCard
                className="h-[392px]"
                isFlipped={flipped['minhaj']}
                front={
                  <div className="flex flex-col items-center justify-center p-[24px_20px] w-full h-full bg-background rounded-[26px]">
                    <div className="w-[76px] h-[76px] rounded-full mb-3.5 bg-background border-[1.5px] border-line p-2 text-ink shrink-0">
                      <svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="16" r="9" stroke="currentColor" strokeWidth="2.4"/><path d="M14 52 C14 34 18 28 30 28 C42 28 46 34 46 52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M21 9c2-3 16-3 18 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="30" cy="5" r="2" fill="currentColor"/></svg>
                    </div>
                    <div className="text-[20px] font-extrabold tracking-tight text-ink-soft">MINHAJ AKBAR</div>
                    <div className="text-[13.5px] text-ink-soft mt-1">Candidate for President</div>
                    <div className="text-[12px] text-ink-faint mt-0.5">F24BAC004</div>
                    <div className="mt-3.5 text-[13.5px] italic text-ink bg-background border border-line rounded-[14px] p-[12px_14px] leading-[1.5]">
                      “I promise to make things different. Not better, just different.”
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col w-full h-full text-left">
                    <div className="flex flex-col gap-3 w-full">
                      <BioItem icon={<Users size={14} />} title="Leadership" desc="Successfully managed a WhatsApp group for 12 minutes before accidentally removing himself as admin." />
                      <BioItem icon={<AlertCircle size={14} />} title="Problem Solving" desc="Tries to fix Wi-Fi issues by turning his monitor on and off." />
                      <BioItem icon={<Mic size={14} />} title="Public Relations" desc="Once waved back at someone who was waving to the person behind him. He hasn't recovered since." />
                      <BioItem icon={<Check size={14} />} title="Endorsements" desc="Strongly endorsed by the campus stray cats, mostly because he constantly drops his lunch." />
                    </div>
                  </div>
                }
              />
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => toggleFlip('minhaj', true)}>
                  {flipped['minhaj'] ? 'Hide Details' : 'Why Minhaj?'}
                </Button>
                <Button className="bg-ink" onClick={() => onVoteOther('minhaj')}>
                  Vote for Minhaj
                </Button>
              </div>
            </div>

            {/* HAMNA */}
            <div className="flex flex-col gap-3">
              <span className="ml-5 text-[11px] text-ink-faint font-semibold bg-surface border border-line px-2.5 py-1 rounded-full self-start">
                Also running, technically
              </span>
              <FlipCard
                className="h-[392px]"
                isFlipped={flipped['hamna']}
                front={
                  <div className="flex flex-col items-center justify-center p-[24px_20px] w-full h-full bg-background rounded-[26px]">
                    <div className="w-[76px] h-[76px] rounded-full mb-3.5 bg-background border-[1.5px] border-line p-2 text-ink shrink-0">
                      <svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="16" r="9" stroke="currentColor" strokeWidth="2.4"/><path d="M14 52 C14 34 18 28 30 28 C42 28 46 34 46 52" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M21 9c2-3 16-3 18 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><circle cx="30" cy="5" r="2" fill="currentColor"/></svg>
                    </div>
                    <div className="text-[20px] font-extrabold tracking-tight text-ink-soft">HAMNA ALI BAIG</div>
                    <div className="text-[13.5px] text-ink-soft mt-1">Candidate for President</div>
                    <div className="text-[12px] text-ink-faint mt-0.5">S25PSY001</div>
                    <div className="mt-3.5 text-[13.5px] italic text-ink bg-background border border-line rounded-[14px] p-[12px_14px] leading-[1.5]">
                      “As a psychology major, I can confirm that my decisions are clinically questionable.”
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col w-full h-full text-left">
                    <div className="flex flex-col gap-3 w-full">
                      <BioItem icon={<Users size={14} />} title="Strategy" desc="Creates elaborate mind maps for tasks like 'making tea' and still gets it wrong." />
                      <BioItem icon={<AlertCircle size={14} />} title="Crisis Management" desc="Her response to any crisis is 'Let's just journal about it'." />
                      <BioItem icon={<Mic size={14} />} title="Communication" desc="Explains simple concepts using so much jargon that people just agree to make her stop." />
                      <BioItem icon={<Globe size={14} />} title="Vision" desc="Plans to replace all midterm exams with 'group therapy sessions'." />
                    </div>
                  </div>
                }
              />
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => toggleFlip('hamna', true)}>
                  {flipped['hamna'] ? 'Hide Details' : 'Why Hamna?'}
                </Button>
                <Button className="bg-ink" onClick={() => onVoteOther('hamna')}>
                  Vote for Hamna
                </Button>
              </div>
            </div>
          </>
        )}
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
