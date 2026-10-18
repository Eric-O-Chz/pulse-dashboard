import React from 'react';
import type { CustomerStatus, SubscriptionPlan } from '../../types/dashboard';

interface StatusBadgeProps {
  status: CustomerStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles: Record<CustomerStatus, { bg: string; text: string; dot: string; border: string }> = {
    Active: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200 dark:border-emerald-800/60',
    },
    Trialing: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-700 dark:text-blue-400',
      dot: 'bg-blue-500',
      border: 'border-blue-200 dark:border-blue-800/60',
    },
    'Past Due': {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-400',
      dot: 'bg-amber-500 animate-pulse',
      border: 'border-amber-200 dark:border-amber-800/60',
    },
    Churned: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      text: 'text-rose-700 dark:text-rose-400',
      dot: 'bg-rose-500',
      border: 'border-rose-200 dark:border-rose-800/60',
    },
  };

  const current = styles[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {status}
    </span>
  );
};

interface PlanBadgeProps {
  plan: SubscriptionPlan;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({ plan }) => {
  const planStyles: Record<SubscriptionPlan, { bg: string; text: string; border: string }> = {
    Starter: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-200 dark:border-slate-700',
    },
    Growth: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      text: 'text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800/50',
    },
    Scale: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/50',
    },
    Enterprise: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-700 dark:text-amber-300 font-semibold',
      border: 'border-amber-200 dark:border-amber-800/60',
    },
  };

  const config = planStyles[plan];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {plan}
    </span>
  );
};
