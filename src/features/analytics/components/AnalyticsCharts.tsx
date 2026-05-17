import React, { memo } from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, Legend, Area, AreaChart, Brush
} from 'recharts';

export const MiniSparkline = memo(({ data, color }: { data: any[], color: string }) => (
  <ResponsiveContainer width={90} height={36}>
    <BarChart data={data} barCategoryGap="10%">
      <Bar dataKey="value" radius={0}>
        {data.map((_, i) => (
          <Cell key={i} fill={i === data.length - 1 ? color : alpha('#94a3b8', 0.3)} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
));

const BalanceTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const liquid = payload[0].value;
    const fixed = payload[1]?.value || 0;
    const total = liquid + fixed;
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
          {label} 2024
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: payload[0].color || 'primary.main' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ flex: 1 }}>Liquid Assets:</Typography>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              ₹{Number(liquid).toLocaleString('en-IN')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: payload[1]?.color || 'secondary.main' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ flex: 1 }}>Fixed Income:</Typography>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              ₹{Number(fixed).toLocaleString('en-IN')}
            </Typography>
          </Box>
          <Box sx={{ my: 0.75, borderBottom: '1px dashed', borderColor: 'divider' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography variant="caption" color="text.primary" fontWeight={700} sx={{ flex: 1 }}>Total Valuation:</Typography>
            <Typography variant="body2" fontWeight={800} color="success.main">
              ₹{Number(total).toLocaleString('en-IN')}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
};

export const BalanceTrendChart = memo(({ data }: { data: any[] }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const lineColor = isDark ? '#adc6ff' : '#001E3C';
  const accentColor = isDark ? '#4b8eff' : '#66B2FF';
  const gridColor = isDark ? '#444748' : '#f1f5f9';
  const axisColor = isDark ? '#8e9192' : '#94a3b8';

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradLiquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.15} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor, fontWeight: 600 }} axisLine={false} tickLine={false} tickMargin={10} />
        <YAxis hide />
        <ReTooltip content={<BalanceTooltip />} />
        <Area type="monotone" dataKey="liquidAssets" name="Liquid Assets" stroke={lineColor} strokeWidth={3} fill="url(#gradLiquid)" dot={false} />
        <Area type="monotone" dataKey="fixedIncome" name="Fixed Income" stroke={accentColor} strokeWidth={2} fill="transparent" strokeDasharray="4 4" dot={false} />
        <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingBottom: 20, fontWeight: 600, color: isDark ? '#e5e2e1' : '#001E3C' }} />
        <Brush dataKey="month" height={20} stroke={isDark ? '#444748' : '#cbd5e1'} fill={isDark ? '#141313' : '#f8fafc'} travellerWidth={10} />
      </AreaChart>
    </ResponsiveContainer>
  );
});

const IncomeExpenseTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const income = payload[0].value;
    const expense = payload[1]?.value || 0;
    const netProfit = income - expense;
    const profitMargin = ((netProfit / income) * 100).toFixed(1);
    const isProfitable = netProfit >= 0;
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
          {label} 2024
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: payload[0].color || 'success.main' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ flex: 1 }}>Total Income:</Typography>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              ₹{Number(income).toLocaleString('en-IN')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: payload[1]?.color || 'error.main' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ flex: 1 }}>Operations Expense:</Typography>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              ₹{Number(expense).toLocaleString('en-IN')}
            </Typography>
          </Box>
          <Box sx={{ my: 0.75, borderBottom: '1px dashed', borderColor: 'divider' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: isProfitable ? 'success.main' : 'error.main' }} />
            <Typography variant="caption" color="text.primary" fontWeight={700} sx={{ flex: 1 }}>Net Profit Margin:</Typography>
            <Typography variant="body2" fontWeight={800} color={isProfitable ? 'success.main' : 'error.main'}>
              ₹{Number(netProfit).toLocaleString('en-IN')} ({profitMargin}%)
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
};

export const IncomeExpenseChart = memo(({ data }: { data: any[] }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const primaryBar = isDark ? '#adc6ff' : '#001E3C';
  const secondaryBar = isDark ? '#444748' : '#cbd5e1';
  const gridColor = isDark ? '#444748' : '#f1f5f9';
  const axisColor = isDark ? '#8e9192' : '#94a3b8';

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barCategoryGap="5%" margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor, fontWeight: 600 }} axisLine={false} tickLine={false} tickMargin={10} />
        <YAxis hide />
        <ReTooltip 
          content={<IncomeExpenseTooltip />}
          cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc' }}
        />
        <Bar dataKey="income" name="Income" fill={primaryBar} radius={0} />
        <Bar dataKey="expense" name="Operations" fill={secondaryBar} radius={0} />
        <Brush dataKey="month" height={20} stroke={isDark ? '#444748' : '#cbd5e1'} fill={isDark ? '#141313' : '#f8fafc'} travellerWidth={10} />
      </BarChart>
    </ResponsiveContainer>
  );
});

const PortfolioTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const pct = data.value;
    const totalLiquidityVal = 42892150;
    const calculatedVal = (pct / 100) * totalLiquidityVal;
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
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: data.color || 'primary.main' }} />
          <Typography variant="body2" fontWeight={800} color="text.primary">
            {pct}% Portfolio
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

export const DonutChart = memo(({ data }: { data: any[] }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', my: 2 }}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={85}
            dataKey="value" startAngle={90} endAngle={-270} stroke="none">
            {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
          </Pie>
          <ReTooltip 
            content={<PortfolioTooltip />} 
            wrapperStyle={{ zIndex: 1000 }} 
            position={{ x: 10, y: 10 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        textAlign: 'center',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <Typography variant="h5" fontWeight={800} color="text.primary">100%</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700, mt: 0.25 }}>Total Portfolio</Typography>
      </Box>
    </Box>
  );
});
