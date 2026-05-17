import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  jobTitle: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@fintrust.in': {
    password: 'admin123',
    user: {
      id: 'u1',
      name: 'Alex Hamilton',
      email: 'admin@fintrust.in',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80',
      jobTitle: 'Lead Strategist',
      phone: '+91 98765 43210',
    },
  },
  'user@fintrust.in': {
    password: 'user123',
    user: {
      id: 'u2',
      name: 'Marcus Chen',
      email: 'user@fintrust.in',
      role: 'user',
      avatar: 'MC',
      jobTitle: 'Asset Manager',
      phone: '+91 91234 56789',
    },
  },
};

const stored = localStorage.getItem('fintrust_user');
const initialUser: User | null = stored ? JSON.parse(stored) : null;

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('fintrust_user', JSON.stringify(action.payload));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('fintrust_user');
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('fintrust_user', JSON.stringify(state.user));
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError } = authSlice.actions;

// Thunk for mock login
export const mockLogin = (email: string, password: string) => async (dispatch: any) => {
  dispatch(loginStart());
  await new Promise((r) => setTimeout(r, 900));
  const record = MOCK_USERS[email.toLowerCase()];
  if (record && record.password === password) {
    dispatch(loginSuccess(record.user));
    return true;
  } else {
    dispatch(loginFailure('Invalid email or password.'));
    return false;
  }
};

export default authSlice.reducer;
