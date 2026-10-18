import React from 'react';
import {
  Building,
  Calendar,
  Globe,
  Mail,
  X,
  Zap,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { PlanBadge, StatusBadge } from '../common/Badge';

export const CustomerDetailModal: React.FC = () => {
  const { selectedCustomer, setSelectedCustomer, setCustomers } = useDashboard();

  if (!selectedCustomer) return null;

  const handleUpgradePlan = () => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id
          ? {
              ...c,
              plan: 'Enterprise',
              mrr: Math.round(c.mrr * 1.5),
              healthScore: 98,
              seats: c.seats + 50,
            }
          : c
      )
    );
    setSelectedCustomer({
      ...selectedCustomer,
      plan: 'Enterprise',
      mrr: Math.round(selectedCustomer.mrr * 1.5),
      healthScore: 98,
      seats: selectedCustomer.seats + 50,
    });
  };

  const invoices = [
    { id: 'INV-2026-091', date: 'Oct 01, 2026', amount: selectedCustomer.mrr, status: 'Paid' },
    { id: 'INV-2026-082', date: 'Sep 01, 2026', amount: selectedCustomer.mrr, status: 'Paid' },
    { id: 'INV-2026-073', date: 'Aug 01, 2026', amount: selectedCustomer.mrr, status: 'Paid' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Cover Gradient */}
        <div className="relative h-24 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-4 flex items-start justify-between">
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setSelectedCustomer(null)}
              type="button"
              className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 pb-6 pt-0 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-6">
            <div className="flex items-end gap-3.5">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-xl"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedCustomer.name}
                  </h3>
                  <StatusBadge status={selectedCustomer.status} size="sm" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                  {selectedCustomer.company} • {selectedCustomer.country}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleUpgradePlan}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 transition"
              >
                <Zap className="w-3.5 h-3.5" />
                Upgrade Tier
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Monthly MRR</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                ${selectedCustomer.mrr.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Plan Tier</span>
              <div className="mt-0.5">
                <PlanBadge plan={selectedCustomer.plan} />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Health Score</span>
              <span
                className={`text-base font-extrabold font-mono ${
                  selectedCustomer.healthScore >= 80
                    ? 'text-emerald-500'
                    : selectedCustomer.healthScore >= 50
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }`}
              >
                {selectedCustomer.healthScore}/100
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Seats Allocated</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                {selectedCustomer.seats} seats
              </span>
            </div>
          </div>

          {/* Usage & Health Detail */}
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Plan Quota & Storage Consumption
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  {selectedCustomer.usagePercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${selectedCustomer.usagePercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Renewal scheduled on <strong>{selectedCustomer.renewalDate}</strong> ({selectedCustomer.billingCycle} billing)
              </p>
            </div>
          </div>

          {/* Contact and Account Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block border-b border-slate-200 dark:border-slate-700 pb-1.5">
                Contact Details
              </span>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedCustomer.country} ({selectedCustomer.countryCode})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Customer since {selectedCustomer.joinedDate}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block border-b border-slate-200 dark:border-slate-700 pb-1.5">
                Recent Invoices
              </span>
              <div className="space-y-1.5">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-500">{inv.id}</span>
                    <span className="text-slate-400">{inv.date}</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      ${inv.amount}
                    </span>
                    <span className="text-emerald-500 font-semibold">{inv.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Account ID: {selectedCustomer.id}</span>
          <button
            onClick={() => setSelectedCustomer(null)}
            type="button"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
