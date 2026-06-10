'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dna, RefreshCw, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const agents = ['Finance Agent', 'HR Assistant', 'IT Support Bot', 'Marketing Agent', 'Data Analyst'];

const dnaProfiles: Record<string, { stability: number; reliability: number; compliance: number; efficiency: number; riskDrift: number }> = {
  'Finance Agent': { stability: 82, reliability: 74, compliance: 89, efficiency: 76, riskDrift: 4.2 },
  'HR Assistant': { stability: 91, reliability: 88, compliance: 95, efficiency: 85, riskDrift: 0.8 },
  'IT Support Bot': { stability: 95, reliability: 92, compliance: 97, efficiency: 90, riskDrift: 0.3 },
  'Marketing Agent': { stability: 62, reliability: 58, compliance: 71, efficiency: 65, riskDrift: 8.7 },
  'Data Analyst': { stability: 78, reliability: 81, compliance: 85, efficiency: 79, riskDrift: 2.1 },
};

const driftHistory = Array.from({ length: 20 }, (_, i) => ({
  t: `${String(10).padStart(2, '0')}:${String(i * 3).padStart(2, '0')}`,
  drift: 2 + Math.sin(i * 0.6) * 2 + Math.random() * 1.5,
  anomaly: i === 12 ? 8.7 : i === 7 ? 6.1 : undefined,
}));

export default function BehavioralDNAPage() {
  const [selectedAgent, setSelectedAgent] = useState('Finance Agent');
  const [refreshing, setRefreshing] = useState(false);
  const profile = dnaProfiles[selectedAgent];

  const radarData = [
    { metric: 'Stability', value: profile.stability },
    { metric: 'Reliability', value: profile.reliability },
    { metric: 'Compliance', value: profile.compliance },
    { metric: 'Efficiency', value: profile.efficiency },
    { metric: 'Security', value: Math.round(100 - profile.riskDrift * 10) },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setRefreshing(false);
  };

  const overallScore = Math.round((profile.stability + profile.reliability + profile.compliance + profile.efficiency) / 4);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Behavioral DNA</h1>
          <p className="text-xs text-slate-500 mt-0.5">Deep behavioral fingerprinting and drift analysis</p>
        </div>
        <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-400 text-xs hover:border-slate-600 transition-all">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Recalculate
        </button>
      </div>

      {/* Agent selector */}
      <div className="flex flex-wrap gap-2">
        {agents.map((a) => (
          <button
            key={a}
            onClick={() => setSelectedAgent(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedAgent === a ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Radar chart */}
        <div className="xl:col-span-1 glass cyber-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Dna className="w-4 h-4 text-cyan-400" />
            Behavior Fingerprint
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,212,255,0.1)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar name="Agent" dataKey="value" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.1} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {[
              { label: 'Stability', value: profile.stability, trend: '+2%', positive: true },
              { label: 'Reliability', value: profile.reliability, trend: '-1%', positive: false },
              { label: 'Compliance', value: profile.compliance, trend: '+3%', positive: true },
              { label: 'Risk Drift', value: `+${profile.riskDrift}%`, trend: null, positive: false, isRisk: true },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{row.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${typeof row.value === 'number' ? row.value : 50}%` }} />
                  </div>
                  <span className={`text-xs font-mono ${row.isRisk ? 'text-red-400' : row.positive ? 'text-green-400' : 'text-slate-300'}`}>{row.value}{typeof row.value === 'number' ? '%' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drift chart + details */}
        <div className="xl:col-span-2 space-y-4">
          <div className="glass cyber-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Behavior Drift Over Time</h3>
              <div className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                Drift Detection
                <span className="font-bold">+{profile.riskDrift}%</span>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={driftHistory}>
                  <defs>
                    <linearGradient id="driftGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fill: '#475569', fontSize: 9 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 9 }} width={25} />
                  <Tooltip contentStyle={{ background: '#0a0f1e', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="drift" stroke="#00d4ff" fill="url(#driftGrad)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="anomaly" stroke="#ff2d55" fill="rgba(255,45,85,0.1)" strokeWidth={2} dot={{ fill: '#ff2d55', r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Behavioral Score', value: `${overallScore}/100`, icon: Dna, color: 'text-cyan-400' },
              { label: 'Drift Alert', value: profile.riskDrift > 5 ? 'HIGH' : profile.riskDrift > 2 ? 'MEDIUM' : 'LOW', icon: AlertTriangle, color: profile.riskDrift > 5 ? 'text-red-400' : profile.riskDrift > 2 ? 'text-yellow-400' : 'text-green-400' },
            ].map((s) => (
              <div key={s.label} className="glass cyber-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs text-slate-500">{s.label}</span>
                </div>
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
