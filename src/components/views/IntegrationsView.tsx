import React from 'react';
import { ExternalLink } from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const integrations = [
    {
      name: 'Stripe Billing & Subscriptions',
      category: 'Payment Gateway',
      status: 'Connected',
      icon: '💳',
      desc: 'Sync invoices, payment failures, refunds, and chargebacks in real-time.',
      lastSync: '2 minutes ago',
    },
    {
      name: 'Salesforce CRM',
      category: 'Sales Pipeline',
      status: 'Connected',
      icon: '☁️',
      desc: 'Bi-directional sync with account executives, closed-won opportunities, and ARR.',
      lastSync: '14 minutes ago',
    },
    {
      name: 'HubSpot Marketing',
      category: 'Inbound Leads',
      status: 'Connected',
      icon: '🟠',
      desc: 'Track trial conversions, lead attribution channels, and marketing touchpoints.',
      lastSync: '1 hour ago',
    },
    {
      name: 'Segment & Reverse ETL',
      category: 'Event Telemetry',
      status: 'Connected',
      icon: '📐',
      desc: 'Stream user event logs, in-app product telemetry, and feature adoption triggers.',
      lastSync: 'Real-time websocket',
    },
    {
      name: 'Slack Alerts & Notifications',
      category: 'Team Comms',
      status: 'Connected',
      icon: '💬',
      desc: 'Automated deal celebration broadcasts (#sales-wins) and churn warnings.',
      lastSync: 'Active webhook',
    },
    {
      name: 'Snowflake / BigQuery Warehouse',
      category: 'Data Storage',
      status: 'Disconnected',
      icon: '❄️',
      desc: 'Direct SQL querying on raw event tables and customized cohort models.',
      lastSync: 'Not configured',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Connected Data Pipeline & Integrations
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage integrations across billing providers, CRMs, marketing automation, and notification webhooks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div
            key={item.name}
            className="p-5 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-800">
                  {item.icon}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.status === 'Connected'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {item.status === 'Connected' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                  {item.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {item.name}
              </h4>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mb-2">
                {item.category}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{item.lastSync}</span>
              <button
                type="button"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Configure
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
