'use client';

import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/cyber/DashboardSidebar';
import { Bell, Search, User } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = "demo_bypass=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await signOut();
    router.push('/auth');
  };

  return (
    <div className="flex h-screen bg-[#050a14] overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800/60 bg-[#060c1a]/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search agents, threats, logs..."
              className="bg-transparent text-sm text-slate-400 placeholder-slate-600 outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
              <span className="hidden sm:inline">System Operational</span>
            </div>
            <button className="relative p-2 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all text-slate-400">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-dot" />
            </button>
            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <User className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-medium text-slate-300">{user?.user_metadata?.full_name || 'Admin User'}</div>
                <div className="text-[10px] text-slate-600">Security Analyst</div>
              </div>
              <button onClick={handleLogout} className="ml-2 text-xs text-red-400 hover:text-red-300">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
