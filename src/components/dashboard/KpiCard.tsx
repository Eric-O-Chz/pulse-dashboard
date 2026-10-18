import React from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import type { KpiMetric } from '../../types/dashboard';

interface KpiCardProps {
  metric: KpiMetric;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric }) => {
  const { activeKpiId, setActiveKpiId } = useDashboard();
  const isSelected = activeKpiId === metric.id;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return TrendingUp;
      case 'DollarSign':
        return DollarSign;
      case 'Users':
        return Users;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'CreditCard':
        return CreditCard;
      case 'Activity':
      default:
        return Activity;
    }
  };

  const Icon = getIcon(metric.icon);

  // Sparkline coordinates calculator
  const renderSparkline = () => {
    const points = metric.sparklineData.map((d) => d.value);
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 110;
    const height = 34;

    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    });

    const pathD = `M ${coords.join(' L ')}`;
    const strokeColor = metric.isPositive ? '#10B981' : '#F43F5E';
    const fillColor = metric.isPositive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)';
    const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path d={areaD} fill={fillColor} />
        <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const colorVariants: Record<string, { bg: string; text: string; glow: string }> = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
      text: 'text-indigo-600 dark:text-indigo-400',
      glow: 'border-indigo-500 shadow-indigo-500/20',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      text: 'text-emerald-600 dark:text-emerald-400',
      glow: 'border-emerald-500 shadow-emerald-500/20',
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-950/50',
      text: 'text-cyan-600 dark:text-cyan-400',
      glow: 'border-cyan-500 shadow-cyan-500/20',
    },
    violet: {
      bg: 'bg-purple-50 dark:bg-purple-950/50',
      text: 'text-purple-600 dark:text-purple-400',
      glow: 'border-purple-500 shadow-purple-500/20',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      text: 'text-amber-600 dark:text-amber-400',
      glow: 'border-amber-500 shadow-amber-500/20',
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-950/50',
      text: 'text-rose-600 dark:text-rose-400',
      glow: 'border-rose-500 shadow-rose-500/20',
    },
  };

  const styleConfig = colorVariants[metric.color] || colorVariants.indigo;

  return (
    <div
      onClick={() => setActiveKpiId(metric.id)}
      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 backdrop-blur-xl group ${
        isSelected
          ? `bg-white dark:bg-slate-900 border-2 ${styleConfig.glow} shadow-xl scale-[1.01]`
          : 'bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
      }`}
    >
      {/* Active Indicator Top Tag */}
      {isSelected && (
        <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm uppercase tracking-wider">
          Chart Focus
        </div>
      )}

      {/* Header: Title and Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
          {metric.title}
        </span>
        <div className={`p-2 rounded-xl ${styleConfig.bg} ${styleConfig.text} transition-transform group-hover:scale-110`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Metric Main Value and Sparkline */}
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {metric.value}
          </span>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md ${
                metric.isPositive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
              }`}
            >
              {metric.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
              {metric.periodText}
            </span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="flex-shrink-0">
          {renderSparkline()}
        </div>
      </div>

      {/* Target Progress Bar */}
      {metric.targetValue && metric.targetProgress !== undefined && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-1">
            <span>Target: {metric.targetValue}</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {metric.targetProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                metric.color === 'indigo'
                  ? 'bg-indigo-500'
                  : metric.color === 'emerald'
                  ? 'bg-emerald-500'
                  : metric.color === 'cyan'
                  ? 'bg-cyan-500'
                  : metric.color === 'violet'
                  ? 'bg-purple-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(metric.targetProgress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
