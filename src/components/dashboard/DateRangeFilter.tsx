import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  RefreshCw,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import type { DateRangePreset } from '../../types/dashboard';

export const DateRangeFilter: React.FC = () => {
  const {
    dateRange,
    setDateRangePreset,
    setCustomDateRange,
    comparePrevious,
    setComparePrevious,
    customers,
  } = useDashboard();

  const [isOpen, setIsOpen] = useState(false);
  const [customStart, setCustomStart] = useState(dateRange.startDate);
  const [customEnd, setCustomEnd] = useState(dateRange.endDate);
  const [isExporting, setIsExporting] = useState(false);

  const presets: { id: DateRangePreset; label: string }[] = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: '12m', label: 'Last 12 Months' },
  ];

  const handleApplyCustom = () => {
    if (customStart && customEnd) {
      setCustomDateRange(customStart, customEnd);
      setIsOpen(false);
    }
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Prevent CSV formula injection (CWE-1236)
      const sanitizeCsvCell = (val: string | number) => {
        const str = String(val ?? '');
        const safe = /^[=+@-|\t\r]/.test(str) ? `'${str}` : str;
        return `"${safe.replace(/"/g, '""')}"`;
      };

      const headers = ['ID', 'Customer', 'Email', 'Company', 'Plan', 'MRR', 'Status', 'HealthScore', 'Country'];
      const rows = customers.map((c) => [
        sanitizeCsvCell(c.id),
        sanitizeCsvCell(c.name),
        sanitizeCsvCell(c.email),
        sanitizeCsvCell(c.company),
        sanitizeCsvCell(c.plan),
        c.mrr,
        sanitizeCsvCell(c.status),
        c.healthScore,
        sanitizeCsvCell(c.country),
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `saas_analytics_report_${dateRange.preset}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
      {/* Left: Quick preset pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1">
          <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
          Range:
        </span>

        {presets.map((preset) => {
          const isSelected = dateRange.preset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setDateRangePreset(preset.id)}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
              }`}
            >
              {preset.label}
            </button>
          );
        })}

        {/* Custom Range Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              dateRange.preset === 'custom'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800'
                : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
            }`}
          >
            <span>{dateRange.preset === 'custom' ? dateRange.label : 'Custom'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                Select Custom Period
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyCustom}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Compare Toggle + Export */}
      <div className="flex items-center gap-2.5 ml-auto">
        <label className="flex items-center gap-2 cursor-pointer select-none px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition">
          <input
            type="checkbox"
            checked={comparePrevious}
            onChange={(e) => setComparePrevious(e.target.checked)}
            className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
          />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
            Compare previous period
          </span>
        </label>

        <button
          onClick={handleExportCsv}
          disabled={isExporting}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition disabled:opacity-50"
          title="Export CSV report"
        >
          {isExporting ? (
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span className="hidden sm:inline">Export Report</span>
        </button>
      </div>
    </div>
  );
};
