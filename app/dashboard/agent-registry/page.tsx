'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Plus, Search, MoreHorizontal, CheckCircle, AlertTriangle, Shield, Activity } from 'lucide-react';

const agents = [
  { id: 'AGT-FIN-07', name: 'Finance Agent', status: 'active', trust: 72, risk: 'MEDIUM', actions: 1842, alerts: 3 },
  { id: 'AGT-HR-02', name: 'HR Assistant', status: 'active', trust: 85, risk: 'LOW', actions: 934, alerts: 0 },
  { id: 'AGT-IT-11', name: 'IT Support Bot', status: 'active', trust: 91, risk: 'LOW', actions: 2103, alerts: 1 },
  { id: 'AGT-MKT-02', name: 'Marketing Agent', status: 'quarantined', trust: 68, risk: 'HIGH', actions: 567, alerts: 7 },
  { id: 'AGT-OPS-05', name: 'Ops Automation', status: 'active', trust: 88, risk: 'LOW', actions: 3211, alerts: 0 },
  { id: 'AGT-DATA-03', name: 'Data Analyst', status: 'active', trust: 79, risk: 'MEDIUM', actions: 1456, alerts: 2 },
  { id: 'AGT-CS-09', name: 'Customer Support', status: 'inactive', trust: 82, risk: 'LOW', actions: 789, alerts: 0 },
  { id: 'AGT-SEC-01', name: 'Security Monitor', status: 'active', trust: 96, risk: 'LOW', actions: 5672, alerts: 0 },
];

const statusConfig: Record<string, { color: string; dot: string; label: string }> = {
  active: { color: 'text-green-400', dot: 'bg-green-400', label: 'Active' },
  quarantined: { color: 'text-red-400', dot: 'bg-red-400', label: 'Quarantined' },
  inactive: { color: 'text-slate-500', dot: 'bg-slate-500', label: 'Inactive' },
};

const riskConfig: Record<string, string> = {
  LOW: 'text-green-400 bg-green-500/10 border-green-500/20',
  MEDIUM: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  HIGH: 'text-red-400 bg-red-500/10 border-red-500/20',
};

function TrustBar({ score }: { score: number }) {
  const color = score >= 85 ? '#00ff88' : score >= 70 ? '#ffcc00' : '#ff2d55';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
        />
      </div>
      <span className="text-xs font-mono text-slate-300 w-7">{score}</span>
    </div>
  );
}

export default function AgentRegistryPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = agents.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Agent Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage and monitor all registered AI agents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:bg-cyan-500/30 transition-all glow-cyan-sm">
          <Plus className="w-4 h-4" />
          New Agent
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: agents.length, icon: Bot, color: 'text-cyan-400' },
          { label: 'Active', value: agents.filter((a) => a.status === 'active').length, icon: CheckCircle, color: 'text-green-400' },
          { label: 'Quarantined', value: agents.filter((a) => a.status === 'quarantined').length, icon: AlertTriangle, color: 'text-red-400' },
          { label: 'Avg Trust Score', value: Math.round(agents.reduce((s, a) => s + a.trust, 0) / agents.length), icon: Shield, color: 'text-yellow-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass cyber-border rounded-xl p-4 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg bg-slate-800/60 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <div><div className="text-2xl font-bold text-white">{s.value}</div><div className="text-xs text-slate-500">{s.label}</div></div>
          </motion.div>
        ))}
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'quarantined', 'inactive'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${filter === f ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass cyber-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 border-b border-slate-800/60 text-[10px] text-slate-500 uppercase tracking-widest">
          <div className="col-span-3">Agent</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Trust Score</div>
          <div className="col-span-1">Risk</div>
          <div className="col-span-2">Actions</div>
          <div className="col-span-1"></div>
        </div>
        <div className="divide-y divide-slate-800/30">
          {filtered.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-slate-800/20 transition-all group"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{agent.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{agent.id}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[agent.status].dot}`} />
                <span className={`text-xs ${statusConfig[agent.status].color}`}>{statusConfig[agent.status].label}</span>
              </div>
              <div className="col-span-3 pr-4"><TrustBar score={agent.trust} /></div>
              <div className="col-span-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${riskConfig[agent.risk]}`}>{agent.risk}</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-400 font-mono">{agent.actions.toLocaleString()}</span>
                {agent.alerts > 0 && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">{agent.alerts}</span>
                )}
              </div>
              <div className="col-span-1 text-right">
                <button className="p-1.5 rounded hover:bg-slate-800 text-slate-600 hover:text-slate-300 transition-all opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
