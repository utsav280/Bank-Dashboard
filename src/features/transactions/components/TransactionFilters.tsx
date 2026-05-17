import React from 'react';
import {
  Box, Typography, Card, CardContent, TextField, Select, MenuItem,
  FormControl, InputLabel, Stack, Chip, alpha, Collapse, useTheme
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setFilters } from '../transactionSlice';
import type { TxStatus } from '../../../mock/transactions';

const CATEGORIES = ['All Categories', 'Equities', 'Treasury', 'Operational', 'Payroll', 'Infrastructure', 'Tax', 'Compliance', 'Metals'];
const STATUSES: (TxStatus | 'All')[] = ['All', 'Completed', 'Pending', 'Processing', 'Flagged', 'Failed'];

const StatusFilterChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Chip
      label={label}
      onClick={onClick}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.72rem',
        bgcolor: active 
          ? (isDark ? 'primary.main' : '#0f172a') 
          : 'transparent',
        color: active 
          ? (isDark ? '#141313' : 'white') 
          : 'text.secondary',
        border: '1px solid',
        borderColor: active 
          ? (isDark ? 'primary.main' : '#0f172a') 
          : 'divider',
        '&:hover': { 
          bgcolor: active 
            ? (isDark ? alpha('#adc6ff', 0.85) : '#1e293b') 
            : (isDark ? alpha('#fff', 0.06) : alpha('#001E3C', 0.06)) 
        },
        height: 28,
      }}
    />
  );
};

interface TransactionFiltersProps {
  isOpen: boolean;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ isOpen, activeStatus, setActiveStatus }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.transaction.filters);

  return (
    <Collapse in={isOpen}>
      <Card sx={{ mb: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
            <TextField size="small" type="date" label="From" InputLabelProps={{ shrink: true }}
              value={filters.dateFrom} onChange={(e) => dispatch(setFilters({ dateFrom: e.target.value }))}
              sx={{ flex: 1 }}
            />
            <TextField size="small" type="date" label="To" InputLabelProps={{ shrink: true }}
              value={filters.dateTo} onChange={(e) => dispatch(setFilters({ dateTo: e.target.value }))}
              sx={{ flex: 1 }}
            />
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category === 'all' ? 'All Categories' : filters.category}
                label="Category"
                onChange={(e) => dispatch(setFilters({ category: e.target.value === 'All Categories' ? 'all' : e.target.value as any }))}
              >
                {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Type</InputLabel>
              <Select value={filters.type} label="Type" onChange={(e) => dispatch(setFilters({ type: e.target.value as any }))}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box mt={3}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} mb={1.5} display="block" letterSpacing={0.5}>FILTER BY STATUS</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {STATUSES.map((s) => (
                <StatusFilterChip key={s} label={s} active={activeStatus === s} onClick={() => setActiveStatus(s)} />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default TransactionFilters;
