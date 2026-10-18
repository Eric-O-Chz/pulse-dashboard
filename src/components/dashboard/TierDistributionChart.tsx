import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PLAN_TIERS_DATA } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

export const TierDistributionChart: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalCustomers = PLAN_TIERS_DATA.reduce((acc, curr) => acc + curr.customers, 0);
  const totalRevenue = PLAN_TIERS_DATA.reduce((acc, curr) => acc + curr.revenue, 0);

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-slate-900 dark:text-white mb-1">{data.name}</p>
          <div className="flex justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>Subscribers:</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">
              {data.customers.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>MRR Contribution:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
              ${data.revenue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-4 text-slate-500 dark:text-slate-400">
            <span>Market Share:</span>
            <span className="font-semibold text-emerald-500">{data.share}%</span>
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
            Plan Distribution
          </h3>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            {totalCustomers.toLocaleString()} total accounts
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Subscription revenue composition by tier
        </p>
      </div>

      {/* Donut Chart with Centered Metric */}
      <div className="relative w-full h-52 sm:h-56 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={PLAN_TIERS_DATA}
              innerRadius={58}
              outerRadius={84}
              paddingAngle={4}
              dataKey="revenue"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {PLAN_TIERS_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={theme === 'dark' ? '#0B0F19' : '#ffffff'}
                  strokeWidth={2}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    filter: activeIndex === index ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))' : 'none',
                    transform: activeIndex === index ? 'scale(1.04)' : 'scale(1)',
                    transformOrigin: 'center center',
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
            Total MRR
          </span>
          <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
            ${(totalRevenue / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* Plan list breakdown */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {PLAN_TIERS_DATA.map((tier, idx) => (
          <div
            key={tier.name}
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`flex items-center justify-between p-1.5 rounded-lg text-xs transition cursor-pointer ${
              activeIndex === idx
                ? 'bg-slate-100 dark:bg-slate-800 font-semibold'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
              <span className="text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                {tier.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                {tier.customers} accts
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
                {tier.share}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
