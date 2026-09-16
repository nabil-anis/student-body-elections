import React, { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ScreenId } from '../types';
import { AnimatePresence, motion } from 'motion/react';

interface TopBarProps {
  currentScreen: ScreenId;
  onBack: () => void;
}

export function TopBar({ currentScreen, onBack }: TopBarProps) {
  const showTopBar = ['hub', 'positions', 'candidates'].includes(currentScreen);

  if (!showTopBar) return null;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-5 pt-[18px] max-w-[480px] mx-auto w-full pb-2 bg-background/80 backdrop-blur-md">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-accent font-semibold text-[15px] px-1 py-2 transition-opacity active:opacity-70"
      >
        <ChevronLeft size={16} strokeWidth={3} />
        Back
      </button>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-surface w-full max-w-[420px] rounded-t-[26px] sm:rounded-[26px] px-[26px] pt-[30px] pb-[calc(28px+env(safe-area-inset-bottom,0px))] shadow-2xl text-center"
          >
            <div className="modal-grabber" />
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Button({ variant = 'primary', onClick, children, className = '' }: any) {
  const baseStyles = "w-full rounded-full font-semibold cursor-pointer transition-all active:scale-[0.97]";
  const variants = {
    primary: "bg-ink text-white py-[17px] px-5 text-[17px]",
    accent: "bg-accent text-white py-[17px] px-5 text-[17px]",
    secondary: "bg-transparent text-ink py-[14px] px-5 text-[16px] hover:bg-black/5 active:opacity-60",
    ghost: "bg-transparent text-ink-soft border border-line py-[15px] px-5 text-[15px] hover:bg-black/5 active:opacity-60"
  };
  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
}

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0071e3";
    const colors = [accent, "#ffd60a", "#34c759", "#ff9f0a", "#ffffff"];

    const pieces = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 80,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 9 - 4,
      size: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 14,
      life: 0
    }));

    let animationFrameId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.vy += 0.28;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.life / 140);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (alive && frame < 160) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[200]" />;
}
