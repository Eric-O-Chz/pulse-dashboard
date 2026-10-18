import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
  Zap,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const {
    notifications,
    unreadNotifsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    simulateLiveEvent,
    setSearchCommandOpen,
    currentView,
  } = useDashboard();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case 'revenue':
        return 'Revenue & MRR Analytics';
      case 'customers':
        return 'Customer Directory & Accounts';
      case 'subscriptions':
        return 'Subscriptions & Billing Plans';
      case 'retention':
        return 'Cohort Retention & Funnel';
      case 'integrations':
        return 'API & Integrations Hub';
      case 'settings':
        return 'Workspace Settings';
      case 'overview':
      default:
        return 'SaaS Performance Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl transition-colors">
      {/* Left side: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          type="button"
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {getBreadcrumbTitle()}
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Real-time telemetry, revenue recognition & subscriber health
          </p>
        </div>
      </div>

      {/* Right side: Search, Actions, Notifs, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search trigger */}
        <button
          onClick={() => setSearchCommandOpen(true)}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search accounts or metrics...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Live Simulation Trigger Button */}
        <button
          onClick={simulateLiveEvent}
          type="button"
          className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-150 active:scale-95"
          title="Simulate incoming customer conversion or high-value deal"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="hidden sm:inline">Simulate Event</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            type="button"
            className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition shadow-sm"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#0B0F19]">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Notifications</span>
                  {unreadNotifsCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold">
                      {unreadNotifsCount} new
                    </span>
                  )}
                </div>
                {unreadNotifsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    type="button"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-2.5 rounded-xl cursor-pointer transition text-left ${
                      n.read
                        ? 'bg-slate-50/70 dark:bg-slate-800/40 opacity-75'
                        : 'bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            n.type === 'sale'
                              ? 'bg-emerald-500'
                              : n.type === 'alert'
                              ? 'bg-amber-500'
                              : n.type === 'upgrade'
                              ? 'bg-indigo-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {n.title}
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0">
                        {n.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 pl-4">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            type="button"
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block mr-1" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 p-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Elena Rostova"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Elena Rostova</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Head of Growth</p>
                  <span className="inline-block px-1.5 py-0.2 text-[9px] font-semibold rounded bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                    Admin
                  </span>
                </div>
              </div>

              <div className="py-2 space-y-1 text-xs">
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Account Settings
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  Billing & Invoices
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-xs font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
