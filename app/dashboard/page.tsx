'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';
import {
  Shield, Bot, AlertTriangle, Clock, TrendingUp, TrendingDown,
  Play, Activity, X,
} from 'lucide-react';

function useCounter(target: number, duration: number = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

const sparkData = (base: number, len = 12) =>
  Array.from({ length: len }, (_, i) => ({ v: base + Math.sin(i * 0.8) * base * 0.15 + Math.random() * base * 0.1 }));

const activityFeed = [
  { time: '10:24:31', msg: 'Threat detected from Finance Agent', type: 'threat' },
  { time: '10:24:26', msg: 'Policy violation blocked', type: 'block' },
  { time: '10:24:21', msg: 'New agent onboarded: HR Assistant', type: 'info' },
  { time: '10:24:18', msg: 'Audit completed: 23 checks passed', type: 'success' },
  { time: '10:24:10', msg: 'Data leak attempt prevented', type: 'block' },
  { time: '10:23:55', msg: 'Tool abuse detected: Finance Agent', type: 'threat' },
  { time: '10:23:42', msg: 'Trust score updated: Marketing Agent', type: 'info' },
  { time: '10:23:30', msg: 'Policy updated: Data Access Policy', type: 'info' },
];

const bottomStats = [
  { label: 'Threat Detection Rate', value: '98.7%', trend: '+2.1%', positive: true, data: sparkData(95, 10) },
  { label: 'Mean Time to Respond', value: '2.3s', trend: '-0.4s', positive: true, data: sparkData(3, 10) },
  { label: 'Policy Enforcement', value: '100%', trend: '+0%', positive: true, data: sparkData(99, 10) },
  { label: 'Trust Score (Avg)', value: '87.6', trend: '+1.2', positive: true, data: sparkData(85, 10) },
];

export default function OverviewPage() {
  const router = useRouter();
  const logRef = useRef<HTMLDivElement>(null);

  const agentCount = useCounter(124);
  const quarantineCount = useCounter(8);
  const threatsCount = useCounter(532);
  const approvalsCount = useCounter(23);

  const metrics = [
    {
      label: 'Agents Monitored', value: agentCount, suffix: '', trend: '+12.4%',
      positive: true, icon: Bot, color: 'text-cyan-400', data: sparkData(110, 10),
    },
    {
      label: 'Quarantined Agents', value: quarantineCount, suffix: '', trend: '-2.1%',
      positive: false, icon: Shield, color: 'text-orange-400', data: sparkData(8, 10),
    },
    {
      label: 'Threats Logged', value: threatsCount, suffix: '', trend: '+18.7%',
      positive: false, icon: AlertTriangle, color: 'text-red-400', data: sparkData(480, 10),
    },
    {
      label: 'Pending Approvals', value: approvalsCount, suffix: '', trend: '+5.3%',
      positive: false, icon: Clock, color: 'text-yellow-400', data: sparkData(20, 10),
    },
  ];

  const runAudit = () => {
    router.push('/lab');
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, []);

  const typeColor: Record<string, string> = {
    threat: 'text-red-400',
    block: 'text-orange-400',
    success: 'text-green-400',
    info: 'text-cyan-400',
  };
  const typeDot: Record<string, string> = {
    threat: 'bg-red-400',
    block: 'bg-orange-400',
    success: 'bg-green-400',
    info: 'bg-cyan-400',
  };

  return (
    <div className="p-6 space-y-6 min-h-full">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time Security Command Center</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
          System Status: Operational
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative glass cyber-border rounded-xl p-4 overflow-hidden group hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                <div className="text-3xl font-black text-white">{m.value}</div>
              </div>
              <div className={`p-2 rounded-lg bg-slate-800/60 ${m.color}`}>
                <m.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs flex items-center gap-1 ${m.positive ? 'text-green-400' : 'text-red-400'}`}>
                {m.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {m.trend}
              </span>
              <div className="h-8 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={m.data}>
                    <defs>
                      <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={i === 0 ? '#00d4ff' : i === 2 ? '#ff2d55' : '#ffcc00'} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={i === 0 ? '#00d4ff' : i === 2 ? '#ff2d55' : '#ffcc00'} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={i === 0 ? '#00d4ff' : i === 2 ? '#ff2d55' : i === 1 ? '#fb923c' : '#facc15'} strokeWidth={1.5} fill={`url(#g${i})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Middle row: Activity Feed + Audit Simulator */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Security Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass cyber-border rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Security Activity Feed</h3>
            </div>
            <button className="text-slate-600 hover:text-slate-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={logRef} className="divide-y divide-slate-800/40 max-h-64 overflow-y-auto">
            {activityFeed.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-800/20 transition-all"
              >
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${typeDot[item.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs ${typeColor[item.type]}`}>{item.msg}</p>
                </div>
                <span className="text-[10px] text-slate-600 font-mono shrink-0">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Audit Simulator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass cyber-border rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Security Audit Simulator</h3>
            </div>
          </div>
          <div className="p-6 flex flex-col items-start gap-6">
            <p className="text-sm text-slate-400 leading-relaxed">
              Launch the immersive Security War Room to run live attack simulations, test your defense posture, and receive a detailed AI-generated audit report.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full text-xs">
              {['Prompt Injection Test', 'Jailbreak Simulation', 'Tool Abuse Detection', 'Data Exfiltration Guard'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0" />
                  {s}
                </div>
              ))}
            </div>
            <button
              onClick={runAudit}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-bold tracking-wide hover:bg-cyan-500/30 transition-all glow-cyan"
            >
              <Play className="w-4 h-4" />
              Run Audit → Open Security Lab
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {bottomStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
            className="glass cyber-border rounded-xl p-4"
          >
            <p className="text-xs text-slate-500 mb-2">{s.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {s.trend}
                </span>
              </div>
              <div className="h-12 w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={s.data}>
                    <Line type="monotone" dataKey="v" stroke="#00d4ff" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
