import React, { Suspense, lazy } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TopBar from './TopBar';
import SkipToContent from '../ui/SkipToContent';

// Lazy-load non-critical layout components
const Sidebar = lazy(() => import('./Sidebar'));
const BottomNav = lazy(() => import('./BottomNav'));

const SIDEBAR_WIDTH = 220;
const TOPBAR_HEIGHT = 56;

interface AppLayoutProps {
  children: React.ReactNode;
  topBarPlaceholder?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, topBarPlaceholder }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Skip link for keyboard users */}
      <SkipToContent />

      {/* Sidebar — desktop only, lazy loaded */}
      {!isMobile && (
        <Suspense fallback={<Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }} />}>
          <Sidebar width={SIDEBAR_WIDTH} />
        </Suspense>
      )}

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <TopBar placeholder={topBarPlaceholder} isMobile={isMobile} />
        <Box
          component="main"
          id="main-content"
          role="main"
          tabIndex={-1}
          aria-label="Main content"
          sx={{
            flex: 1,
            mt: `${TOPBAR_HEIGHT}px`,
            mb: isMobile ? '60px' : 0,
            p: { xs: 2, sm: 3 },
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
            '&:focus': { outline: 'none' },
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Bottom nav — mobile only, lazy loaded */}
      {isMobile && (
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      )}
    </Box>
  );
};

export default AppLayout;
