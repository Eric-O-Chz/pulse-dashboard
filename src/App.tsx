import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/layout/CommandPalette';
import { DateRangeFilter } from './components/dashboard/DateRangeFilter';
import { KpiCard } from './components/dashboard/KpiCard';
import { RevenueChart } from './components/dashboard/RevenueChart';
import { TierDistributionChart } from './components/dashboard/TierDistributionChart';
import { AcquisitionChurnChart } from './components/dashboard/AcquisitionChurnChart';
import { ConversionFunnel } from './components/dashboard/ConversionFunnel';
import { CustomerTable } from './components/dashboard/CustomerTable';
import { CustomerDetailModal } from './components/dashboard/CustomerDetailModal';
import { GeoDistribution } from './components/dashboard/GeoDistribution';
import { SubscriptionsView } from './components/views/SubscriptionsView';
import { IntegrationsView } from './components/views/IntegrationsView';
import { SettingsView } from './components/views/SettingsView';
import { ToastAlert } from './components/common/ToastAlert';

const DashboardContent: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { kpis, currentView } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Sidebar (Responsive) */}
      <Sidebar
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMobileMenuToggle={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Main Overview Dashboard View */}
          {currentView === 'overview' && (
            <>
              {/* Date Filter & Reporting Bar */}
              <DateRangeFilter />

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpis.map((metric) => (
                  <KpiCard key={metric.id} metric={metric} />
                ))}
              </div>

              {/* Primary Interactive Revenue Dynamics Chart */}
              <RevenueChart />

              {/* Secondary Visual Charts: Plan Tiers + Acquisition/Churn + Geo */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TierDistributionChart />
                <AcquisitionChurnChart />
                <GeoDistribution />
              </div>

              {/* Conversion Funnel */}
              <ConversionFunnel />

              {/* Searchable, Sortable, Paginated Customer Table */}
              <CustomerTable />
            </>
          )}

          {/* Dedicated Revenue Analytics View */}
          {currentView === 'revenue' && (
            <div className="space-y-6">
              <DateRangeFilter />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {kpis.slice(0, 3).map((metric) => (
                  <KpiCard key={metric.id} metric={metric} />
                ))}
              </div>
              <RevenueChart />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TierDistributionChart />
                <GeoDistribution />
              </div>
            </div>
          )}

          {/* Dedicated Customers Directory View */}
          {currentView === 'customers' && (
            <div className="space-y-6">
              <CustomerTable />
            </div>
          )}

          {/* Dedicated Subscriptions View */}
          {currentView === 'subscriptions' && <SubscriptionsView />}

          {/* Dedicated Cohorts & Funnel View */}
          {currentView === 'retention' && (
            <div className="space-y-6">
              <DateRangeFilter />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kpis.slice(3, 5).map((metric) => (
                  <KpiCard key={metric.id} metric={metric} />
                ))}
              </div>
              <ConversionFunnel />
              <AcquisitionChurnChart />
            </div>
          )}

          {/* Integrations View */}
          {currentView === 'integrations' && <IntegrationsView />}

          {/* Settings View */}
          {currentView === 'settings' && <SettingsView />}

          {/* Footer */}
          <footer className="pt-8 pb-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All SaaS telemetry pipelines operational • 99.99% uptime</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
                Terms
              </span>
              <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
                Security SOC-2
              </span>
              <span>PulseMetrics v2.4</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Interactive Overlays */}
      <CommandPalette />
      <CustomerDetailModal />
      <ToastAlert />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
