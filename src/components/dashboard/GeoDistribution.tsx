import React from 'react';
import { GEO_DISTRIBUTION } from '../../data/mockData';
import { Globe } from 'lucide-react';

export const GeoDistribution: React.FC = () => {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Global Revenue Distribution
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            52 Countries
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Top geographic markets by revenue concentration
        </p>
      </div>

      <div className="space-y-3 my-3">
        {GEO_DISTRIBUTION.map((geo) => (
          <div key={geo.country} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
                <span>{geo.flag}</span>
                <span>{geo.country}</span>
              </span>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-slate-500 dark:text-slate-400">{geo.mrr}</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono w-10 text-right">
                  {geo.share}%
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full"
                style={{ width: `${geo.share * 2}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Payment Gateway: Stripe Multi-Currency</span>
        <span className="text-emerald-500 font-semibold">99.98% Auth Rate</span>
      </div>
    </div>
  );
};
