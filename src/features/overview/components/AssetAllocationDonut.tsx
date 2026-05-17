import React from 'react';
import { Box, Typography, Card, CardContent, Stack, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts';
import { cardSx } from './OverviewConstants';

const TOTAL_ASSETS_VAL = 12482904.32;

const CustomAllocationTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const pct = data.value;
    const calculatedVal = (pct / 100) * TOTAL_ASSETS_VAL;
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
          {data.name} Allocation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: payload[0].payload.color || 'primary.main' }} />
          <Typography variant="body2" fontWeight={800} color="text.primary">
            {pct}%
          </Typography>
        </Box>
        <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>
          Valuation: ₹{Math.round(calculatedVal).toLocaleString('en-IN')}
        </Typography>
      </Box>
    );
  }
  return null;
};

const AssetAllocationDonut: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const ALLOCATION = [
    { label: 'Equities', pct: '65%', color: isDark ? '#66B2FF' : '#001E3C' },
    { label: 'Fixed Income', pct: '25%', color: isDark ? '#99CCFF' : '#c7d9f0' },
    { label: 'Cash & Equiv.', pct: '10%', color: isDark ? 'rgba(153, 204, 255, 0.2)' : '#e8ecf0' },
  ];

  return (
    <Card sx={{ ...cardSx, height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.8} color="text.secondary">
          Asset Allocation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2.5 }}>
          <Box sx={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATION.map(a => ({ name: a.label, value: parseFloat(a.pct), color: a.color }))}
                  cx="50%" cy="50%"
                  innerRadius={38} outerRadius={52}
                  dataKey="value" startAngle={90} endAngle={-270} stroke="none"
                >
                  {ALLOCATION.map((a, i) => <Cell key={i} fill={a.color} />)}
                </Pie>
                <ReTooltip 
                  content={<CustomAllocationTooltip />} 
                  wrapperStyle={{ zIndex: 1000 }} 
                  position={{ x: 120, y: -20 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              zIndex: 1,
              pointerEvents: 'none'
            }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.primary' }}>Total</Typography>
            </Box>
          </Box>
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            {ALLOCATION.map((a) => (
              <Box key={a.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: a.color, flexShrink: 0 }} />
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>{a.label}</Typography>
                </Box>
                <Typography variant="caption" fontWeight={800} color="text.primary">{a.pct}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssetAllocationDonut;
