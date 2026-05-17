import React from 'react';
import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableHead, TableRow, TablePagination, Chip, alpha, useTheme
} from '@mui/material';
import { formatDate } from '../../../utils/dateFormatter';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import StatusBadge from '../../../components/ui/StatusBadge';
import EmptyState from '../../../components/ui/EmptyState';
import { TableSkeleton } from '../../../components/ui/Skeletons';
import type { Transaction } from '../../../mock/transactions';
import { setPage, setRowsPerPage } from '../transactionSlice';
import { useAppDispatch } from '../../../app/hooks';

const SortIcon: React.FC<{ column: keyof Transaction; sortBy: keyof Transaction; sortOrder: 'asc' | 'desc' }> = ({ column, sortBy, sortOrder }) => {
  if (sortBy !== column) return null;
  return sortOrder === 'asc'
    ? <ArrowUpwardRoundedIcon sx={{ fontSize: 12, ml: 0.5, color: 'primary.main' }} />
    : <ArrowDownwardRoundedIcon sx={{ fontSize: 12, ml: 0.5, color: 'primary.main' }} />;
};

interface TransactionTableProps {
  loading: boolean;
  paginated: Transaction[];
  filteredCount: number;
  filters: any;
  handleSort: (col: keyof Transaction) => void;
  formatCurrency: (val: number) => string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  loading, paginated, filteredCount, filters, handleSort, formatCurrency
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const col = (label: string, key: keyof Transaction) => (
    <TableCell
      onClick={() => handleSort(key)}
      sx={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
      aria-sort={filters.sortBy === key ? (filters.sortOrder === 'asc' ? 'ascending' : 'descending') : undefined}
      role="columnheader"
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {label}
        <SortIcon column={key} sortBy={filters.sortBy} sortOrder={filters.sortOrder} />
      </Box>
    </TableCell>
  );

  return (
    <Card sx={{
      borderRadius: 2,
      boxShadow: isDark ? 'none' : '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper'
    }}>
      {loading ? (
        <CardContent><TableSkeleton rows={filters.rowsPerPage} /></CardContent>
      ) : (
        <>
          {/* Desktop table */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, overflowX: 'auto' }}>
            <Table aria-label="Transaction history table">
              <TableHead>
                <TableRow sx={{
                  '& th': {
                    bgcolor: isDark ? alpha('#fff', 0.03) : '#f8fafc',
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    py: 1.5
                  }
                }}>
                  {col('Date', 'date')}
                  {col('Description', 'description')}
                  {col('Category', 'category')}
                  {col('Amount', 'amount')}
                  {col('Status', 'status')}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ border: 0 }}>
                      <EmptyState 
                        variant="no-results" 
                        title="No transactions found"
                        description="No transactions match your current filters. Try adjusting your search criteria or clearing all filters."
                        actionLabel="Clear Filters"
                        compact
                      />
                    </TableCell>
                  </TableRow>
                ) : paginated.map((tx) => (
                  <TableRow 
                    key={tx.id} 
                    hover 
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: isDark ? alpha('#fff', 0.03) : 'rgba(0, 0, 0, 0.02)' } 
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" color="text.primary" fontWeight={500} noWrap>{formatDate(tx.date)}</Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 280, py: 2 }}>
                      <Typography variant="body2" fontWeight={700} color="text.primary" noWrap>{tx.description}</Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>Ref: {tx.reference}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip label={tx.category} size="small"
                        sx={{ 
                          fontSize: '0.7rem', 
                          bgcolor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.04), 
                          color: 'primary.main', 
                          fontWeight: 600, 
                          height: 24 
                        }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" fontWeight={700}
                        color={tx.type === 'credit' ? 'success.main' : 'text.primary'}>
                        {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip label={tx.status} size="small"
                        sx={{
                          bgcolor: tx.status === 'Completed' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                          color: tx.status === 'Completed' ? 'success.main' : 'warning.main',
                          fontWeight: 700, fontSize: '0.65rem', borderRadius: 99, height: 20,
                        }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Mobile card list */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }} role="list" aria-label="Transaction list">
            {paginated.length === 0 ? (
              <EmptyState 
                variant="no-results" 
                title="No transactions found"
                description="No transactions match your current filters."
                compact
              />
            ) : paginated.map((tx) => (
              <Box key={tx.id} role="listitem" sx={{ px: 2, py: 1.75, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1, mr: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} noWrap>{tx.description}</Typography>
                    <Typography variant="caption" color="text.secondary">{formatDate(tx.date)} · {tx.category}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography variant="body2" fontWeight={700}
                      color={tx.type === 'credit' ? 'success.main' : 'error.main'}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </Typography>
                    <StatusBadge status={tx.status} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <TablePagination
            component="div"
            count={filteredCount}
            page={filters.page}
            rowsPerPage={filters.rowsPerPage}
            onPageChange={(_, p) => dispatch(setPage(p))}
            onRowsPerPageChange={(e) => dispatch(setRowsPerPage(Number(e.target.value)))}
            rowsPerPageOptions={[10, 12, 25, 50]}
            sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            aria-label="Transaction pagination"
          />
        </>
      )}
    </Card>
  );
};

export default TransactionTable;
