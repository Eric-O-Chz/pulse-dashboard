import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const ToastAlert: React.FC = () => {
  const { toast, dismissToast } = useDashboard();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white shadow-2xl border border-slate-700/60 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200 max-w-md">
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      ) : toast.type === 'warning' ? (
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
      ) : (
        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0" />
      )}
      <span className="text-xs font-medium text-slate-100 flex-1">{toast.message}</span>
      <button
        onClick={dismissToast}
        className="p-1 rounded-lg text-slate-400 hover:text-white transition"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
