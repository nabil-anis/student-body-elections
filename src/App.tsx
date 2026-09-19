import React, { useState, useEffect } from 'react';
import { TopBar, Modal, Button, Confetti } from './components/Shared';
import {
  LandingScreen, HubScreen, PositionsScreen, CandidatesScreen,
  CelebrateScreen, ProcessingScreen, WastedScreen, EasterEggScreen, GeneratingScreen, ElectionCardScreen
} from './screens';
import { ScreenId, Theme, Society } from './types';
import { CONFIG, EXTENDED_GENDERS } from './data';
import { AnimatePresence } from 'motion/react';
import { Github, Linkedin, Globe, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [history, setHistory] = useState<ScreenId[]>(['landing']);
  const [theme, setTheme] = useState<Theme>(null);
  const [votes, setVotes] = useState<Record<string, any>>({});

  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);
  const [pendingCandidate, setPendingCandidate] = useState<string | null>(null);

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showExtendedGenders, setShowExtendedGenders] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [showDiscourageModal, setShowDiscourageModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);

  const [lockedModalContent, setLockedModalContent] = useState(CONFIG.lockedMessages[0]);
  const [paidModalContent, setPaidModalContent] = useState(CONFIG.paidResponses[0]);
  const [celebrateSubtext, setCelebrateSubtext] = useState(CONFIG.celebrateLines[0]);
  const [wastedContent, setWastedContent] = useState(CONFIG.wastedSequence[0]);
  const [discourageMsg, setDiscourageMsg] = useState("");
  const [flipCallback, setFlipCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (theme) {
      document.documentElement.className = `theme-${theme}`;
    } else {
      document.documentElement.className = '';
    }
  }, [theme]);

  const haptic = (pattern: number | number[]) => {
    try {
      if ('vibrate' in navigator) navigator.vibrate(pattern);
    } catch (e) { /* ignore */ }
  };

  const navigate = (screen: ScreenId, replace = false) => {
    setCurrentScreen(screen);
    if (!replace) {
      setHistory((prev) => [...prev, screen]);
    } else {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = screen;
        return newHistory;
      });
    }
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    } else {
      navigate('hub', true);
    }
  };

  const handleThemeSelect = (selectedTheme: Theme | string) => {
    if (selectedTheme === 'other' && !showExtendedGenders) {
      setShowExtendedGenders(true);
      return;
    }
    setTheme((selectedTheme === 'boy' || selectedTheme === 'girl') ? selectedTheme as Theme : 'other');
    setShowGenderModal(false);
    setShowExtendedGenders(false);
    
    if (selectedTheme !== 'boy' && selectedTheme !== 'girl') {
      navigate('easter');
    } else {
      navigate('hub');
    }
  };

  const handleLockedAttempt = () => {
    setLockedModalContent(CONFIG.lockedMessages[Math.floor(Math.random() * CONFIG.lockedMessages.length)]);
    setShowLockedModal(true);
  };

  const handlePayClick = () => {
    haptic(30);
    setShowLockedModal(false);
    window.open('https://wa.me/923102152875', '_blank');
  };

  const handleVoteOther = (id: string) => {
    haptic(40);
    setPendingCandidate(id);
    setShowConfirmModal(true);
  };

  const handleConfirmWasted = () => {
    haptic([30, 40, 30]);
    setShowConfirmModal(false);
    navigate('processing');
    setTimeout(() => {
      setWastedContent(CONFIG.wastedSequence[0]);
      if (pendingCandidate && selectedSociety && selectedPosition) {
        setVotes(prev => ({
          ...prev,
          [`${selectedSociety.id}_${selectedPosition.id}`]: {
            candidateId: pendingCandidate,
            candidateName: (CONFIG.candidates as any)[pendingCandidate]?.name || "Candidate " + pendingCandidate,
            societyId: selectedSociety.id,
            societyName: selectedSociety.name,
            positionId: selectedPosition.id,
            positionName: selectedPosition.name
          }
        }));
      }
      const audio = new Audio('./assets/gay.mpeg');
      audio.play().catch(() => {});
      navigate('wasted', true);
    }, 1100);
  };

  const femaleCandidates = ['amna', 'fatima', 'sabeen', 'shafaq', 'bakhtawar', 'rumaisa', 'ashba'];

  const handleVoteSuccess = (candidateId: string) => {
    if (selectedSociety && selectedPosition) {
      setVotes(prev => ({
        ...prev,
        [`${selectedSociety.id}_${selectedPosition.id}`]: {
          candidateId,
          candidateName: (CONFIG.candidates as any)[candidateId]?.name || "Candidate " + candidateId,
          societyId: selectedSociety.id,
          societyName: selectedSociety.name,
          positionId: selectedPosition.id,
          positionName: selectedPosition.name
        }
      }));
    }
    const lines = CONFIG.candidateCelebrateLines[candidateId] || CONFIG.celebrateLines;
    setCelebrateSubtext(lines[Math.floor(Math.random() * lines.length)]);

    const isCandidateFemale = femaleCandidates.includes(candidateId);
    const isVoterBoy = theme === 'boy';
    const isVoterGirl = theme === 'girl';
    const sameGender = (isVoterBoy && !isCandidateFemale) || (isVoterGirl && isCandidateFemale);

    const audioFile = sameGender ? './assets/gay.mpeg' : './assets/violin.mpeg';
    const audio = new Audio(audioFile);
    audio.play().catch(() => {});
    navigate('celebrate');
  };

  const handleDiscourage = (id: string, doFlip: () => void) => {
    const cand = (CONFIG.candidates as any)[id];
    setDiscourageMsg(cand.discourageMsg);
    setPendingCandidate(id);
    setFlipCallback(() => doFlip);
    setShowDiscourageModal(true);
  };

  const handleDiscourageAnyway = () => {
    setShowDiscourageModal(false);
    if (flipCallback) {
      flipCallback();
    }
    setPendingCandidate(null);
    setFlipCallback(null);
  };

  const genderStyles = {
    boy: 'hover:border-[#0071e3] hover:bg-[#eaf3fe]',
    girl: 'hover:border-[#ff2d78] hover:bg-[#ffeaf3]',
    other: 'hover:border-[#8e5bff] hover:bg-[#f1eaff]',
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-ink font-['Inter',sans-serif] antialiased">
      {currentScreen === 'celebrate' && <Confetti />}

      <TopBar
        currentScreen={currentScreen}
        onBack={handleBack}
      />

      <main className="flex flex-col flex-1 relative">
        <AnimatePresence mode="wait">
          {currentScreen === 'landing' && <LandingScreen key="landing" onStart={() => setShowGenderModal(true)} />}
          {currentScreen === 'hub' && (
            <HubScreen
              key="hub"
              theme={theme}
              onSelectSociety={(soc: Society) => { setSelectedSociety(soc); navigate('positions'); }}
              onLocked={handleLockedAttempt}
            />
          )}
          {currentScreen === 'positions' && (
            <PositionsScreen
              key="positions"
              society={selectedSociety}
              onSelectPosition={(pos: any) => { setSelectedPosition(pos); navigate('candidates'); }}
              onLocked={handleLockedAttempt}
            />
          )}
          {currentScreen === 'candidates' && (
            <CandidatesScreen
              key="candidates"
              society={selectedSociety}
              position={selectedPosition}
              onVote={handleVoteSuccess}
              onVoteOther={handleVoteOther}
              onDiscourage={handleDiscourage}
            />
          )}
          {currentScreen === 'celebrate' && <CelebrateScreen key="celebrate" subtext={celebrateSubtext} onDone={() => navigate('generating' as any, true)} onVoteMore={() => navigate('hub', true)} />}
          {currentScreen === 'processing' && <ProcessingScreen key="processing" />}
          {currentScreen === 'wasted' && <WastedScreen key="wasted" line1={wastedContent.title} line2={wastedContent.sub} onDone={() => navigate('generating' as any, true)} onVoteMore={() => navigate('hub', true)} />}
          {currentScreen === 'easter' && <EasterEggScreen key="easter" onContinue={() => navigate('hub', true)} />}
          {currentScreen === ('generating' as any) && <GeneratingScreen key="generating" onComplete={() => navigate('election_card' as any, true)} />}
          {currentScreen === ('election_card' as any) && <ElectionCardScreen key="election_card" votes={Object.values(votes)} theme={theme} />}
        </AnimatePresence>
      </main>

      {/* Signature Footer */}
      <footer className="w-full mt-auto py-6 px-6 flex justify-end z-40">
        <span 
          className="text-ink-faint text-[12.5px] italic font-medium cursor-pointer active:opacity-60 transition-opacity" 
          onClick={() => setShowDevModal(true)}
        >
          By nbl.
        </span>
      </footer>

      <Modal isOpen={showGenderModal} onClose={() => { setShowGenderModal(false); setShowExtendedGenders(false); }}>
        {!showExtendedGenders ? (
          <>
            <h3 className="text-[20px] font-bold mb-2">Before we begin...</h3>
            <p className="text-[15px] text-ink-soft leading-[1.5] mb-1">How do you identify?</p>
            <div className="flex flex-col gap-2.5 mt-[22px]">
              {(['boy', 'girl', 'other'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => handleThemeSelect(g)}
                  className={`flex items-center justify-between p-[16px_18px] rounded-[16px] border border-line bg-background cursor-pointer text-[16px] font-semibold text-ink transition-all active:scale-[0.98] ${genderStyles[g]} capitalize group`}
                >
                  {g} <span className="text-ink-faint text-[14px] group-hover:text-accent">›</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <button onClick={() => setShowExtendedGenders(false)} className="text-ink-faint hover:text-ink transition-colors flex items-center justify-center p-1 -ml-1">
                <ArrowLeft size={20} strokeWidth={2.5} />
              </button>
              <h3 className="text-[20px] font-bold">Please specify</h3>
            </div>
            <div className="flex flex-col gap-2 mt-[16px] max-h-[50vh] overflow-y-auto pr-1 -mr-2 pb-2">
              {EXTENDED_GENDERS.map(g => (
                <button
                  key={g}
                  onClick={() => handleThemeSelect(g)}
                  className="flex items-center justify-between p-[14px_16px] rounded-[14px] border border-line bg-background cursor-pointer text-[13.5px] leading-[1.4] font-medium text-ink transition-all active:scale-[0.98] hover:border-[#8e5bff] hover:bg-[#f1eaff] text-left group"
                >
                  {g}
                </button>
              ))}
            </div>
          </>
        )}
      </Modal>

      <Modal isOpen={showLockedModal} onClose={() => setShowLockedModal(false)}>
        <h3 className="text-[20px] font-bold mb-2">{lockedModalContent.title}</h3>
        <p className="text-[15px] text-ink-soft leading-[1.5] mb-1">Access fee:</p>
        <div className="text-[28px] font-extrabold my-3.5">{lockedModalContent.fee}</div>
        <p className="text-[13px] text-ink-faint italic mb-[22px]">{lockedModalContent.note}</p>
        <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
          <Button variant="ghost" onClick={() => setShowLockedModal(false)}>Cancel</Button>
          <Button variant="accent" onClick={handlePayClick}>Pay the Dev</Button>
        </div>
      </Modal>

      <Modal isOpen={showPaidModal} onClose={() => setShowPaidModal(false)}>
        <h3 className="text-[20px] font-bold mb-2">{paidModalContent.title}</h3>
        <p className="text-[15px] text-ink-soft leading-[1.5] mb-5">{paidModalContent.sub}</p>
        <div className="mt-5">
          <Button variant="accent" onClick={() => setShowPaidModal(false)}>Understandable</Button>
        </div>
      </Modal>

      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <h3 className="text-[20px] font-bold mb-2">Are you sure?</h3>
        <p className="text-[15px] text-ink-soft leading-[1.5] mb-1">
          Once submitted, this vote cannot be undone. Or taken back. Or reasoned with.
        </p>
        <div className="flex flex-col gap-2.5 mt-5">
          <Button onClick={handleConfirmWasted}>Yes, I'm Sure</Button>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Go Back</Button>
        </div>
      </Modal>

      <Modal isOpen={showDiscourageModal} onClose={() => setShowDiscourageModal(false)}>
        <h3 className="text-[20px] font-bold mb-2">Is this even necessary?</h3>
        <p className="text-[15px] text-ink-soft leading-[1.5] mb-1">{discourageMsg}</p>
        <div className="flex flex-col gap-2.5 mt-5">
          <Button variant="secondary" onClick={() => setShowDiscourageModal(false)}>Fair Enough</Button>
          <Button variant="ghost" onClick={handleDiscourageAnyway}>See Their Info Anyway</Button>
        </div>
      </Modal>

      <Modal isOpen={showDevModal} onClose={() => setShowDevModal(false)}>
        <h3 className="text-[20px] font-bold mb-2">by nbl.</h3>
        <p className="text-[15px] text-ink-soft leading-[1.5] mb-1">
          This whole practice ballot was built by one guy with too much free time.
        </p>
        <div className="flex flex-col gap-2.5 mt-5">
          <a href="https://github.com/nabil-anis" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 p-[14px_16px] rounded-[16px] border border-line bg-background text-left transition-transform active:scale-[0.98]">
            <div className="w-9 h-9 rounded-[10px] bg-surface border border-line flex items-center justify-center shrink-0">
              <Github size={18} />
            </div>
            <div>
              <div className="text-[14.5px] font-bold">GitHub</div>
              <div className="text-[12px] text-ink-faint">github.com/nabil-anis</div>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/nabil-anis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 p-[14px_16px] rounded-[16px] border border-line bg-background text-left transition-transform active:scale-[0.98]">
            <div className="w-9 h-9 rounded-[10px] bg-surface border border-line flex items-center justify-center shrink-0">
              <Linkedin size={18} />
            </div>
            <div>
              <div className="text-[14.5px] font-bold">LinkedIn</div>
              <div className="text-[12px] text-ink-faint">linkedin.com/in/nabil-anis</div>
            </div>
          </a>
          <a href="https://portfolio-by-nbl.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 p-[14px_16px] rounded-[16px] border border-line bg-background text-left transition-transform active:scale-[0.98]">
            <div className="w-9 h-9 rounded-[10px] bg-surface border border-line flex items-center justify-center shrink-0">
              <Globe size={18} />
            </div>
            <div>
              <div className="text-[14.5px] font-bold">Portfolio</div>
              <div className="text-[12px] text-ink-faint">portfolio-by-nbl.vercel.app</div>
            </div>
          </a>
        </div>
      </Modal>

    </div>
  );
}
