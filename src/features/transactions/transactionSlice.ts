import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction, TxCategory, TxStatus, TxType } from '../../mock/transactions';
import { MOCK_TRANSACTIONS } from '../../mock/transactions';

export interface TransactionFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
  type: TxType | 'all';
  category: TxCategory | 'all';
  status: TxStatus | 'all';
  sortBy: keyof Transaction;
  sortOrder: 'asc' | 'desc';
  page: number;
  rowsPerPage: number;
}

interface TransactionState {
  all: Transaction[];
  filters: TransactionFilters;
  isLoading: boolean;
}

const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

const initialState: TransactionState = {
  all: MOCK_TRANSACTIONS,
  filters: {
    search: '',
    dateFrom: thirtyDaysAgo.toISOString().split('T')[0],
    dateTo: today.toISOString().split('T')[0],
    type: 'all',
    category: 'all',
    status: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    page: 0,
    rowsPerPage: 12,
  },
  isLoading: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<TransactionFilters>>) {
      state.filters = { ...state.filters, ...action.payload, page: 0 };
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.filters.rowsPerPage = action.payload;
      state.filters.page = 0;
    },
    setSort(state, action: PayloadAction<{ sortBy: keyof Transaction; sortOrder: 'asc' | 'desc' }>) {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setFilters, setPage, setRowsPerPage, setSort, setLoading } = transactionSlice.actions;
export default transactionSlice.reducer;
