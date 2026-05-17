import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

// Sub-components
import { TERTIARY, ERROR, SECONDARY, PRIMARY } from '../features/analytics/components/AnalyticsConstants';
import StatCard from '../features/analytics/components/StatCard';
import BalanceTrendCard from '../features/analytics/components/BalanceTrendCard';
import AssetAllocationCard from '../features/analytics/components/AssetAllocationCard';
import IncomeExpenseCard from '../features/analytics/components/IncomeExpenseCard';
import ActiveLogsCard from '../features/analytics/components/ActiveLogsCard';
import VarianceCTA from '../features/analytics/components/VarianceCTA';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30days' | '90days' | '1year'>('30days');
  const resolutionOptions = timeRange === '30days' ? ['daily', 'weekly'] : timeRange === '90days' ? ['weekly', 'monthly'] : ['monthly', 'quarterly'];
  const [resolution, setResolution] = useState<string>('weekly');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Dark-mode safe chart colors
  const donutPrimary = isDark ? '#adc6ff' : SECONDARY;
  const donutSecondary = isDark ? '#4b8eff' : '#334155';
  const donutTertiary = isDark ? '#444748' : TERTIARY;

  useEffect(() => {
    setResolution(timeRange === '30days' ? 'weekly' : timeRange === '90days' ? 'monthly' : 'quarterly');
  }, [timeRange]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, [timeRange, resolution]);

  const currentData = React.useMemo(() => {
    if (timeRange === '30days') {
      return {
        stats: [
          { label: 'Total Liquidity', value: '$42,892,150.00', change: '+1.2%', up: true, color: TERTIARY, spark: [1, 2, 3, 4, 3, 5] },
          { label: 'Net Revenue', value: '$812,400.00', change: '-0.4%', up: false, color: ERROR, spark: [5, 4, 3, 4, 2, 1] },
          { label: 'Capital Outflow', value: '$345,200.00', change: '-2.5%', up: false, color: ERROR, spark: [2, 3, 4, 3, 2, 1] },
          { label: 'Yield Projection', value: '5.24%', change: '+0.1%', up: true, color: TERTIARY, spark: [1, 2, 3, 4, 4, 5] },
        ],
        donut: [
          { name: 'Financial Equities', value: 54, color: donutPrimary },
          { name: 'Infrastructure', value: 30, color: donutSecondary },
          { name: 'Cash Equivalents', value: 16, color: donutTertiary },
        ],
        logs: [
          { id: '1', type: 'success', title: 'Daily Reconciliation', description: 'Domestic clearing synced.', time: '2 MINS AGO', bg: alpha(TERTIARY, 0.1) },
          { id: '2', type: 'warning', title: 'Minor Alert', description: 'Unusual pattern in Sector 2.', time: '1 HOUR AGO', bg: alpha(ERROR, 0.1) },
          { id: '3', type: 'info', title: 'Transfer Pending', description: '$120K outbound.', time: '3 HOURS AGO', bg: alpha('#94a3b8', 0.1) },
        ],
        balanceTrend: [
          { month: 'Day 1', liquidAssets: 20000000, fixedIncome: 15000000 },
          { month: 'Day 6', liquidAssets: 35000000, fixedIncome: 22000000 },
          { month: 'Day 12', liquidAssets: 62000000, fixedIncome: 34000000 },
          { month: 'Day 18', liquidAssets: 78000000, fixedIncome: 41000000 },
          { month: 'Day 24', liquidAssets: 55000000, fixedIncome: 29000000 },
          { month: 'Day 30', liquidAssets: 32000000, fixedIncome: 18000000 },
        ],
        incomePrimary: [
          { month: 'Mon', income: 120000, expense: 80000 },
          { month: 'Tue', income: 150000, expense: 90000 },
          { month: 'Wed', income: 140000, expense: 85000 },
          { month: 'Thu', income: 180000, expense: 95000 },
          { month: 'Fri', income: 160000, expense: 110000 },
        ],
        incomeSecondary: [
          { month: 'Week 1', income: 750000, expense: 460000 },
          { month: 'Week 2', income: 810000, expense: 490000 },
          { month: 'Week 3', income: 790000, expense: 480000 },
          { month: 'Week 4', income: 850000, expense: 510000 },
        ]
      };
    }
    if (timeRange === '90days') {
      return {
        stats: [
          { label: 'Total Liquidity', value: '$45,102,500.00', change: '+3.8%', up: true, color: TERTIARY, spark: [1, 2, 4, 5, 6, 8] },
          { label: 'Net Revenue', value: '$2,510,000.00', change: '+1.5%', up: true, color: TERTIARY, spark: [2, 3, 2, 4, 5, 6] },
          { label: 'Capital Outflow', value: '$1,150,000.00', change: '-4.2%', up: false, color: ERROR, spark: [6, 5, 4, 5, 3, 2] },
          { label: 'Yield Projection', value: '5.41%', change: '+0.5%', up: true, color: TERTIARY, spark: [2, 3, 3, 4, 4, 5] },
        ],
        donut: [
          { name: 'Financial Equities', value: 58, color: donutPrimary },
          { name: 'Infrastructure', value: 26, color: donutSecondary },
          { name: 'Cash Equivalents', value: 16, color: donutTertiary },
        ],
        logs: [
          { id: '1', type: 'success', title: 'Monthly Close', description: 'Books reconciled.', time: '1 DAY AGO', bg: alpha(TERTIARY, 0.1) },
          { id: '2', type: 'warning', title: 'Threshold Exceeded', description: 'Infrastructure spending high.', time: '3 DAYS AGO', bg: alpha(ERROR, 0.1) },
          { id: '3', type: 'info', title: 'New Allocation', description: '$2M to Real Estate.', time: '1 WEEK AGO', bg: alpha('#94a3b8', 0.1) },
        ],
        balanceTrend: [
          { month: 'Week 1', liquidAssets: 15000000, fixedIncome: 10000000 },
          { month: 'Week 3', liquidAssets: 28000000, fixedIncome: 18000000 },
          { month: 'Week 5', liquidAssets: 56000000, fixedIncome: 29000000 },
          { month: 'Week 7', liquidAssets: 85000000, fixedIncome: 45000000 },
          { month: 'Week 9', liquidAssets: 62000000, fixedIncome: 32000000 },
          { month: 'Week 12', liquidAssets: 25000000, fixedIncome: 14000000 },
        ],
        incomePrimary: [
          { month: 'M1 W1', income: 750000, expense: 460000 },
          { month: 'M1 W4', income: 810000, expense: 490000 },
          { month: 'M2 W4', income: 790000, expense: 480000 },
          { month: 'M3 W4', income: 850000, expense: 510000 },
        ],
        incomeSecondary: [
          { month: 'Month 1', income: 3200000, expense: 1800000 },
          { month: 'Month 2', income: 3400000, expense: 1950000 },
          { month: 'Month 3', income: 3600000, expense: 2100000 },
        ]
      };
    }
    return {
      stats: [
        { label: 'Total Liquidity', value: '$52,192,000.00', change: '+14.2%', up: true, color: TERTIARY, spark: [1, 3, 5, 6, 8, 12] },
        { label: 'Net Revenue', value: '$18,122,400.00', change: '+8.9%', up: true, color: TERTIARY, spark: [2, 4, 4, 6, 8, 10] },
        { label: 'Capital Outflow', value: '$8,450,200.00', change: '-1.5%', up: false, color: ERROR, spark: [8, 7, 8, 6, 5, 4] },
        { label: 'Yield Projection', value: '6.12%', change: '+1.4%', up: true, color: TERTIARY, spark: [3, 4, 4, 5, 5, 6] },
      ],
      donut: [
        { name: 'Financial Equities', value: 62, color: donutPrimary },
        { name: 'Infrastructure', value: 25, color: donutSecondary },
        { name: 'Cash Equivalents', value: 13, color: donutTertiary },
      ],
      logs: [
        { id: '1', type: 'success', title: 'Annual Review Complete', description: 'Passed with zero exceptions.', time: '1 MONTH AGO', bg: alpha(TERTIARY, 0.1) },
        { id: '2', type: 'info', title: 'Fund Rebalanced', description: 'Equities increased by 4%.', time: '3 MONTHS AGO', bg: alpha('#94a3b8', 0.1) },
        { id: '3', type: 'info', title: 'Tax Strategy Updated', description: 'Implemented Q2 directives.', time: '6 MONTHS AGO', bg: alpha('#94a3b8', 0.1) },
      ],
      balanceTrend: [
        { month: 'Jan', liquidAssets: 10000000, fixedIncome: 8000000 },
        { month: 'Feb', liquidAssets: 18000000, fixedIncome: 12000000 },
        { month: 'Mar', liquidAssets: 29000000, fixedIncome: 18000000 },
        { month: 'Apr', liquidAssets: 45000000, fixedIncome: 26000000 },
        { month: 'May', liquidAssets: 68000000, fixedIncome: 35000000 },
        { month: 'Jun', liquidAssets: 92000000, fixedIncome: 48000000 },
        { month: 'Jul', liquidAssets: 95000000, fixedIncome: 49000000 },
        { month: 'Aug', liquidAssets: 78000000, fixedIncome: 40000000 },
        { month: 'Sep', liquidAssets: 55000000, fixedIncome: 28000000 },
        { month: 'Oct', liquidAssets: 38000000, fixedIncome: 21000000 },
        { month: 'Nov', liquidAssets: 24000000, fixedIncome: 14000000 },
        { month: 'Dec', liquidAssets: 15000000, fixedIncome: 9000000 },
      ],
      incomePrimary: [
        { month: 'Jan', income: 3000000, expense: 1800000 },
        { month: 'Apr', income: 3300000, expense: 1950000 },
        { month: 'Jul', income: 3600000, expense: 2100000 },
        { month: 'Oct', income: 4000000, expense: 2300000 },
      ],
      incomeSecondary: [
        { month: 'Q1', income: 9000000, expense: 5400000 },
        { month: 'Q2', income: 9900000, expense: 5850000 },
        { month: 'Q3', income: 10800000, expense: 6300000 },
        { month: 'Q4', income: 12000000, expense: 6900000 },
      ]
    };
  }, [timeRange, isDark]);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.22 } } };

  return (
    <AppLayout topBarPlaceholder="Search analytics, logs, or reports...">
      <motion.div variants={stagger} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item}>
          <Box sx={{ display: 'flex', alignItems: { sm: 'center' }, justifyContent: 'space-between', mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>Financial Analytics</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.25}>
                Real-time institutional performance oversight and liquidity metrics.
              </Typography>
            </Box>
            <Button variant="outlined" size="small" startIcon={<CalendarTodayRoundedIcon sx={{ fontSize: 14 }} />}
              onClick={() => setTimeRange(prev => prev === '30days' ? '90days' : prev === '90days' ? '1year' : '30days')}
              aria-label={`Change time range, currently ${timeRange === '30days' ? 'Last 30 Days' : timeRange === '90days' ? 'Last 90 Days' : 'Last 1 Year'}`}
              sx={{ borderColor: 'divider', color: 'text.primary', height: 36, alignSelf: { xs: 'flex-start' }, bgcolor: isDark ? 'transparent' : 'white', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {timeRange === '30days' ? 'Last 30 Days' : timeRange === '90days' ? 'Last 90 Days' : 'Last 1 Year'}
            </Button>
          </Box>
        </motion.div>

        {/* Stat cards */}
        <motion.div variants={item}>
          <Grid container spacing={2.5} mb={4}>
            {currentData.stats.map((s: any) => (
              <Grid item xs={12} sm={6} md={3} key={s.label}>
                <StatCard {...s} />
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Row 1 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <motion.div variants={item} style={{ height: '100%' }}>
              <BalanceTrendCard loading={loading} data={currentData.balanceTrend} />
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div variants={item} style={{ height: '100%' }}>
              <AssetAllocationCard loading={loading} data={currentData.donut} />
            </motion.div>
          </Grid>
        </Grid>

        {/* Row 2 */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <motion.div variants={item} style={{ height: '100%' }}>
              <IncomeExpenseCard 
                loading={loading} 
                data={resolution === resolutionOptions[0] ? currentData.incomePrimary : currentData.incomeSecondary} 
                resolution={resolution}
                resolutionOptions={resolutionOptions}
                setResolution={setResolution}
              />
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div variants={item} style={{ height: '100%' }}>
              <ActiveLogsCard logs={currentData.logs} />
            </motion.div>
          </Grid>
        </Grid>

        {/* Analyze Variance CTA */}
        <motion.div variants={item}>
          <VarianceCTA />
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default AnalyticsPage;
