import React, { Component } from 'react';
import type { ErrorInfo } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidMount() {
    // If the app loads successfully, clear any previous reload attempt flags
    try {
      sessionStorage.removeItem('fintrust_chunk_reload_attempt');
    } catch (e) {
      console.error('Failed to clear sessionStorage:', e);
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);

    // Detect Vite dynamic import/chunk mismatch errors
    const errorMessage = error?.message || '';
    const errorName = error?.name || '';
    
    const isChunkError = 
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('loading chunk') ||
      errorMessage.includes('dynamic import') ||
      errorName === 'ChunkLoadError' ||
      (errorMessage.includes('Failed to fetch') && errorMessage.includes('assets/'));

    if (isChunkError) {
      try {
        const reloadKey = 'fintrust_chunk_reload_attempt';
        const hasAttempted = sessionStorage.getItem(reloadKey);
        
        if (!hasAttempted) {
          sessionStorage.setItem(reloadKey, 'true');
          console.warn('Vite dynamic import/chunk mismatch error detected. Forcing page reload to sync assets...');
          window.location.reload();
          return;
        }
      } catch (e) {
        console.error('Failed to handle auto-reload flag:', e);
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            minHeight: '100vh', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', bgcolor: 'background.default', p: 3 
          }}
          role="alert"
          aria-live="assertive"
        >
          <Card sx={{ 
            maxWidth: 480, width: '100%', borderRadius: 3, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
          }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
              <Box sx={{ 
                width: 64, height: 64, borderRadius: '50%', 
                bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(255,180,171,0.1)' : '#fee2e2', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                mx: 'auto', mb: 3 
              }}>
                <WarningAmberRoundedIcon sx={{ fontSize: 32, color: 'error.main' }} />
              </Box>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                System Error Detected
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                An unexpected error occurred in the dashboard module. The issue has been logged. Please try reloading the page.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                onClick={() => {
                  try {
                    sessionStorage.removeItem('fintrust_chunk_reload_attempt');
                  } catch (e) {}
                  window.location.reload();
                }} 
                aria-label="Reload dashboard to recover from error"
                sx={{ py: 1.5 }}
              >
                Reload Dashboard
              </Button>
              {this.state.error && (
                <Box sx={{ 
                  mt: 3, p: 2, 
                  bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f1f5f9', 
                  borderRadius: 2, textAlign: 'left', overflowX: 'auto' 
                }}>
                  <Typography variant="caption" color="error.main" sx={{ fontFamily: 'monospace' }}>
                    {this.state.error.message}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}
