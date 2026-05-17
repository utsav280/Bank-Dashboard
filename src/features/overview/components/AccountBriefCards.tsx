import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, alpha, useTheme } from '@mui/material';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { cardSx } from './OverviewConstants';

const AccountBriefCards: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* Primary Operating - Brand Card */}
      <Card 
        sx={{ 
          bgcolor: isDark ? '#2a2a2a' : theme.palette.primary.main, 
          border: isDark ? '1px solid' : 'none', 
          borderColor: isDark ? '#444748' : 'transparent',
          borderRadius: 2, 
          boxShadow: isDark ? 'none' : '0 4px 24px rgba(0,30,60,0.22)', 
          flex: 1 
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: alpha('#66B2FF', 0.18), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountBalanceRoundedIcon sx={{ color: '#66B2FF', fontSize: 18 }} />
            </Box>
            <Chip label="Primary Operating" size="small"
              sx={{ bgcolor: alpha('#66B2FF', 0.15), color: '#fff', fontSize: '0.62rem', fontWeight: 700, borderRadius: 99, height: 20 }} />
          </Box>
          <Box sx={{ mt: 'auto', pt: 3 }}>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.55), fontWeight: 600, display: 'block' }}>Cash Liquidity</Typography>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mt: 0.5, fontVariantNumeric: 'tabular-nums' }}>₹3,205,100</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: `1px solid ${alpha('#fff', 0.12)}` }}>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.55) }}>Next audit in 12 days</Typography>
            <ArrowForwardIosRoundedIcon sx={{ color: alpha('#fff', 0.4), fontSize: 11 }} />
          </Box>
        </CardContent>
      </Card>

      {/* Securities Portfolio */}
      <Card sx={{ ...cardSx, flex: 1 }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#f1f4f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GridViewRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
            </Box>
            <Typography variant="caption" color="text.primary" fontWeight={700}>Securities Portfolio</Typography>
          </Box>
          <Box sx={{ mt: 'auto', pt: 3 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Market Value</Typography>
            <Typography variant="h4" fontWeight={800} color="text.primary" mt={0.5} sx={{ fontVariantNumeric: 'tabular-nums' }}>₹8,942,000</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <WarningAmberRoundedIcon sx={{ fontSize: 13, color: 'error.main' }} />
              <Typography variant="caption" color="error.main" fontWeight={700}>Exposure Limit Alert</Typography>
            </Box>
            <ArrowForwardIosRoundedIcon sx={{ color: 'text.disabled', fontSize: 11 }} />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AccountBriefCards;
