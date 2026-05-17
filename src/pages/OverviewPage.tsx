import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';
import { useAppDispatch } from '../app/hooks';
import { updateBalance } from '../features/accounts/accountSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';
import { OverviewSkeleton } from '../components/ui/Skeletons';

// Sub-components
import { stagger, item } from '../features/overview/components/OverviewConstants';
import AssetsOverviewCard from '../features/overview/components/AssetsOverviewCard';
import AccountBriefCards from '../features/overview/components/AccountBriefCards';
import RecentTransactionsCard from '../features/overview/components/RecentTransactionsCard';
import AssetAllocationDonut from '../features/overview/components/AssetAllocationDonut';
import MarketMonitoringCard from '../features/overview/components/MarketMonitoringCard';

const OverviewPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const id = setInterval(() => dispatch(updateBalance({ id: 'acc1', delta: Math.round((Math.random() - 0.5) * 20000) })), 30000);
    return () => clearInterval(id);
  }, [dispatch]);

  if (loading) return (
    <AppLayout topBarPlaceholder="Search accounts or files...">
      <OverviewSkeleton />
    </AppLayout>
  );

  return (
    <AppLayout topBarPlaceholder="Search accounts or files...">
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* Page header */}
        <motion.div variants={item}>
          <Box sx={{ 
            display: 'flex', alignItems: { sm: 'center' }, justifyContent: 'space-between', mb: 3, 
            flexDirection: { xs: 'column', sm: 'row' }, gap: 2 
          }}>
            <Box>
              <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.25}>
                Welcome back, portfolio status is current.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<AddRoundedIcon />} 
              onClick={() => navigate('/payments')}
              aria-label="Create new payment transaction"
              sx={{ 
                alignSelf: { xs: 'flex-start' }, 
                px: { xs: 2, sm: 3 }, 
                borderRadius: 1.5, 
                textTransform: 'none', 
                fontWeight: 700,
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.8rem', sm: '0.85rem' },
              }}
            >
              New Transaction
            </Button>
          </Box>
        </motion.div>

        {/* ROW 1: Total Assets + Portfolio cards */}
        <Grid container spacing={3} alignItems="stretch" sx={{ mb: 3 }}>
          <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
            <motion.div variants={item} style={{ width: '100%' }}>
              <AssetsOverviewCard />
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <motion.div variants={item} style={{ width: '100%' }}>
              <AccountBriefCards />
            </motion.div>
          </Grid>
        </Grid>

        {/* ROW 2: Recent Transactions */}
        <motion.div variants={item}>
          <RecentTransactionsCard />
        </motion.div>

        {/* ROW 3: Asset Allocation + Market Monitoring */}
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
            <motion.div variants={item} style={{ width: '100%' }}>
              <AssetAllocationDonut />
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
            <motion.div variants={item} style={{ width: '100%' }}>
              <MarketMonitoringCard />
            </motion.div>
          </Grid>
        </Grid>

      </motion.div>
    </AppLayout>
  );
};

export default OverviewPage;
