'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import NetworkBackground from '@/components/cyber/NetworkBackground';
import { Shield, Activity, Lock, Zap, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [launching, setLaunching] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState(false);

  const bootSequence = [
    'Initializing Agentra Core...',
    'Loading threat detection modules...',
    'Establishing secure channels...',
    'Calibrating behavioral DNA engine...',
    'Trust verification protocols active...',
    'System ready. Redirecting...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText((g) => !g);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLaunch = async () => {
    setLaunching(true);
    setScanProgress(0);

    for (let i = 0; i < bootSequence.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setBootLines((prev) => [...prev, bootSequence[i]]);
      setScanProgress(((i + 1) / bootSequence.length) * 100);
    }

    await new Promise((r) => setTimeout(r, 300));
    router.push('/auth');
  };

  const stats = [
    { label: 'Agents Protected', value: '2,847', icon: Shield },
    { label: 'Threats Blocked', value: '98.7%', icon: Activity },
    { label: 'Zero-Trust Policies', value: '15,392', icon: Lock },
    { label: 'Response Time', value: '2.3ms', icon: Zap },
  ];

  return (
    <div className="relative min-h-screen bg-[#050a14] overflow-hidden flex flex-col">
      {/* Animated network background */}
      <div className="absolute inset-0">
        <NetworkBackground nodeCount={80} />
        <div className="absolute inset-0 grid-bg-animated" />
        {/* Radial glow center */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 via-transparent to-transparent" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,255,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-8 py-5"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center glow-cyan-sm">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold tracking-widest text-cyan-400 uppercase">Agentra</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
            v2.0 STABLE
          </span>
          <span>CLASSIFIED</span>
        </div>
      </motion.header>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <AnimatePresence>
          {!launching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-xs text-cyan-400 tracking-widest uppercase"
              >
                <Zap className="w-3 h-3" />
                Secure Intelligence for Autonomous Agents
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mb-6"
              >
                <h1 className="text-7xl md:text-8xl font-black tracking-tight leading-none">
                  <span
                    className="text-cyan-400"
                    style={{
                      textShadow: '0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)',
                    }}
                  >
                    Agentra
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 text-lg md:text-xl max-w-2xl mb-4 leading-relaxed"
              >
                Secure Intelligence for Autonomous Agents
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-slate-600 text-sm max-w-xl mb-14"
              >
                Real-time Threat Detection · Behavioral Analysis · Zero Trust Architecture
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLaunch}
                className="group relative px-10 py-4 bg-cyan-500/10 border border-cyan-500/60 text-cyan-300 font-semibold tracking-widest uppercase text-sm rounded-lg hover:bg-cyan-500/20 transition-all duration-300 glow-cyan"
              >
                <span className="flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  Initialize Security System
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1 }}
                    className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl border border-slate-800/80 bg-slate-900/30"
                  >
                    <s.icon className="w-4 h-4 text-cyan-500" />
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 tracking-wider text-center">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boot sequence overlay */}
        <AnimatePresence>
          {launching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center w-full max-w-lg"
            >
              {/* Scan line animation */}
              <div className="relative w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                  style={{ boxShadow: '0 0 10px rgba(0,212,255,0.8)' }}
                />
              </div>

              <div className="w-full font-mono text-sm space-y-2">
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-left"
                  >
                    <span className="text-cyan-400">{'>'}</span>
                    <span className={i === bootLines.length - 1 ? 'text-cyan-300' : 'text-slate-400'}>
                      {line}
                    </span>
                    {i === bootLines.length - 1 && (
                      <span className="text-cyan-400 animate-terminal-cursor">_</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="mt-10 w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 text-center py-5 text-xs text-slate-700"
      >
        Powered by Agentra · Secure Intelligence Platform
      </motion.footer>

      {/* Scanline overlay */}
      {launching && (
        <motion.div
          initial={{ top: '-10%' }}
          animate={{ top: '110%' }}
          transition={{ duration: 0.8, ease: 'linear' }}
          className="absolute left-0 w-full h-1 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent pointer-events-none z-50"
        />
      )}
    </div>
  );
}
