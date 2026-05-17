import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const NAV_ITEMS = [
  { label: 'Overview', path: '/', icon: <GridViewRoundedIcon /> },
  { label: 'Transactions', path: '/transactions', icon: <ReceiptLongRoundedIcon /> },
  { label: 'Payments', path: '/payments', icon: <SendRoundedIcon /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChartRoundedIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsRoundedIcon /> },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentValue = NAV_ITEMS.findIndex(
    (item) => item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path)
  );

  return (
    <Paper
      component="nav"
      aria-label="Mobile navigation"
      sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        borderTop: '1px solid', borderColor: 'divider',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      }}
      elevation={0}
    >
      <BottomNavigation
        value={currentValue === -1 ? 0 : currentValue}
        onChange={(_, newValue) => navigate(NAV_ITEMS[newValue].path)}
        sx={{ height: 60 }}
      >
        {NAV_ITEMS.map((item, index) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
            aria-label={`Navigate to ${item.label}`}
            aria-current={currentValue === index ? 'page' : undefined}
            sx={{
              fontSize: '0.65rem',
              minWidth: 0,
              '& .MuiBottomNavigationAction-label': { fontSize: '0.62rem' },
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
