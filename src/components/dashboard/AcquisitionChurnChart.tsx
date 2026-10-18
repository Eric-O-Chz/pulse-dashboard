import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ACQUISITION_FLOW_DATA } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

export const AcquisitionChurnChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const axisColor = isDark ? '#64748B' : '#94A3B8';

  const CustomAcquisitionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const signups = payload.find((p: any) => p.dataKey === 'newSignups')?.value || 0;
      const churned = payload.find((p: any) => p.dataKey === 'churned')?.value || 0;
      const net = signups - churned;

      return (
        <div className="p-3 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md text-xs space-y-1">
          <p className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1">
            Month: {label}
          </p>
          <div className="flex justify-between gap-4 text-emerald-600 dark:text-emerald-400">
            <span>New Signups:</span>
            <span className="font-bold font-mono">+{signups}</span>
          </div>
          <div className="flex justify-between gap-4 text-rose-600 dark:text-rose-400">
            <span>Churned Accounts:</span>
            <span className="font-bold font-mono">-{churned}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
            <span>Net Customer Growth:</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">+{net}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Acquisition vs Churn
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            +682 Net in Oct
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Monthly account velocity and customer turnover
        </p>
      </div>

      <div className="w-full h-52 sm:h-56 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ACQUISITION_FLOW_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="period" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomAcquisitionTooltip />} />
            <Bar dataKey="newSignups" name="New Signups" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="churned" name="Churned" fill="#F43F5E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-around pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <span className="text-slate-600 dark:text-slate-300">Signups (+742)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
          <span className="text-slate-600 dark:text-slate-300">Churned (-60)</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Ratio: <span className="font-bold text-slate-700 dark:text-slate-200">12.3:1</span>
        </div>
      </div>
    </div>
  );
};
