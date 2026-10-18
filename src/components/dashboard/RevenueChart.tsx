import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import { BarChart3, TrendingUp } from 'lucide-react';

export const RevenueChart: React.FC = () => {
  const { revenueData, comparePrevious, dateRange } = useDashboard();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [chartMode, setChartMode] = useState<'area' | 'bar'>('area');
  const [metricView, setMetricView] = useState<'mrr' | 'breakdown' | 'net'>('mrr');

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val}`;
  };

  // Custom styled glassmorphic tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl text-xs space-y-1.5 min-w-[200px]">
          <p className="font-bold text-slate-800 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-800">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
          {comparePrevious && payload.find((p: any) => p.dataKey === 'mrr') && (
            <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 flex justify-between">
              <span>Period growth:</span>
              <span className="font-semibold text-emerald-500 font-mono">+12.8%</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const axisColor = isDark ? '#64748B' : '#94A3B8';

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Revenue Dynamics & Recurring Cashflow
            </h3>
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              {dateRange.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track recognized monthly recurring revenue, expansions, and previous period comparisons
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setMetricView('mrr')}
              type="button"
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                metricView === 'mrr'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              MRR Trend
            </button>
            <button
              onClick={() => setMetricView('breakdown')}
              type="button"
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                metricView === 'breakdown'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Flow Breakdown
            </button>
            <button
              onClick={() => setMetricView('net')}
              type="button"
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                metricView === 'net'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Net Added
            </button>
          </div>

          {/* Chart Type Icon Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setChartMode('area')}
              type="button"
              className={`p-1.5 rounded-lg transition ${
                chartMode === 'area'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Area Chart"
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartMode('bar')}
              type="button"
              className={`p-1.5 rounded-lg transition ${
                chartMode === 'bar'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Bar Chart"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === 'area' ? (
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={axisColor}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />

              {metricView === 'mrr' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    name="Current MRR"
                    stroke="#6366F1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#mrrGrad)"
                  />
                  {comparePrevious && (
                    <Line
                      type="monotone"
                      dataKey="previousPeriodMrr"
                      name="Previous Period"
                      stroke="#94A3B8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  )}
                </>
              )}

              {metricView === 'breakdown' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="newRevenue"
                    name="New Sales"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#newGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expansion"
                    name="Expansion"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#expGrad)"
                  />
                  <Line
                    type="monotone"
                    dataKey="churnedRevenue"
                    name="Churned"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    dot={false}
                  />
                </>
              )}

              {metricView === 'net' && (
                <Area
                  type="monotone"
                  dataKey="netRevenue"
                  name="Net Added Revenue"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fillOpacity={0.3}
                  fill="#06B6D4"
                />
              )}
            </AreaChart>
          ) : (
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCurrency} width={55} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="newRevenue" name="New Sales" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expansion" name="Expansion" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="churnedRevenue" name="Churned" fill="#F43F5E" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Summary Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Peak Run Rate</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">$134,850/mo</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Net Expansion</span>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">+$12,100</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Quick Ratio</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">3.8x (Top Decile)</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Efficiency Score</span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">89/100</span>
        </div>
      </div>
    </div>
  );
};
