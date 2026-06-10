'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Shield,
  LayoutDashboard,
  Bot,
  AlertTriangle,
  FileCode,
  CheckSquare,
  Dna,
  Plug,
  ClipboardList,
  Wifi,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard', exact: true },
  { label: 'Agent Registry', icon: Bot, href: '/dashboard/agent-registry' },
  { label: 'Threat Center', icon: AlertTriangle, href: '/dashboard/threat-center' },
  { label: 'Policy Engine', icon: FileCode, href: '/dashboard/policy-engine' },
  { label: 'Approvals', icon: CheckSquare, href: '/dashboard/approvals', badge: '5' },
  { label: 'Behavioral DNA', icon: Dna, href: '/dashboard/behavioral-dna' },
  { label: 'Integrations', icon: Plug, href: '/dashboard/integrations' },
  { label: 'Audit Logs', icon: ClipboardList, href: '/dashboard/audit-logs' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-[#070e1f] border-r border-slate-800/60 shrink-0 overflow-hidden"
    >
      {/* Top: Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 glow-cyan-sm">
          <Shield className="w-4 h-4 text-cyan-400" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-bold text-white whitespace-nowrap">Agentra</div>
            <div className="text-[9px] text-cyan-500/70 tracking-widest whitespace-nowrap">SECURE INTELLIGENCE</div>
          </motion.div>
        )}
      </div>

      {/* Status indicator */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-slate-800/40">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/5 border border-green-500/20">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot shrink-0" />
            <span className="text-[10px] text-green-400 tracking-widest font-medium">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cyan-400 rounded-r"
                    style={{ boxShadow: '0 0 8px rgba(0,212,255,0.6)' }}
                  />
                )}

                <div className={`relative shrink-0 ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                  <item.icon className="w-4 h-4" />
                  {active && (
                    <span className="absolute -inset-1 rounded-md bg-cyan-500/10" />
                  )}
                </div>

                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between flex-1 min-w-0"
                  >
                    <span className="text-sm truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Active pulse dot */}
                {active && !collapsed && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-dot shrink-0" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-slate-800/60 space-y-0.5">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 cursor-pointer transition-all`}>
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </div>
        <Link href="/">
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 cursor-pointer transition-all`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </div>
        </Link>
      </div>

      {/* System version */}
      {!collapsed && (
        <div className="px-4 py-2 border-t border-slate-800/40">
          <div className="flex items-center gap-2 text-[10px] text-slate-700">
            <Wifi className="w-3 h-3" />
            <span>v1.0 · SECURE</span>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
