import React, { useState } from 'react';
import {
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Layers,
  PieChart,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const { currentView, setCurrentView } = useDashboard();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Acme Cloud Inc.');

  const workspaces = ['Acme Cloud Inc.', 'Acme Staging Labs', 'Hyperion APAC'];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, badge: null },
    { id: 'revenue', label: 'Revenue Analytics', icon: TrendingUp, badge: 'Live' },
    { id: 'customers', label: 'Customers', icon: Users, badge: '4.8k' },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, badge: null },
    { id: 'retention', label: 'Cohorts & Funnel', icon: PieChart, badge: null },
    { id: 'integrations', label: 'Integrations', icon: Layers, badge: '12 active' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B0F19]/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Top Header & Workspace Switcher */}
        <div className="p-4 border-b border-slate-200/70 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white dark:border-[#0B0F19] rounded-full" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
                    PulseMetrics
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                    Revenue Intelligence
                  </span>
                </div>
              )}
            </div>

            {/* Collapse toggle (Desktop only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              type="button"
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Workspace Switcher */}
          {!isCollapsed && (
            <div className="relative mt-4">
              <button
                onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100/80 dark:bg-slate-900 hover:bg-slate-200/70 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 transition"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="truncate">{selectedWorkspace}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              </button>

              {workspaceMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  {workspaces.map((ws) => (
                    <button
                      key={ws}
                      onClick={() => {
                        setSelectedWorkspace(ws);
                        setWorkspaceMenuOpen(false);
                      }}
                      type="button"
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg transition ${
                        selectedWorkspace === ws
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {ws}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      onClick={() => setWorkspaceMenuOpen(false)}
                    >
                      + Create new workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className={`px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ${isCollapsed ? 'hidden' : 'block'}`}>
            Analytics Suite
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                type="button"
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 dark:shadow-indigo-600/35 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Live'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Card / Plan Info */}
        <div className="p-3 border-t border-slate-200/70 dark:border-slate-800/80">
          {!isCollapsed ? (
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-slate-100 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 border border-indigo-200/50 dark:border-indigo-800/40">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <Zap className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
                  Scale Tier
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  88% used
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2.5">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full w-[88%]" />
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('subscriptions')}
                className="w-full py-1.5 text-center text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm shadow-indigo-600/30"
              >
                Upgrade to Enterprise
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setCurrentView('subscriptions')}
                title="Scale Tier • 88% Used"
                className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:scale-105 transition"
              >
                <Zap className="w-5 h-5 fill-indigo-500 text-indigo-500" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
