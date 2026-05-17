import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { store } from './app/store';
import { lightTheme, darkTheme } from './theme/theme';
import { useAppSelector } from './app/hooks';
import AppRouter from './router/AppRouter';

import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Inner component to access Redux state for theme
const ThemedApp: React.FC = () => {
  const mode = useAppSelector((s) => s.theme.mode);
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={4}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <BrowserRouter>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <ThemedApp />
  </Provider>
);

export default App;
