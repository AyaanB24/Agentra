'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import NetworkBackground from '@/components/cyber/NetworkBackground';
import { Shield, Eye, EyeOff, Mail, Lock, Zap, User, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (tab === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (error: any) {
      alert(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBypass = () => {
    document.cookie = "demo_bypass=true; path=/; max-age=86400"; // 1 day
    router.push('/dashboard');
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message || 'Google Auth failed');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050a14] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <NetworkBackground nodeCount={50} />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center glow-cyan-sm">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-wide">Agentra</div>
              <div className="text-xs text-slate-500 tracking-widest">SECURE ACCESS GATEWAY</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* LEFT: Login/Signup */}
          <div className="glass cyber-border rounded-2xl p-8">
            <div className="mb-2 text-center">
              <h2 className="text-2xl font-bold text-white">Welcome to <span className="text-cyan-400">Agentra</span></h2>
              <p className="text-slate-500 text-sm mt-1">Secure Intelligence for Autonomous Agents</p>
            </div>

            {/* Tabs */}
            <div className="flex mt-6 mb-6 rounded-lg border border-slate-800 p-1 bg-slate-900/50">
              {(['login', 'signup'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    tab === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {t === 'login' ? 'Login' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Google OAuth */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 text-sm font-medium hover:border-slate-600 hover:bg-slate-800 transition-all mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-slate-600 text-xs">OR</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              {tab === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {tab === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-xs text-cyan-500/70 hover:text-cyan-400 transition-colors">Forgot Password?</button>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-semibold text-sm hover:bg-cyan-500/30 hover:border-cyan-400 transition-all glow-cyan-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full" />
                ) : (
                  <>
                    {tab === 'login' ? 'Login' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600 mt-4">
              {tab === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')} className="text-cyan-500 hover:text-cyan-400">
                {tab === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          {/* RIGHT: Bypass Panel */}
          <div className="glass cyber-border rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6 w-20 h-20 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center glow-cyan"
            >
              <Zap className="w-10 h-10 text-cyan-400" />
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-2">Bypass &amp; Launch<br /><span className="text-cyan-400">Offline Demo Mode</span></h3>
            <p className="text-slate-500 text-sm mb-8 max-w-xs leading-relaxed">
              Skip authentication and explore the platform in demo mode. Full feature access with simulated data.
            </p>

            <button
              onClick={handleBypass}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50 text-cyan-300 font-bold tracking-wide text-sm hover:from-cyan-600/40 hover:to-blue-600/40 transition-all glow-cyan flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Launch Demo Mode
            </button>

            <div className="mt-8 space-y-2 text-left w-full">
              {[
                { label: 'Authentication', value: 'Bypassed' },
                { label: 'Data Mode', value: 'Simulated' },
                { label: 'Access Level', value: 'Full Admin' },
                { label: 'Threat Engine', value: 'Active' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-xs py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-cyan-400 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
