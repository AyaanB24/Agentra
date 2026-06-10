'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RefreshCw, Shield, Zap, Eye, X } from 'lucide-react';

const initThreats = [
  { id: 't1', time: '10:24:31', agent: 'Finance Agent', type: 'Prompt Injection Attempt', desc: 'Attempted to override system instructions', severity: 'HIGH', status: 'blocked' },
  { id: 't2', time: '10:24:26', agent: 'Finance Agent', type: 'Data Exfiltration Attempt', desc: 'Unauthorized sensitive financial data extraction detected', severity: 'HIGH', status: 'blocked' },
  { id: 't3', time: '10:24:21', agent: 'Marketing Agent', type: 'Jailbreak Attempt', desc: 'Safety policy bypass attempt detected', severity: 'MEDIUM', status: 'flagged' },
  { id: 't4', time: '10:24:18', agent: 'IT Support Bot', type: 'Tool Abuse Detected', desc: 'Suspicious tool usage pattern identified', severity: 'MEDIUM', status: 'investigating' },
  { id: 't5', time: '10:24:10', agent: 'HR Assistant', type: 'Policy Violation', desc: 'Attempted access to restricted data scope', severity: 'LOW', status: 'resolved' },
  { id: 't6', time: '10:23:55', agent: 'Data Analyst', type: 'Anomalous Behavior', desc: 'Unusual query pattern detected outside normal baseline', severity: 'MEDIUM', status: 'investigating' },
  { id: 't7', time: '10:23:42', agent: 'Finance Agent', type: 'Tool Abuse Detected', desc: 'API call rate exceeded safe threshold', severity: 'LOW', status: 'resolved' },
];

const sevConfig: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  MEDIUM: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  LOW: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
};

const statusConfig: Record<string, { text: string; color: string }> = {
  blocked: { text: 'Blocked', color: 'text-red-400' },
  flagged: { text: 'Flagged', color: 'text-yellow-400' },
  investigating: { text: 'Investigating', color: 'text-orange-400' },
  resolved: { text: 'Resolved', color: 'text-green-400' },
};

export default function ThreatCenterPage() {
  const [threats, setThreats] = useState(initThreats);
  const [selected, setSelected] = useState<typeof initThreats[0] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      const newThreat = {
        id: `t${Date.now()}`,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        agent: ['Finance Agent', 'HR Assistant', 'Data Analyst', 'Marketing Agent'][Math.floor(Math.random() * 4)],
        type: ['Prompt Injection', 'Tool Abuse', 'Policy Violation', 'Anomalous Behavior'][Math.floor(Math.random() * 4)],
        desc: 'New threat event detected by monitoring system',
        severity: ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)],
        status: ['blocked', 'flagged', 'investigating'][Math.floor(Math.random() * 3)],
      };
      setThreats((prev) => [newThreat, ...prev.slice(0, 19)]);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  };

  const counts = {
    high: threats.filter((t) => t.severity === 'HIGH').length,
    medium: threats.filter((t) => t.severity === 'MEDIUM').length,
    low: threats.filter((t) => t.severity === 'LOW').length,
    blocked: threats.filter((t) => t.status === 'blocked').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Threat Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time threat detection and response</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${autoRefresh ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'border-slate-700 text-slate-500'}`}
          >
            AI Sentry: {autoRefresh ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs hover:border-slate-600 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Auto-Refresh
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'High Severity', value: counts.high, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { label: 'Medium Severity', value: counts.medium, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
          { label: 'Low Severity', value: counts.low, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Blocked Today', value: counts.blocked, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={`rounded-xl p-4 border ${c.bg} ${c.border}`}>
            <div className={`text-3xl font-black ${c.color}`}>{c.value}</div>
            <div className="text-xs text-slate-500 mt-1">{c.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Threats list */}
        <div className="xl:col-span-2 glass cyber-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800/60 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">Threat Center</h3>
          </div>
          <div className="divide-y divide-slate-800/30 max-h-[480px] overflow-y-auto">
            <AnimatePresence initial={false}>
              {threats.map((threat) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-4 py-3 hover:bg-slate-800/20 cursor-pointer transition-all"
                  onClick={() => setSelected(threat)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-1.5 rounded ${sevConfig[threat.severity].bg}`}>
                      <AlertTriangle className={`w-3 h-3 ${sevConfig[threat.severity].text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm text-white font-medium truncate">{threat.type}</span>
                        <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded border font-bold ${sevConfig[threat.severity].bg} ${sevConfig[threat.severity].text} ${sevConfig[threat.severity].border}`}>{threat.severity}</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate">{threat.agent} · {threat.desc}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-[10px] font-medium ${statusConfig[threat.status].color}`}>{statusConfig[threat.status].text}</div>
                      <div className="text-[10px] text-slate-600 font-mono">{threat.time}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Threat detail */}
        <div className="glass cyber-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">Threat Detail</h3>
            </div>
            {selected && (
              <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-slate-400"><X className="w-3.5 h-3.5" /></button>
            )}
          </div>
          <div className="p-4">
            {selected ? (
              <div className="space-y-4">
                <div className={`p-3 rounded-lg border ${sevConfig[selected.severity].bg} ${sevConfig[selected.severity].border}`}>
                  <div className={`text-sm font-bold ${sevConfig[selected.severity].text} mb-1`}>{selected.type}</div>
                  <div className="text-xs text-slate-400">{selected.desc}</div>
                </div>
                {[
                  { label: 'Agent', value: selected.agent },
                  { label: 'Time', value: selected.time },
                  { label: 'Severity', value: selected.severity },
                  { label: 'Status', value: statusConfig[selected.status].text },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-slate-800/40">
                    <span className="text-xs text-slate-500">{row.label}</span>
                    <span className="text-xs text-slate-200 font-mono">{row.value}</span>
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all">Block Agent</button>
                  <button className="flex-1 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-all">Investigate</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-600">
                <Shield className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">Select a threat to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
