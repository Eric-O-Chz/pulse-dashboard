export type DateRangePreset = '7d' | '30d' | '90d' | '12m' | 'custom';

export interface DateRange {
  preset: DateRangePreset;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  label: string;
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: number; // percentage, e.g. +12.4 or -2.1
  isPositive: boolean;
  periodText: string;
  prefix?: string;
  suffix?: string;
  sparklineData: { value: number }[];
  targetValue?: string;
  targetProgress?: number; // 0 to 100
  color: 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan';
  icon: string;
}

export interface RevenueDataPoint {
  date: string;
  mrr: number;
  arr: number;
  newRevenue: number;
  expansion: number;
  churnedRevenue: number;
  netRevenue: number;
  previousPeriodMrr: number;
}

export interface PlanTierData {
  name: string;
  customers: number;
  revenue: number;
  color: string;
  share: number;
}

export interface AcquisitionDataPoint {
  period: string;
  newSignups: number;
  activated: number;
  churned: number;
}

export interface FunnelStep {
  stage: string;
  count: number;
  rate: number; // conversion from previous
  dropOff: number;
}

export type SubscriptionPlan = 'Starter' | 'Growth' | 'Scale' | 'Enterprise';
export type CustomerStatus = 'Active' | 'Trialing' | 'Past Due' | 'Churned';

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  company: string;
  plan: SubscriptionPlan;
  mrr: number;
  status: CustomerStatus;
  healthScore: number; // 0 - 100
  renewalDate: string;
  billingCycle: 'Monthly' | 'Annual';
  joinedDate: string;
  usagePercent: number;
  seats: number;
  country: string;
  countryCode: string;
}

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'sale' | 'alert' | 'upgrade' | 'system';
}
