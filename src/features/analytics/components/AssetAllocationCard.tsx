import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import { DonutChart } from './AnalyticsCharts';
import { ChartSkeleton } from '../../../components/ui/Skeletons';
import { cardStyle } from './AnalyticsConstants';

interface AssetAllocationCardProps {
  loading: boolean;
  data: any[];
}

const AssetAllocationCard: React.FC<AssetAllocationCardProps> = ({ loading, data }) => {
  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight={800} color="text.primary" mb={0.5}>Asset Allocation</Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Diversification by sector.
        </Typography>
        <Box sx={{ mt: 'auto', mb: 2 }}>
          {loading ? <ChartSkeleton height={200} /> : <DonutChart data={data} />}
        </Box>
        <Stack spacing={2} sx={{ mt: 'auto' }}>
          {data.map((a: any) => (
            <Box key={a.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: a.color, flexShrink: 0 }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600}>{a.name}</Typography>
              </Box>
              <Typography variant="caption" fontWeight={800} color="text.primary">{a.value}%</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AssetAllocationCard;
