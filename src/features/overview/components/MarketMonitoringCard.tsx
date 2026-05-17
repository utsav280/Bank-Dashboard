import React from 'react';
import { Box, Typography, Card, CardContent, Grid, useTheme } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { cardSx } from './OverviewConstants';

const MARKET = [
  { label: 'S&P 500', value: '5,204.1', change: '+1.24%', up: true },
  { label: 'USD/EUR', value: '0.924', change: '-0.05%', up: false },
];

const MarketMonitoringCard: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card sx={{ ...cardSx, height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.8} color="text.secondary">
          Market Monitoring
        </Typography>
        <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
          {MARKET.map((m) => (
            <Grid item xs={6} key={m.label}>
              <Box sx={{ 
                p: 2, 
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#f7fafd', 
                borderRadius: 1.5, 
                border: '1px solid', 
                borderColor: 'divider' 
              }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">{m.label}</Typography>
                <Typography variant="body1" fontWeight={800} mt={0.25} color="text.primary" sx={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mt: 0.5 }}>
                  {m.up
                    ? <TrendingUpRoundedIcon sx={{ fontSize: 11, color: 'success.main' }} />
                    : <TrendingDownRoundedIcon sx={{ fontSize: 11, color: 'error.main' }} />}
                  <Typography variant="caption" fontWeight={700}
                    sx={{ fontSize: '0.65rem', color: m.up ? 'success.main' : 'error.main' }}>
                    {m.change}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" color="text.disabled" display="flex" alignItems="center" gap={0.5} mt={2}>
          <Box component="span" sx={{ fontSize: 10 }}>◷</Box> Data delayed by 15 minutes
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MarketMonitoringCard;
