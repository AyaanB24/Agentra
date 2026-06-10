'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Download, Search, Filter, Shield, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const initialLogs = [
  { id: 'log-001', time: '10:24:31', type: 'threat', category: 'Security Events', agent: 'Finance Agent', message: 'Threat detected from Finance Agent — prompt injection attempt blocked' },
  { id: 'log-002', time: '10:24:26', type: 'block', category: 'Policy Events', agent: 'Finance Agent', message: 'Policy violation blocked — unauthorized data access attempt' },
  { id: 'log-003', time: '10:24:21', type: 'info', category: 'System Events', agent: 'System', message: 'New agent onboarded: HR Assistant (AGT-HR-02)' },
  { id: 'log-004', time: '10:24:18', type: 'success', category: 'Security Events', agent: 'System', message: 'Audit completed: 23 checks passed, 0 failed' },
  { id: 'log-005', time: '10:24:10', type: 'block', category: 'Security Events', agent: 'Marketing Agent', message: 'Data leak attempt prevented — exfiltration pattern detected' },
  { id: 'log-006', time: '10:24:08', type: 'info', category: 'Policy Events', agent: 'Admin', message: 'User login: admin@example.com via bypass mode' },
  { id: 'log-007', time: '10:24:05', type: 'info', category: 'Policy Events', agent: 'Admin', message: 'Configuration updated: Policy Engine enforcement mode enabled' },
  { id: 'log-008', time: '10:23:58', type: 'threat', category: 'Security Events', agent: 'IT Support Bot', message: 'Tool abuse detected — excessive API calls beyond rate limit' },
  { id: 'log-009', time: '10:23:45', type: 'success', category: 'System Events', agent: 'System', message: 'Trust score updated: Finance Agent 72 → 69 (drift detected)' },
  { id: 'log-010', time: '10:23:38', type: 'info', category: 'Policy Events', agent: 'Admin', message: 'Policy created: Data Protection Policy v2.1' },
  { id: 'log-011', time: '10:23:22', type: 'block', category: 'Security Events', agent: 'HR Assistant', message: 'Jailbreak attempt blocked — safety bypass detected and rejected' },
  { id: 'log-012', time: '10:23:10', type: 'success', category: 'System Events', agent: 'System', message: 'Integration sync complete: SIEM, Cloud Provider, Slack' },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string; dot: string }> = {
  threat: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', dot: 'bg-red-400' },
  block: { icon: Shield, color: 'text-orange-400', bg: 'bg-orange-500/10', dot: 'bg-orange-400' },
  info: { icon: Info, color: 'text-cyan-400', bg: 'bg-cyan-500/10', dot: 'bg-cyan-400' },
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', dot: 'bg-green-400' },
};

const categoryTabs = ['All Logs', 'Security Events', 'System Events', 'Policy Events'];

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Logs');
  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['threat', 'info', 'success', 'block'] as const;
      const cats = ['Security Events', 'System Events', 'Policy Events'];
      setLogs((prev) => [{
        id: `log-${Date.now()}`,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: types[Math.floor(Math.random() * types.length)],
        category: cats[Math.floor(Math.random() * cats.length)],
        agent: ['Finance Agent', 'System', 'HR Assistant', 'Admin'][Math.floor(Math.random() * 4)],
        message: ['Threat detection scan completed', 'Policy enforcement applied', 'Agent behavior monitored', 'System health check passed'][Math.floor(Math.random() * 4)],
      }, ...prev.slice(0, 49)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered = logs.filter((l) => {
    const matchSearch = search === '' || l.message.toLowerCase().includes(search.toLowerCase()) || l.agent.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All Logs' || l.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Audit Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5">Complete immutable audit trail of all security events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-xs hover:border-slate-600 transition-all">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categoryTabs.map((tab) => (
            <button key={tab} onClick={() => setCategory(tab)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${category === tab ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 flex-wrap text-xs">
        {(['threat', 'block', 'success', 'info'] as const).map((t) => {
          const c = typeConfig[t];
          const count = logs.filter((l) => l.type === t).length;
          return (
            <div key={t} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${c.bg} ${c.color.replace('text-', 'border-').replace('-400', '-500/20')}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
              <span className={c.color}>{count} {t}</span>
            </div>
          );
        })}
      </div>

      {/* Log terminal */}
      <div className="glass cyber-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/60 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Live Audit Stream</h3>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
            Live
          </span>
        </div>
        <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-800/30 terminal-text">
          {filtered.map((log, i) => {
            const c = typeConfig[log.type];
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, backgroundColor: 'rgba(0,212,255,0.05)' }}
                animate={{ opacity: 1, backgroundColor: 'rgba(0,0,0,0)' }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-800/20 transition-all"
              >
                <span className="text-slate-600 shrink-0 mt-0.5">{log.time}</span>
                <span className={`shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full ${c.dot}`} style={{ marginTop: '5px' }} />
                <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${c.bg} ${c.color} border ${c.color.replace('text-', 'border-').replace('-400', '-500/20')}`}>{log.type.toUpperCase()}</span>
                <span className="text-slate-400 flex-1 min-w-0">{log.message}</span>
                <span className="text-slate-600 shrink-0">{log.agent}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
