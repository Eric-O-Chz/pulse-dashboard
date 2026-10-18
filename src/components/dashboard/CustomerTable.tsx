import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
  UserX,
  X,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { PlanBadge, StatusBadge } from '../common/Badge';

type SortField = 'name' | 'company' | 'plan' | 'mrr' | 'status' | 'healthScore' | 'renewalDate';
type SortOrder = 'asc' | 'desc';

export const CustomerTable: React.FC = () => {
  const { customers, setSelectedCustomer } = useDashboard();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'trialing' | 'at_risk'>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('mrr');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtering Logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // Tab filter
      if (activeTab === 'active' && cust.status !== 'Active') return false;
      if (activeTab === 'trialing' && cust.status !== 'Trialing') return false;
      if (activeTab === 'at_risk' && (cust.healthScore >= 60 || cust.status === 'Churned')) return false;

      // Plan filter
      if (planFilter !== 'all' && cust.plan !== planFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && cust.status !== statusFilter) return false;

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = cust.name.toLowerCase().includes(q);
        const matchesCompany = cust.company.toLowerCase().includes(q);
        const matchesEmail = cust.email.toLowerCase().includes(q);
        const matchesCountry = cust.country.toLowerCase().includes(q);
        if (!matchesName && !matchesCompany && !matchesEmail && !matchesCountry) return false;
      }

      return true;
    });
  }, [customers, activeTab, planFilter, statusFilter, searchQuery]);

  // Sorting Logic
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = (aVal as string).toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortField, sortOrder]);

  // Pagination Logic
  const totalItems = sortedCustomers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedCustomers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedCustomers.map((c) => c.id));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const exportSelected = () => {
    const selectedCustomers = customers.filter((c) => selectedIds.includes(c.id));
    const toExport = selectedCustomers.length > 0 ? selectedCustomers : filteredCustomers;
    const headers = ['ID', 'Customer', 'Email', 'Company', 'Plan', 'MRR', 'Status', 'HealthScore', 'Country'];
    
    // Prevent CSV formula injection (CWE-1236)
    const sanitizeCsvCell = (val: string | number) => {
      const str = String(val ?? '');
      const safe = /^[=+@-|\t\r]/.test(str) ? `'${str}` : str;
      return `"${safe.replace(/"/g, '""')}"`;
    };

    const rows = toExport.map((c) => [
      sanitizeCsvCell(c.id),
      sanitizeCsvCell(c.name),
      sanitizeCsvCell(c.email),
      sanitizeCsvCell(c.company),
      sanitizeCsvCell(c.plan),
      c.mrr,
      sanitizeCsvCell(c.status),
      c.healthScore,
      sanitizeCsvCell(c.country),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `customer_export_${selectedIds.length ? 'selected' : 'all'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-50 group-hover:opacity-100" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
    );
  };

  return (
    <div className="rounded-3xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm overflow-hidden">
      {/* Table Header & Quick Tabs */}
      <div className="p-5 border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Customer & Subscription Directory
              </h3>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {totalItems} accounts
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Monitor customer renewals, health scores, recurring value and risk cohorts
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                setActiveTab('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Customers
            </button>
            <button
              onClick={() => {
                setActiveTab('active');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeTab === 'active'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Active Paid
            </button>
            <button
              onClick={() => {
                setActiveTab('trialing');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeTab === 'trialing'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Trialing
            </button>
            <button
              onClick={() => {
                setActiveTab('at_risk');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
                activeTab === 'at_risk'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              At Risk (Score &lt; 60)
            </button>
          </div>
        </div>

        {/* Filter Bar: Search Input, Plan Filter, Status Filter, Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-xl">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by customer, company, email or country..."
                className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Plan Dropdown */}
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Growth">Growth</option>
              <option value="Scale">Scale</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trialing">Trialing</option>
              <option value="Past Due">Past Due</option>
              <option value="Churned">Churned</option>
            </select>
          </div>

          {/* Right Actions: Export, Bulk Selected */}
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
                {selectedIds.length} selected
              </span>
            )}
            <button
              onClick={exportSelected}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedIds.length > 0 ? 'Export Selected' : 'Export Table'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200/80 dark:border-slate-800/80 select-none">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={paginatedCustomers.length > 0 && selectedIds.length === paginatedCustomers.length}
                  onChange={toggleSelectAll}
                  className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              <th
                onClick={() => handleSort('name')}
                className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Customer & Company</span>
                  {renderSortIcon('name')}
                </div>
              </th>
              <th
                onClick={() => handleSort('plan')}
                className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Subscription Plan</span>
                  {renderSortIcon('plan')}
                </div>
              </th>
              <th
                onClick={() => handleSort('mrr')}
                className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Monthly Value (MRR)</span>
                  {renderSortIcon('mrr')}
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  {renderSortIcon('status')}
                </div>
              </th>
              <th
                onClick={() => handleSort('healthScore')}
                className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Health Score</span>
                  {renderSortIcon('healthScore')}
                </div>
              </th>
              <th
                onClick={() => handleSort('renewalDate')}
                className="p-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Renewal Date</span>
                  {renderSortIcon('renewalDate')}
                </div>
              </th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => {
                const isSelected = selectedIds.includes(customer.id);
                return (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/30'
                        : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-4" onClick={(e) => toggleSelectRow(customer.id, e)}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition flex items-center gap-1.5">
                            {customer.name}
                            <span className="text-[10px] font-normal text-slate-400">
                              ({customer.countryCode})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {customer.company} • {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <PlanBadge plan={customer.plan} />
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {customer.billingCycle} ({customer.seats} seats)
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      ${customer.mrr.toLocaleString()}
                      <span className="text-[10px] text-slate-400 block font-normal">/ month</span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              customer.healthScore >= 80
                                ? 'bg-emerald-500'
                                : customer.healthScore >= 50
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${customer.healthScore}%` }}
                          />
                        </div>
                        <span
                          className={`font-mono font-bold text-[11px] ${
                            customer.healthScore >= 80
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : customer.healthScore >= 50
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {customer.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      {customer.renewalDate}
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500">
                  <UserX className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="font-medium text-xs">No customer accounts matched your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('all');
                      setPlanFilter('all');
                      setStatusFilter('all');
                    }}
                    className="mt-2 text-indigo-600 dark:text-indigo-400 underline text-xs"
                  >
                    Reset all filters
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-slate-200/70 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{totalItems === 0 ? 0 : startIndex + 1}</strong> to{' '}
            <strong className="text-slate-900 dark:text-white">
              {Math.min(startIndex + pageSize, totalItems)}
            </strong>{' '}
            of <strong className="text-slate-900 dark:text-white">{totalItems}</strong> entries
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Page Nav Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition ${
                currentPage === page
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
