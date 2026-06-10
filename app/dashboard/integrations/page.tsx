'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plug, CheckCircle, XCircle, RefreshCw, Plus, Settings } from 'lucide-react';

const integrations = [
  { id: 'int-001', name: 'SIEM System', category: 'Security', status: 'connected', icon: '🛡️', desc: 'Real-time security event ingestion', events: '12.4K/hr', lastSync: '2s ago' },
  { id: 'int-002', name: 'Cloud Provider', category: 'Infrastructure', status: 'connected', icon: '☁️', desc: 'AWS cloud security monitoring', events: '8.1K/hr', lastSync: '5s ago' },
  { id: 'int-003', name: 'Identity Provider', category: 'Auth', status: 'connected', icon: '🔐', desc: 'Okta SSO and identity management', events: '342/hr', lastSync: '12s ago' },
  { id: 'int-004', name: 'Slack', category: 'Communication', status: 'connected', icon: '💬', desc: 'Alert notifications and approvals', events: '89/hr', lastSync: '30s ago' },
  { id: 'int-005', name: 'Email Gateway', category: 'Communication', status: 'connected', icon: '📧', desc: 'Security report distribution', events: '23/hr', lastSync: '1m ago' },
  { id: 'int-006', name: 'API Gateway', category: 'Infrastructure', status: 'connected', icon: '🔌', desc: 'External API traffic monitoring', events: '31.2K/hr', lastSync: '1s ago' },
  { id: 'int-007', name: 'SOAR Platform', category: 'Security', status: 'disconnected', icon: '⚡', desc: 'Automated response orchestration', events: '—', lastSync: 'Never' },
  { id: 'int-008', name: 'Threat Intel', category: 'Security', status: 'error', icon: '🎯', desc: 'External threat intelligence feed', events: '—', lastSync: '2h ago' },
];

const categories = ['All', 'Security', 'Infrastructure', 'Auth', 'Communication'];

export default function IntegrationsPage() {
  const [filter, setFilter] = useState('All');
  const [syncing, setSyncing] = useState<string | null>(null);

  const filtered = integrations.filter((i) => filter === 'All' || i.category === filter);

  const sync = async (id: string) => {
    setSyncing(id);
    await new Promise((r) => setTimeout(r, 1200));
    setSyncing(null);
  };

  const connected = integrations.filter((i) => i.status === 'connected').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Integrations</h1>
          <p className="text-xs text-slate-500 mt-0.5">Connect and manage security tool integrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:bg-cyan-500/30 transition-all glow-cyan-sm">
          <Plus className="w-4 h-4" />
          Add Integration
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Connected', value: connected, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
          { label: 'Disconnected', value: integrations.filter((i) => i.status === 'disconnected').length, color: 'text-slate-400', bg: 'bg-slate-800/50', border: 'border-slate-700' },
          { label: 'Error', value: integrations.filter((i) => i.status === 'error').length, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 border ${s.bg} ${s.border}`}>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filter === c ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}>{c}</button>
        ))}
      </div>

      {/* Integration cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((int, i) => (
          <motion.div
            key={int.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass cyber-border rounded-xl p-5 hover:border-slate-700 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                  {int.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{int.name}</div>
                  <div className="text-[10px] text-slate-500">{int.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {int.status === 'connected' && <CheckCircle className="w-4 h-4 text-green-400" />}
                {int.status === 'disconnected' && <XCircle className="w-4 h-4 text-slate-500" />}
                {int.status === 'error' && <XCircle className="w-4 h-4 text-red-400" />}
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-4">{int.desc}</p>

            <div className="flex items-center justify-between text-[10px]">
              <div>
                <span className="text-slate-600">Events: </span>
                <span className="text-slate-300 font-mono">{int.events}</span>
              </div>
              <div>
                <span className="text-slate-600">Synced: </span>
                <span className="text-slate-400">{int.lastSync}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => sync(int.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] hover:bg-cyan-500/20 transition-all"
              >
                <RefreshCw className={`w-3 h-3 ${syncing === int.id ? 'animate-spin' : ''}`} />
                Sync
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-700 text-slate-500 text-[10px] hover:border-slate-600 transition-all">
                <Settings className="w-3 h-3" />
                Configure
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
