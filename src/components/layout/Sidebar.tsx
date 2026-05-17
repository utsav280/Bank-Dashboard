import React from 'react';
import {
  Box, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, alpha, Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const NAV_ITEMS = [
  { label: 'Overview', path: '/', icon: <GridViewRoundedIcon fontSize="small" /> },
  { label: 'Transactions', path: '/transactions', icon: <ReceiptLongRoundedIcon fontSize="small" /> },
  { label: 'Payments', path: '/payments', icon: <SendRoundedIcon fontSize="small" /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChartRoundedIcon fontSize="small" /> },
  { label: 'Settings', path: '/settings', icon: <SettingsRoundedIcon fontSize="small" /> },
];

interface SidebarProps {
  width?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ width = 220 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box
      component="aside"
      aria-label="Main navigation"
      sx={{
        width,
        flexShrink: 0,
        bgcolor: (t) => t.palette.mode === 'dark' ? '#0e0e0e' : '#f8fafc',
        borderRight: '1px solid',
        borderColor: 'divider',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        overflowY: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, color: 'primary.main', fontSize: 15, lineHeight: 1.2 }}>
              FinTrust
            </Typography>
            <Typography sx={{ fontSize: 9, color: 'text.secondary', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Institutional Banking
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Nav */}
      <nav aria-label="Primary navigation">
        <List sx={{ px: 1.5, py: 1.5, flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                  sx={{
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 0.9,
                    bgcolor: (t) => isActive 
                      ? (t.palette.mode === 'dark' ? alpha('#adc6ff', 0.08) : '#e8edf8')
                      : 'transparent',
                    '&:hover': { 
                      bgcolor: (t) => isActive 
                        ? (t.palette.mode === 'dark' ? alpha('#adc6ff', 0.12) : '#e8edf8')
                        : 'action.hover' 
                    },
                    transition: 'background 0.15s',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30, color: isActive ? 'primary.main' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        style: {
                          fontSize: '0.85rem',
                          fontWeight: isActive ? 700 : 400,
                          color: 'inherit',
                        }
                      }
                    }}
                    sx={{ color: isActive ? 'primary.main' : 'text.primary' }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>

      {/* Logout */}
      <Box sx={{ px: 2, pb: 2.5 }}>
        <Divider sx={{ mb: 2 }} />
        <ListItemButton
          onClick={handleLogout}
          aria-label="Sign out of account"
          sx={{
            borderRadius: 1.5, px: 1.5, py: 0.75,
            '&:hover': { bgcolor: (t) => alpha(t.palette.error.main, 0.08) },
          }}
        >
          <ListItemIcon sx={{ minWidth: 28, color: 'text.secondary' }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            slotProps={{ primary: { style: { fontSize: '0.8rem', color: 'inherit' } } }}
            sx={{ color: 'text.secondary' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
