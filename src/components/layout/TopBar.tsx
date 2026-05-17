import React from 'react';
import {
  AppBar, Toolbar, InputBase, Box, IconButton,
  Avatar, Badge, alpha, Tooltip, Typography,
  Popover, List, ListItem, ListItemText, ListItemIcon, Button, ListItemButton
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggleTheme } from '../../features/theme/themeSlice';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../../mock/transactions';
import { ClickAwayListener, Paper, Divider } from '@mui/material';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Wire Transfer Successful', desc: '₹12,480 sent to AWS Cloud.', time: '10 mins ago', type: 'success', unread: true },
  { id: 2, title: 'Action Required', desc: 'Approve pending payroll batch.', time: '1 hour ago', type: 'warning', unread: true },
  { id: 3, title: 'System Update', desc: 'Scheduled maintenance at 02:00 AM.', time: '3 hours ago', type: 'info', unread: true },
  { id: 4, title: 'Login Detected', desc: 'New login from unknown IP.', time: 'Yesterday', type: 'warning', unread: false },
];

const SIDEBAR_WIDTH = 220;

interface TopBarProps {
  placeholder?: string;
  isMobile: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ placeholder = 'Search accounts or files...', isMobile }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const mode = useAppSelector((s) => s.theme.mode);
  
  const navigate = useNavigate();
  
  const [notifAnchorEl, setNotifAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => n.unread).length;
  
  // Search State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  
  const searchResults = React.useMemo(() => {
    if (!searchQuery) return { txs: [], pages: [] };
    const q = searchQuery.toLowerCase();
    
    const pages = [
      { title: 'Overview', path: '/', icon: <GridViewRoundedIcon fontSize="small" /> },
      { title: 'Transactions', path: '/transactions', icon: <ReceiptLongRoundedIcon fontSize="small" /> },
      { title: 'Payments', path: '/payments', icon: <InfoRoundedIcon fontSize="small" /> },
      { title: 'Analytics', path: '/analytics', icon: <InfoRoundedIcon fontSize="small" /> },
      { title: 'Settings', path: '/settings', icon: <InfoRoundedIcon fontSize="small" /> },
    ].filter(p => p.title.toLowerCase().includes(q));

    const txs = MOCK_TRANSACTIONS.filter((t) => 
      t.description.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q)
    ).slice(0, 4);

    return { txs, pages };
  }, [searchQuery]);

  const handleNotifClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };
  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getNotifIcon = (type: string) => {
    if (type === 'success') return <CheckCircleRoundedIcon sx={{ color: 'success.main', fontSize: 20 }} />;
    if (type === 'warning') return <WarningRoundedIcon sx={{ color: 'warning.main', fontSize: 20 }} />;
    return <InfoRoundedIcon sx={{ color: 'info.main', fontSize: 20 }} />;
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      component="header"
      role="banner"
      sx={{
        left: isMobile ? 0 : SIDEBAR_WIDTH,
        width: isMobile ? '100%' : `calc(100% - ${SIDEBAR_WIDTH}px)`,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        zIndex: 99,
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: '56px !important', px: { xs: 2, sm: 3 } }}>
        {/* Search */}
        <ClickAwayListener onClickAway={() => setShowSearch(false)}>
          <Box
            component="search"
            role="search"
            aria-label="Site search"
            sx={{
              flex: 1,
              position: 'relative',
              maxWidth: { xs: '100%', sm: 400 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: (t) => t.palette.mode === 'dark' ? alpha('#fff', 0.04) : '#f1f5f9',
                border: '1px solid',
                borderColor: 'divider',
                px: 1.5,
                py: 0.75,
                width: '100%',
                borderRadius: 1,
              }}
            >
              <SearchRoundedIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
              <InputBase
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(!!e.target.value); }}
                onFocus={() => { if (searchQuery) setShowSearch(true); }}
                inputProps={{ 'aria-label': placeholder, id: 'topbar-search' }}
                sx={{ fontSize: '0.82rem', flex: 1, '& input': { p: 0, minWidth: 0 } }}
              />
            </Box>

            {/* Search Dropdown */}
            {showSearch && (searchResults.txs.length > 0 || searchResults.pages.length > 0) && (
              <Paper
                elevation={8}
                sx={{
                  position: 'absolute', top: '100%', left: 0, right: 0, mt: 1,
                  maxHeight: 400, overflowY: 'auto', zIndex: 120,
                  borderRadius: 2, border: '1px solid', borderColor: 'divider',
                }}
              >
                <List sx={{ p: 0 }}>
                  {searchResults.pages.length > 0 && (
                    <Box>
                      <Typography variant="overline" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary', fontWeight: 700 }}>Pages</Typography>
                      {searchResults.pages.map((p) => (
                        <ListItemButton key={p.path} onClick={() => { navigate(p.path); setShowSearch(false); setSearchQuery(''); }}>
                          <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>{p.icon}</ListItemIcon>
                          <ListItemText primary={p.title} primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
                        </ListItemButton>
                      ))}
                    </Box>
                  )}
                  {searchResults.pages.length > 0 && searchResults.txs.length > 0 && <Divider />}
                  {searchResults.txs.length > 0 && (
                    <Box>
                      <Typography variant="overline" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary', fontWeight: 700 }}>Transactions</Typography>
                      {searchResults.txs.map((tx) => (
                        <ListItemButton key={tx.id} onClick={() => { navigate('/transactions'); setShowSearch(false); setSearchQuery(''); }}>
                          <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                            <ReceiptLongRoundedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={tx.description} 
                            secondary={`Ref: ${tx.reference} · $${tx.amount.toLocaleString()}`}
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                            secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                          />
                        </ListItemButton>
                      ))}
                    </Box>
                  )}
                </List>
              </Paper>
            )}
          </Box>
        </ClickAwayListener>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Notifications">
            <IconButton 
              size="small" 
              onClick={handleNotifClick}
              aria-label={`View notifications — ${unreadCount} unread`}
              sx={{ color: 'text.secondary' }}
            >
              <Badge badgeContent={unreadCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 16, height: 16 } }}>
                <NotificationsNoneRoundedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton 
              size="small" 
              onClick={() => dispatch(toggleTheme())} 
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{ color: 'text.secondary' }}
            >
              {mode === 'dark'
                ? <LightModeRoundedIcon fontSize="small" />
                : <DarkModeRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Help center">
            <IconButton 
              size="small" 
              aria-label="Open help center"
              sx={{ color: 'text.secondary' }}
            >
              <HelpOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* User */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
                {user?.name}
              </Typography>
              <Typography sx={{ fontSize: 10, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {user?.jobTitle}
              </Typography>
            </Box>
            <Avatar 
              src={user?.avatar} 
              alt={user?.name ? `${user.name}'s avatar` : 'User avatar'}
              sx={{ width: 32, height: 32, bgcolor: (t) => t.palette.mode === 'dark' ? alpha('#fff', 0.1) : '#e2e8f0' }} 
            />
          </Box>
        </Box>
      </Toolbar>

      {/* Notifications Popover */}
      <Popover
        open={Boolean(notifAnchorEl)}
        anchorEl={notifAnchorEl}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 340, borderRadius: 2, mt: 1, boxShadow: (t) => t.palette.mode === 'dark' ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)' }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={700}>Notifications</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={markAllRead} sx={{ fontSize: '0.75rem', fontWeight: 600 }}>Mark all read</Button>
          )}
        </Box>
        <List sx={{ p: 0, maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">No new notifications</Typography>
            </Box>
          ) : (
            notifications.map((n) => (
              <ListItem 
                key={n.id} 
                sx={{ 
                  py: 1.5, px: 2, 
                  borderBottom: '1px solid', borderColor: 'divider',
                  bgcolor: n.unread ? (mode === 'dark' ? alpha('#adc6ff', 0.05) : alpha('#001E3C', 0.03)) : 'transparent',
                  display: 'flex', alignItems: 'flex-start',
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>{getNotifIcon(n.type)}</ListItemIcon>
                <ListItemText
                  primary={n.title}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.primary" sx={{ display: 'block', mt: 0.25 }}>{n.desc}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{n.time}</Typography>
                    </React.Fragment>
                  }
                  primaryTypographyProps={{ variant: 'body2', fontWeight: n.unread ? 700 : 600 }}
                />
                {n.unread && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />}
              </ListItem>
            ))
          )}
        </List>
        <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Button fullWidth size="small" sx={{ fontWeight: 600, textTransform: 'none' }}>View All Activity</Button>
        </Box>
      </Popover>
    </AppBar>
  );
};

export default TopBar;
