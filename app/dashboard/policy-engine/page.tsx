'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Plus, ToggleLeft, ToggleRight, Shield, AlertTriangle, Pencil } from 'lucide-react';

const policies = [
  { id: 'POL-001', name: 'Data Protection Policy', scope: 'All Agents', enforcement: 'STRICT', status: true, actions: 'Block Action', triggers: 8421, lastUpdated: '2h ago' },
  { id: 'POL-002', name: 'Tool Access Control', scope: 'Finance Agent', enforcement: 'STRICT', status: true, actions: 'Block + Log', triggers: 234, lastUpdated: '1d ago' },
  { id: 'POL-003', name: 'PII Data Restriction', scope: 'All Agents', enforcement: 'HIGH', status: true, actions: 'Redact + Log', triggers: 1892, lastUpdated: '6h ago' },
  { id: 'POL-004', name: 'Rate Limit Policy', scope: 'API Agents', enforcement: 'MEDIUM', status: true, actions: 'Throttle', triggers: 567, lastUpdated: '3d ago' },
  { id: 'POL-005', name: 'Jailbreak Detection', scope: 'All Agents', enforcement: 'STRICT', status: true, actions: 'Block + Alert', triggers: 89, lastUpdated: '1h ago' },
  { id: 'POL-006', name: 'Audit Logging Policy', scope: 'All Agents', enforcement: 'LOW', status: false, actions: 'Log Event', triggers: 24501, lastUpdated: '5d ago' },
];

const enfConfig: Record<string, { bg: string; text: string; border: string }> = {
  STRICT: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  HIGH: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  MEDIUM: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  LOW: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
};

export default function PolicyEnginePage() {
  const [pols, setPols] = useState(policies);
  const [showBuilder, setShowBuilder] = useState(false);

  const toggle = (id: string) => {
    setPols((prev) => prev.map((p) => p.id === id ? { ...p, status: !p.status } : p));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Policy Engine</h1>
          <p className="text-xs text-slate-500 mt-0.5">Define and enforce security policies across all agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Enforcement Mode</span>
            <div className="w-8 h-4 bg-cyan-500/30 rounded-full relative border border-cyan-500/50">
              <div className="w-3 h-3 bg-cyan-400 rounded-full absolute top-0.5 right-0.5" />
            </div>
          </div>
          <button onClick={() => setShowBuilder(!showBuilder)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:bg-cyan-500/30 transition-all glow-cyan-sm">
            <Plus className="w-4 h-4" />
            Add Policy
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Policies', value: pols.filter((p) => p.status).length, color: 'text-cyan-400' },
          { label: 'Total Triggers', value: pols.reduce((s, p) => s + p.triggers, 0).toLocaleString(), color: 'text-yellow-400' },
          { label: 'STRICT Mode', value: pols.filter((p) => p.enforcement === 'STRICT').length, color: 'text-red-400' },
          { label: 'Enforcement Rate', value: '100%', color: 'text-green-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass cyber-border rounded-xl p-4">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Policy Builder (conditional) */}
      {showBuilder && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass cyber-border rounded-xl p-4 border-cyan-500/30">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">Policy Builder</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">IF</label>
              <select className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50">
                <option>User Role = Admin</option>
                <option>Agent Trust &lt; 70</option>
                <option>Tool = export_data</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">THEN</label>
              <select className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50">
                <option>Block Action</option>
                <option>Log Event</option>
                <option>Alert Admin</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Enforcement</label>
              <select className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50">
                <option>STRICT</option>
                <option>HIGH</option>
                <option>MEDIUM</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-medium hover:bg-cyan-500/30 transition-all">+ Add Condition</button>
            <button className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">Save Policy</button>
          </div>
        </motion.div>
      )}

      {/* Policies list */}
      <div className="glass cyber-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 border-b border-slate-800/60 text-[10px] text-slate-500 uppercase tracking-widest">
          <div className="col-span-3">Policy</div>
          <div className="col-span-2">Scope</div>
          <div className="col-span-2">Enforcement</div>
          <div className="col-span-2">Action</div>
          <div className="col-span-1">Triggers</div>
          <div className="col-span-1">Updated</div>
          <div className="col-span-1">Active</div>
        </div>
        <div className="divide-y divide-slate-800/30">
          {pols.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-slate-800/20 transition-all">
              <div className="col-span-3 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-sm text-white">{p.name}</div>
                  <div className="text-[10px] text-slate-600 font-mono">{p.id}</div>
                </div>
              </div>
              <div className="col-span-2 text-xs text-slate-400">{p.scope}</div>
              <div className="col-span-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${enfConfig[p.enforcement].bg} ${enfConfig[p.enforcement].text} ${enfConfig[p.enforcement].border}`}>{p.enforcement}</span>
              </div>
              <div className="col-span-2 text-xs text-slate-400">{p.actions}</div>
              <div className="col-span-1 text-xs font-mono text-slate-300">{p.triggers.toLocaleString()}</div>
              <div className="col-span-1 text-xs text-slate-500">{p.lastUpdated}</div>
              <div className="col-span-1 flex items-center gap-1">
                <button onClick={() => toggle(p.id)}>
                  {p.status
                    ? <ToggleRight className="w-6 h-6 text-cyan-400" />
                    : <ToggleLeft className="w-6 h-6 text-slate-600" />
                  }
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
