import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: string;
  name: string;
  type: 'savings' | 'current' | 'fixed_deposit' | 'securities';
  accountNumber: string;
  balance: number;
  availableBalance: number;
  currency: 'INR';
  tag?: string;
  alert?: string;
}

interface AccountState {
  accounts: Account[];
  selectedAccountId: string;
  isLoading: boolean;
  lastUpdated: string | null;
}

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc1',
    name: 'Primary Operating',
    type: 'current',
    accountNumber: 'XXXX 8821',
    balance: 320500,
    availableBalance: 320500,
    currency: 'INR',
    tag: 'Primary Operating',
  },
  {
    id: 'acc2',
    name: 'Securities Portfolio',
    type: 'securities',
    accountNumber: 'XXXX 4402',
    balance: 8942000,
    availableBalance: 8500000,
    currency: 'INR',
    alert: 'Exposure Limit Alert',
  },
  {
    id: 'acc3',
    name: 'Fixed Deposit',
    type: 'fixed_deposit',
    accountNumber: 'XXXX 1193',
    balance: 5000000,
    availableBalance: 0,
    currency: 'INR',
  },
];

const initialState: AccountState = {
  accounts: MOCK_ACCOUNTS,
  selectedAccountId: 'acc1',
  isLoading: false,
  lastUpdated: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    selectAccount(state, action: PayloadAction<string>) {
      state.selectedAccountId = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    updateBalance(state, action: PayloadAction<{ id: string; delta: number }>) {
      const acc = state.accounts.find((a) => a.id === action.payload.id);
      if (acc) {
        acc.balance += action.payload.delta;
        acc.availableBalance += action.payload.delta;
      }
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { selectAccount, setLoading, updateBalance } = accountSlice.actions;
export default accountSlice.reducer;
