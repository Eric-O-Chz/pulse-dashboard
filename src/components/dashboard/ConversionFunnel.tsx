import React from 'react';
import { CONVERSION_FUNNEL } from '../../data/mockData';
import { CheckCircle2, TrendingDown } from 'lucide-react';

export const ConversionFunnel: React.FC = () => {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            User Lifecycle & Conversion Funnel
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            End-to-end conversion efficiency from organic discovery to enterprise expansion
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Overall Conv: 3.3%
        </span>
      </div>

      <div className="space-y-3">
        {CONVERSION_FUNNEL.map((step, index) => {
          const maxCount = CONVERSION_FUNNEL[0].count;
          const widthPercent = Math.max(15, (step.count / maxCount) * 100);

          return (
            <div key={step.stage} className="relative">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {step.stage}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {index > 0 && (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      Step conv: <strong className="text-emerald-500">{step.rate}%</strong>
                    </span>
                  )}
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {step.count.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-3.5 rounded-xl overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-lg transition-all duration-500 ${
                    index === 0
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : index === 1
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      : index === 2
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : index === 3
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              {/* Drop-off connector */}
              {index < CONVERSION_FUNNEL.length - 1 && (
                <div className="flex items-center justify-center my-0.5 text-[10px] text-slate-400">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-slate-100/60 dark:bg-slate-800/50">
                    <TrendingDown className="w-3 h-3 text-rose-500" />
                    Drop-off: {CONVERSION_FUNNEL[index + 1].dropOff}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
