import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { BalanceTrendChart } from './AnalyticsCharts';
import { ChartSkeleton } from '../../../components/ui/Skeletons';
import { cardStyle } from './AnalyticsConstants';

interface BalanceTrendCardProps {
  loading: boolean;
  data: any[];
}

const BalanceTrendCard: React.FC<BalanceTrendCardProps> = ({ loading, data }) => {
  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box mb={4}>
          <Typography variant="h6" fontWeight={800} color="text.primary">Balance Trend</Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Asset valuation across the fiscal quarter.
          </Typography>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          {loading ? <ChartSkeleton height={260} /> : <BalanceTrendChart data={data} />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BalanceTrendCard;
