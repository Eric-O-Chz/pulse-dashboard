import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  PieChart,
  Search,
  Settings,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StatusBadge } from '../common/Badge';

export const CommandPalette: React.FC = () => {
  const {
    searchCommandOpen,
    setSearchCommandOpen,
    customers,
    setSelectedCustomer,
    setCurrentView,
    kpis,
    setActiveKpiId,
  } = useDashboard();

  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchCommandOpen(!searchCommandOpen);
      }
      if (e.key === 'Escape') {
        setSearchCommandOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchCommandOpen, setSearchCommandOpen]);

  if (!searchCommandOpen) return null;

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  const navigationMatches = [
    { id: 'overview', title: 'Dashboard Overview', icon: BarChart3, desc: 'Full KPI overview & trends' },
    { id: 'revenue', title: 'Revenue Analytics', icon: TrendingUp, desc: 'MRR breakdown, net changes' },
    { id: 'customers', title: 'Customers Directory', icon: Users, desc: 'Search, filter, churn risk' },
    { id: 'subscriptions', title: 'Subscriptions & Tiers', icon: CreditCard, desc: 'Plan distribution & pricing' },
    { id: 'retention', title: 'Cohort Funnel', icon: PieChart, desc: 'Conversion funnel & activation' },
    { id: 'settings', title: 'Settings', icon: Settings, desc: 'Team & workspace settings' },
  ].filter((n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.desc.toLowerCase().includes(query.toLowerCase()));

  const filteredMetrics = kpis.filter(
    (k) =>
      k.title.toLowerCase().includes(query.toLowerCase()) ||
      k.value.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts, metrics, or jump to views..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setSearchCommandOpen(false)}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Views */}
          {navigationMatches.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Navigation
              </div>
              <div className="space-y-1 mt-1">
                {navigationMatches.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setSearchCommandOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Metric Spotlight */}
          {filteredMetrics.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                KPIs & Metrics
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {filteredMetrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => {
                      setActiveKpiId(metric.id);
                      setSearchCommandOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition"
                  >
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {metric.title}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {metric.value}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        metric.isPositive ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer matches */}
          {filteredCustomers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Customers ({filteredCustomers.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredCustomers.slice(0, 5).map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setSearchCommandOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {customer.name}
                          </span>
                          <span className="text-xs text-slate-400">• {customer.company}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {customer.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        ${customer.mrr.toLocaleString()}/mo
                      </span>
                      <StatusBadge status={customer.status} size="sm" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {navigationMatches.length === 0 &&
            filteredMetrics.length === 0 &&
            filteredCustomers.length === 0 && (
              <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                No matching accounts, metrics, or views found for "{query}".
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                esc
              </kbd>{' '}
              to close
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ↵
              </kbd>{' '}
              to select
            </span>
          </div>
          <span>PulseMetrics Command Bar</span>
        </div>
      </div>
    </div>
  );
};
