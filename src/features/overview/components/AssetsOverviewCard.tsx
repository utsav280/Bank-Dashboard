import React from 'react';
import { Box, Typography, Card, CardContent, Chip, alpha, useTheme } from '@mui/material';
import { BarChart, Bar, ResponsiveContainer, Tooltip as ReTooltip, Cell, Brush, XAxis } from 'recharts';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { cardSx } from './OverviewConstants';
import { ANALYTICS_DATA } from '../../../mock/analytics';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <Box sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        p: 1.5,
        borderRadius: 2,
        boxShadow: (t) => t.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.6)' : '0 8px 24px rgba(0,30,60,0.08)',
      }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography variant="body2" fontWeight={800} color="text.primary">
            ₹{Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block', fontSize: '0.65rem', fontWeight: 600 }}>
          Institutional Assets
        </Typography>
      </Box>
    );
  }
  return null;
};

const AssetsOverviewCard: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const primaryColor = theme.palette.primary.main;
  const accentColor = isDark ? theme.palette.primary.light : '#66B2FF';

  return (
    <Card sx={{ ...cardSx, height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase" letterSpacing={0.8}>
              Total Institutional Assets
            </Typography>
            <Typography variant="h3" fontWeight={800} color="text.primary" mt={0.75} sx={{ fontVariantNumeric: 'tabular-nums', fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
              ₹12,482,904.32
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.5, mt: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: primaryColor }} />
                <Typography variant="caption" fontWeight={600} color="text.primary">Core Assets</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: alpha(accentColor, 0.5) }} />
                <Typography variant="caption" fontWeight={600} color="text.secondary">Secondary Holdings</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Chip 
              icon={<TrendingUpRoundedIcon style={{ fontSize: 12, color: isDark ? '#4ade80' : '#22c55e' }} />} 
              label="+2.4%"
              size="small" 
              sx={{ 
                bgcolor: (t) => alpha(t.palette.success.main, 0.1), 
                color: 'success.main', 
                fontWeight: 700, 
                fontSize: '0.75rem', 
                borderRadius: 99, 
                height: 22 
              }} 
            />
            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>vs last month</Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, mt: 3, minHeight: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ANALYTICS_DATA.overviewBarData} barCategoryGap="5%" margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" hide />
              <ReTooltip
                content={<CustomTooltip />}
                cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,30,60,0.03)' }}
              />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {ANALYTICS_DATA.overviewBarData.map((_, i) => (
                  <Cell key={i} fill={(i === 5 || i === 10) ? primaryColor : alpha(accentColor, 0.4)} />
                ))}
              </Bar>
              <Brush dataKey="month" height={20} stroke={isDark ? '#444748' : '#cbd5e1'} fill={isDark ? '#141313' : '#f8fafc'} travellerWidth={10} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography variant="caption" color="text.disabled" fontWeight={600}>Jun 2025</Typography>
          <Typography variant="caption" color="text.disabled" fontWeight={600}>Apr 2026</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssetsOverviewCard;
