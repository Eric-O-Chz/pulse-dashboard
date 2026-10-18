# ⚡ PulseMetrics — Enterprise SaaS Analytics & Revenue Intelligence

> **A real-time command center for modern B2B SaaS founders, finance executives, and revenue operations teams to monitor cashflow dynamics, subscriber health, cohort retention, and churn prevention.**

---

## 🎯 What This Web Application Is About

**PulseMetrics** is an enterprise-grade SaaS analytics and subscription intelligence dashboard designed to solve one of the most critical challenges in high-growth software companies: **visibility into recurring revenue health and customer retention.**

Traditional SaaS teams often suffer from fragmented reporting—billing data sits in Stripe, pipeline data lives in Salesforce, and customer usage is trapped in product databases. **PulseMetrics aggregates and visualizes these critical metrics into a unified, actionable cockpit.**

### 💡 Core Intention & Purpose

1. **Revenue Recognition & Predictable Cashflow**:
   Provides clear visibility into **Monthly Recurring Revenue (MRR)**, **Annual Run Rate (ARR)**, expansions, contraction, and churn, allowing executives to forecast quarterly pacing accurately.

2. **Proactive Churn Prevention**:
   Instead of discovering cancellations after the fact, the platform tracks **Customer Health Scores** (0–100%), flagging at-risk accounts before they churn so Customer Success teams can intervene.

3. **Unit Economics & Capital Efficiency**:
   Monitors the critical benchmarks that venture capitalists and operators prioritize: **LTV:CAC ratio (4.9x)**, **Blended ARPU ($86.40)**, and **Net Revenue Churn (1.18%)**.

4. **Self-Serve vs. Enterprise Cohort Analysis**:
   Breaks down subscriber distribution and revenue weight across plans (*Starter*, *Growth*, *Scale*, and *Enterprise*), highlighting where expansion revenue originates.

5. **Operational Speed & Ergonomics**:
   Equipped with a global **`⌘K` / `Ctrl+K` Command Palette**, instant CSV reporting, fuzzy account search, multi-column sorting, and a realistic **live event simulation engine** to model high-velocity SaaS workflows.

---

## 👥 Who This Is Built For (User Personas)

| Persona | Primary Goal in PulseMetrics |
| :--- | :--- |
| **SaaS Founders & CEOs** | High-level ARR/MRR trajectory, runway pacing, investor reporting, and macro company growth. |
| **Heads of Growth & Marketing** | Full-funnel conversion efficiency from unique visitors to trials, activations, and paid expansions. |
| **Finance & RevOps Leaders** | Billings reconciliation, net revenue expansion, multi-currency geographic distribution, and cohort trends. |
| **Customer Success Managers** | Account health scores, usage quota consumption, renewal deadlines, and overdue invoice tracking. |

---

## 🚀 Key Functional Modules

### 1. Executive KPI Telemetry
- **MRR & ARR Tracking**: Real-time recurring revenue with period-over-period percentage deltas, interactive sparklines, and target progress pacing.
- **Health Indicators**: Blended ARPU, LTV:CAC payback speed (6.8 months), and Net Revenue Churn compared against standard industry benchmarks (< 2.0%).
- **Interactive Spotlight**: Clicking any KPI card spotlights that metric and aligns chart focuses.

### 2. Interactive Revenue Dynamics ([RevenueChart.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/RevenueChart.tsx))
- Built with **Recharts**, featuring smooth gradient area curves and bar chart comparisons.
- **Metric Switches**: Toggle between *MRR Trend*, *Flow Breakdown* (New Sales vs. Expansion vs. Churn), and *Net Added Revenue*.
- **Ghost Comparison Curve**: Check "Compare to previous period" to superimpose the prior period's trajectory for immediate performance comparison.
- **Custom Glassmorphic Tooltip**: Displays itemized monetary breakdowns on hover.

### 3. Subscription & Market Distribution
- **Plan Distribution Donut** ([TierDistributionChart.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/TierDistributionChart.tsx)): Visualizes revenue and account share across Starter, Growth, Scale, and Enterprise plans with interactive hover focus.
- **Acquisition vs. Churn Velocity** ([AcquisitionChurnChart.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/AcquisitionChurnChart.tsx)): Dual-bar monthly breakdown showing net subscriber additions and turnover ratios (12.3:1).
- **Global Revenue Distribution** ([GeoDistribution.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/GeoDistribution.tsx)): Market concentration across North America, Europe, and APAC with Stripe multi-currency authorization metrics.

### 4. Lifecycle Conversion Funnel ([ConversionFunnel.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/ConversionFunnel.tsx))
- Visualizes the 5 fundamental milestones in modern B2B SaaS:
  1. **Unique Visitors** (148.5k)
  2. **Free Trial Signups** (18.4k, 12.4% conv)
  3. **Product Activation** (12.8k, 70% setup rate)
  4. **Paid Conversion** (4,892 accounts, 38% trial-to-paid)
  5. **Seat & Tier Expansion** (1,950 accounts, 39.8% expansion rate)
