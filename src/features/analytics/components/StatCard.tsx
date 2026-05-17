import React from 'react';
import { Box, Typography, Card, CardContent, alpha, useTheme } from '@mui/material';
import { MiniSparkline } from './AnalyticsCharts';
import { cardStyle } from './AnalyticsConstants';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  up: boolean;
  color: string;
  spark: number[];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, up, color, spark }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sparkColor = up 
    ? (isDark ? '#adc6ff' : '#0A1929') 
    : (isDark ? '#8e9192' : '#94a3b8');

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1} noWrap>
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={800} mb={3} color="text.primary">{value}</Typography>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <MiniSparkline data={spark.map((v: number) => ({ value: v }))} color={sparkColor} />
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: alpha(color, 0.1), px: 1, py: 0.25, borderRadius: 1 }}>
            <Typography variant="caption" color={color} fontWeight={700} sx={{ fontSize: '0.65rem' }}>
              {change}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
