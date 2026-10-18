import React, { useState } from 'react';
import { Check, Copy, Key } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const apiKey = 'pm_demo_sandbox_948a73b402e88102f9c878411b9382';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Workspace Settings & Configuration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage organization settings, security keys, team roles, and billing preferences
        </p>
      </div>

      {/* General Settings */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Organization Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Workspace Name
            </label>
            <input
              type="text"
              defaultValue="Acme Cloud Inc."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Primary Currency
            </label>
            <select
              defaultValue="USD"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="USD">USD ($) — United States Dollar</option>
              <option value="EUR">EUR (€) — Euro</option>
              <option value="GBP">GBP (£) — British Pound</option>
              <option value="JPY">JPY (¥) — Japanese Yen</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Key management */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">API Authentication Token</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Use this secret key to send telemetry and customer events via the PulseMetrics Ingestion API.
        </p>

        <div className="flex items-center gap-2 max-w-lg">
          <input
            type="password"
            value={apiKey}
            readOnly
            className="flex-1 font-mono text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 select-all"
          />
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Theme preferences */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Theme & Display</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Interface Color Scheme
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current mode: <strong className="capitalize">{theme}</strong>
            </p>
          </div>
          <button
            onClick={toggleTheme}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
          >
            Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
};
