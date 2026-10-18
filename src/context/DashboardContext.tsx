import React, { createContext, useContext, useMemo, useState } from 'react';
import type {
  Customer,
  DashboardNotification,
  DateRange,
  DateRangePreset,
  KpiMetric,
  RevenueDataPoint,
} from '../types/dashboard';
import {
  getKpisForDateRange,
  getRevenueChartData,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface DashboardContextType {
  dateRange: DateRange;
  setDateRangePreset: (preset: DateRangePreset) => void;
  setCustomDateRange: (start: string, end: string) => void;
  comparePrevious: boolean;
  setComparePrevious: (compare: boolean) => void;
  activeKpiId: string;
  setActiveKpiId: (id: string) => void;
  kpis: KpiMetric[];
  revenueData: RevenueDataPoint[];
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  notifications: DashboardNotification[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  simulateLiveEvent: () => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  dismissToast: () => void;
  searchCommandOpen: boolean;
  setSearchCommandOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    preset: '30d',
    startDate: '2026-09-18',
    endDate: '2026-10-18',
    label: 'Last 30 Days',
  });

  const [comparePrevious, setComparePrevious] = useState(true);
  const [activeKpiId, setActiveKpiId] = useState<string>('mrr');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [notifications, setNotifications] = useState<DashboardNotification[]>(INITIAL_NOTIFICATIONS);
  const [currentView, setCurrentView] = useState<string>('overview');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [searchCommandOpen, setSearchCommandOpen] = useState(false);

  const setDateRangePreset = (preset: DateRangePreset) => {
    let label = 'Last 30 Days';
    let start = '2026-09-18';
    const end = '2026-10-18';

    if (preset === '7d') {
      label = 'Last 7 Days';
      start = '2026-10-11';
    } else if (preset === '90d') {
      label = 'Last 90 Days';
      start = '2026-07-20';
    } else if (preset === '12m') {
      label = 'Last 12 Months';
      start = '2025-10-18';
    }

    setDateRange({
      preset,
      startDate: start,
      endDate: end,
      label,
    });

    setToast({
      message: `Analytics updated for period: ${label}`,
      type: 'info',
    });
  };

  const setCustomDateRange = (start: string, end: string) => {
    setDateRange({
      preset: 'custom',
      startDate: start,
      endDate: end,
      label: `${start} to ${end}`,
    });
    setToast({
      message: `Custom date range applied: ${start} to ${end}`,
      type: 'info',
    });
  };

  const kpis = useMemo(() => {
    return getKpisForDateRange(dateRange.preset);
  }, [dateRange.preset]);

  const revenueData = useMemo(() => {
    return getRevenueChartData(dateRange.preset);
  }, [dateRange.preset]);

  const unreadNotifsCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissToast = () => {
    setToast(null);
  };

  const simulateLiveEvent = () => {
    const events = [
      {
        title: 'New Annual Subscription',
        message: 'OmniGlobal Inc subscribed to Scale Tier ($1,890/mo)',
        type: 'sale' as const,
        toastMsg: '🎉 New customer subscribed: OmniGlobal Inc ($1,890/mo)',
      },
      {
        title: 'Trial Converted',
        message: 'FinTech Labs converted to Growth Plan ($650/mo)',
        type: 'upgrade' as const,
        toastMsg: '⚡ Trial conversion: FinTech Labs is now an active subscriber!',
      },
      {
        title: 'High Usage Warning',
        message: 'Nexus Finance Tokyo reached 92% of monthly API quota',
        type: 'alert' as const,
        toastMsg: '⚠️ Usage alert: Nexus Finance Tokyo API capacity near limit',
      },
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const newNotif: DashboardNotification = {
      id: `notif-${Date.now()}`,
      title: randomEvent.title,
      message: randomEvent.message,
      timestamp: 'Just now',
      read: false,
      type: randomEvent.type,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setToast({
      message: randomEvent.toastMsg,
      type: 'success',
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        dateRange,
        setDateRangePreset,
        setCustomDateRange,
        comparePrevious,
        setComparePrevious,
        activeKpiId,
        setActiveKpiId,
        kpis,
        revenueData,
        customers,
        setCustomers,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        currentView,
        setCurrentView,
        selectedCustomer,
        setSelectedCustomer,
        simulateLiveEvent,
        toast,
        dismissToast,
        searchCommandOpen,
        setSearchCommandOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
