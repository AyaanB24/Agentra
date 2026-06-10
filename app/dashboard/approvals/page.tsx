'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Check, X, Clock, AlertTriangle, Shield } from 'lucide-react';

const initialApprovals = [
  { id: 'apr-001', agent: 'Finance Agent', type: 'Data Access Request', desc: 'Requesting access to Q4 financial reports and audit trails', risk: 'HIGH', timestamp: '10:24:31', status: 'pending' },
  { id: 'apr-002', agent: 'HR Assistant', type: 'Tool Execution Request', desc: 'Attempting to run bulk employee data export operation', risk: 'MEDIUM', timestamp: '10:24:18', status: 'pending' },
  { id: 'apr-003', agent: 'IT Support Bot', type: 'System Access Request', desc: 'Requesting elevated permissions to access server configuration', risk: 'HIGH', timestamp: '10:23:55', status: 'pending' },
  { id: 'apr-004', agent: 'Marketing Agent', type: 'Data Export Request', desc: 'Requesting export of customer contact database', risk: 'MEDIUM', timestamp: '10:23:42', status: 'pending' },
  { id: 'apr-005', agent: 'Data Analyst', type: 'API Integration Request', desc: 'Requesting connection to external analytics platform', risk: 'LOW', timestamp: '10:23:10', status: 'pending' },
];

const riskConfig: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  MEDIUM: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  LOW: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
};

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(initialApprovals);

  const act = (id: string, action: 'approved' | 'rejected') => {
    setApprovals((prev) => prev.map((a) => a.id === id ? { ...a, status: action } : a));
  };

  const pending = approvals.filter((a) => a.status === 'pending');
  const resolved = approvals.filter((a) => a.status !== 'pending');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Approvals</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review and approve agent action requests</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all">Approve AI</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: pending.length, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
          { label: 'Approved', value: approvals.filter((a) => a.status === 'approved').length, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
          { label: 'Rejected', value: approvals.filter((a) => a.status === 'rejected').length, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 border ${s.bg} ${s.border}`}>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-yellow-400" />
          Pending ({pending.length})
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {pending.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30, height: 0 }}
                className="glass cyber-border rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{a.type}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${riskConfig[a.risk].bg} ${riskConfig[a.risk].text} ${riskConfig[a.risk].border}`}>{a.risk}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{a.desc}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{a.agent}</span>
                      <span className="font-mono">{a.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => act(a.id, 'approved')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs hover:bg-green-500/20 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      onClick={() => act(a.id, 'rejected')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {pending.length === 0 && (
            <div className="glass cyber-border rounded-xl p-10 text-center text-slate-600">
              <CheckSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">All approvals resolved</p>
            </div>
          )}
        </div>
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-3">Resolved</h3>
          <div className="space-y-2">
            {resolved.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-4 py-3 glass rounded-xl border border-slate-800/40">
                <div className="flex items-center gap-3">
                  {a.status === 'approved'
                    ? <Check className="w-4 h-4 text-green-400" />
                    : <X className="w-4 h-4 text-red-400" />
                  }
                  <div>
                    <div className="text-sm text-slate-300">{a.type}</div>
                    <div className="text-xs text-slate-500">{a.agent}</div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${a.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {a.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