- Identifies drop-off bottlenecks between each lifecycle phase.

### 5. Searchable, Sortable Customer Directory ([CustomerTable.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/CustomerTable.tsx))
- **Multi-Filter Tabs**: Quick-switch between *All Customers*, *Active Paid*, *Trialing*, and *At Risk* (Health < 60%).
- **Instant Search**: Real-time fuzzy filtering across customer name, company, email, and country.
- **Multi-Column Sorting**: Sort ascending or descending by Customer, Plan, MRR, Status, Health Score, or Renewal Date.
- **Configurable Pagination**: Dynamic page sizing (5, 10, or 20 records per page) with page counters.
- **Customer Detail Modal** ([CustomerDetailModal.tsx](file:///d:/MyFrontend/saas_project/src/components/dashboard/CustomerDetailModal.tsx)): Displays account telemetry, plan quotas, seat allocation, recent invoices, and one-click tier upgrades.
- **Data Portability**: Instant one-click CSV export for selected rows or entire queries.

### 6. Ergonomics & Real-Time Simulation
- **Global Command Palette (`⌘K` / `Ctrl+K`)**: Rapid keyboard-driven navigation across metrics, accounts, and application views.
- **Dark & Light Mode**: Seamless theme switching with custom CSS tokens, glowing accents, and `localStorage` persistence.
- **Live Event Simulator**: Click **"Simulate Event"** in the top navigation to trigger real-time enterprise deals, churn alerts, or trial conversions with animated toast notifications.

---

## 📐 Technology Stack & Architectural Decisions

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Strict type-safety, modern component composition, and optimal state predictability. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Latest CSS-first `@theme` design system with custom `@custom-variant dark` support and fluid responsive layouts. |
| **Visualization** | [Recharts](https://recharts.org/) | Responsive SVG charting engine supporting Area, Bar, Line, and Donut visualizations with custom tooltips. |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, clean iconography for SaaS operations, navigation, and badges. |
| **Build Tool** | [Vite 6](https://vite.dev/) | Sub-second Hot Module Replacement (HMR) and optimized production bundles. |

---

## 📂 Project Structure

```
d:\MyFrontend\saas_project/
├── index.html                   # HTML shell with Plus Jakarta Sans typography
├── vite.config.ts               # Vite configuration with @tailwindcss/vite plugin
├── tsconfig.app.json            # Strict TypeScript configuration
├── src/
│   ├── index.css                # Tailwind CSS v4 directives & glassmorphic utilities
│   ├── types/
│   │   └── dashboard.ts         # Type definitions (KpiMetric, Customer, DateRange, etc.)
│   ├── context/
│   │   ├── ThemeContext.tsx     # Persistent Dark/Light theme manager
│   │   └── DashboardContext.tsx # Central state: Date ranges, customer mutations, toasts
│   ├── data/
│   │   └── mockData.ts          # Realistic data generators for 7d, 30d, 90d, and 12m
│   ├── components/
│   │   ├── common/              # StatusBadge, PlanBadge, ThemeToggle, ToastAlert
│   │   ├── layout/              # Sidebar, Navbar, CommandPalette
│   │   ├── dashboard/           # KpiCard, RevenueChart, TierDistributionChart,
│   │   │                        # AcquisitionChurnChart, ConversionFunnel, CustomerTable,
│   │   │                        # CustomerDetailModal, GeoDistribution, DateRangeFilter
│   │   └── views/               # Dedicated views: Subscriptions, Integrations, Settings
│   ├── App.tsx                  # Root application layout and view router
│   └── main.tsx                 # Entrypoint
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` (bundled with Node)

### Installation & Launch
1. Clone or navigate to the repository directory:
   ```powershell
   cd d:\MyFrontend\saas_project
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the local development server:
   ```powershell
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/
   ```

### Production Build & Linting
- **Type-Check and Bundle**:
  ```powershell
  npm run build
  ```
- **Preview Production Build**:
  ```powershell
  npm run preview
  ```

---

## 📊 Key Metric Formulas (Reference Guide)

- **MRR (Monthly Recurring Revenue)**: $\sum (\text{Active Subscribers} \times \text{Monthly Subscription Price})$
- **ARR (Annual Run Rate)**: $\text{MRR} \times 12$
- **ARPU (Average Revenue Per User)**: $\frac{\text{Total MRR}}{\text{Active Paying Customers}}$
- **Net Revenue Churn Rate**: $\frac{\text{Churned MRR} - \text{Expansion MRR}}{\text{MRR at Start of Period}} \times 100$
- **LTV:CAC Ratio**: $\frac{\text{Customer Lifetime Value}}{\text{Customer Acquisition Cost}}$ *(Benchmark: $> 3.0\times$ indicates high capital efficiency)*
