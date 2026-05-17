import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';
import { useDebounce } from '../hooks/useDebounce';
import { formatDate } from '../utils/dateFormatter';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setFilters } from '../features/transactions/transactionSlice';
import { MOCK_TRANSACTIONS } from '../mock/transactions';
import type { Transaction } from '../mock/transactions';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

// Sub-components
import TransactionHeader from '../features/transactions/components/TransactionHeader';
import TransactionSummaryCards from '../features/transactions/components/TransactionSummaryCards';
import TransactionFilters from '../features/transactions/components/TransactionFilters';
import TransactionTable from '../features/transactions/components/TransactionTable';

const TransactionsPage: React.FC = () => {
  const { formatCurrency } = useCurrencyFormat();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.transaction.filters);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<string>('All');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  const handleSort = useCallback((col: keyof Transaction) => {
    const newOrder = filters.sortBy === col && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setFilters({ sortBy: col, sortOrder: newOrder }));
  }, [filters.sortBy, filters.sortOrder, dispatch]);

  const filtered = useMemo(() => {
    let data = [...MOCK_TRANSACTIONS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter((t) => t.description.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q) || t.counterparty.toLowerCase().includes(q));
    }
    if (filters.type !== 'all') data = data.filter((t) => t.type === filters.type);
    if (filters.category !== 'all') data = data.filter((t) => t.category === filters.category);
    if (activeStatus !== 'All') data = data.filter((t) => t.status === activeStatus);
    if (filters.dateFrom) data = data.filter((t) => t.date >= filters.dateFrom);
    if (filters.dateTo) data = data.filter((t) => t.date <= filters.dateTo);

    data.sort((a, b) => {
      const av = a[filters.sortBy] as string | number;
      const bv = b[filters.sortBy] as string | number;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return filters.sortOrder === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [filters, activeStatus]);

  const paginated = useMemo(
    () => filtered.slice(filters.page * filters.rowsPerPage, (filters.page + 1) * filters.rowsPerPage),
    [filtered, filters.page, filters.rowsPerPage]
  );

  const exportCsv = useCallback(() => {
    const headers = ['Date', 'Description', 'Reference', 'Category', 'Type', 'Amount', 'Status'];
    const rows = filtered.map((t) => [formatDate(t.date), t.description, t.reference, t.category, t.type, t.amount, t.status]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'fintrust_transactions.csv'; a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <AppLayout topBarPlaceholder="Search transactions...">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <TransactionHeader 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          onExport={exportCsv}
        />

        <TransactionSummaryCards />

        <TransactionFilters 
          isOpen={isFiltersOpen}
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
        />

        {/* Result count */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, mb: 1 }}>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 500); }}>
              <RefreshRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Showing {filters.page * filters.rowsPerPage + 1}–{Math.min((filters.page + 1) * filters.rowsPerPage, filtered.length)} of {filtered.length} results
          </Typography>
        </Box>

        <TransactionTable 
          loading={loading}
          paginated={paginated}
          filteredCount={filtered.length}
          filters={filters}
          handleSort={handleSort}
          formatCurrency={formatCurrency}
        />
      </motion.div>
    </AppLayout>
  );
};

export default TransactionsPage;
