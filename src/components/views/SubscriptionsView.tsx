import React from 'react';
import { Check } from 'lucide-react';

export const SubscriptionsView: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$199',
      period: '/month',
      desc: 'Ideal for early-stage B2B startups validating product-market fit.',
      subscribers: '2,140 accounts',
      mrr: '$425.8k',
      features: ['Up to 10 seats', 'Core telemetry & events', 'Community support', 'Standard API (10k req/day)', 'CSV exports'],
      highlight: false,
    },
    {
      name: 'Growth',
      price: '$650',
      period: '/month',
      desc: 'For scaling teams demanding automated retention and churn alerts.',
      subscribers: '1,650 accounts',
      mrr: '$536.2k',
      features: ['Up to 50 seats', 'Cohort retention heatmaps', 'Priority webhook dispatch', 'Custom metric dashboards', '99.9% SLA guarantee'],
      highlight: false,
    },
    {
      name: 'Scale',
      price: '$1,890',
      period: '/month',
      desc: 'Engineered for high-volume SaaS companies with complex billing.',
      subscribers: '820 accounts',
      mrr: '$417.6k',
      features: ['Up to 250 seats', 'Automated churn prevention', 'Dedicated Slack support', 'Real-time revenue recognition', 'Audit log export'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'from $3,500/mo',
      desc: 'Tailored compliance, SSO/SAML, and custom data warehouse pipelines.',
      subscribers: '282 accounts',
      mrr: '$238.4k',
      features: ['Unlimited seats', 'Custom SLA (99.99%)', 'Dedicated technical CSM', 'SOC-2 Type II & HIPAA', 'Private cloud deploy'],
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Subscription Tiers & Packaging
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Review pricing structure, feature entitlements, and active subscriber distribution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`p-6 rounded-3xl backdrop-blur-xl border flex flex-col justify-between transition-all duration-200 ${
              p.highlight
                ? 'bg-gradient-to-b from-indigo-50/90 to-white dark:from-indigo-950/40 dark:to-slate-900 border-indigo-500/80 dark:border-indigo-500/60 shadow-xl shadow-indigo-500/10 scale-[1.02]'
                : 'bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800/80 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {p.name}
                </span>
                {p.highlight && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {p.price}
                </span>
                <span className="text-xs text-slate-400">{p.period}</span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{p.desc}</p>

              <div className="py-2.5 px-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 mb-5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Subscribers:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">{p.subscribers}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300 mt-1">
                  <span>MRR Contribution:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{p.mrr}</span>
                </div>
              </div>

              <div className="space-y-2.5 mb-6 text-xs text-slate-600 dark:text-slate-300">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`w-full py-2 rounded-xl text-xs font-semibold transition ${
                p.highlight
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              Configure Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
