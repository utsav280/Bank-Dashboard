import React from 'react';
import { Box, Typography, Card, CardContent, ButtonGroup, Button, alpha, useTheme } from '@mui/material';
import { IncomeExpenseChart } from './AnalyticsCharts';
import { ChartSkeleton } from '../../../components/ui/Skeletons';
import { cardStyle } from './AnalyticsConstants';

interface IncomeExpenseCardProps {
  loading: boolean;
  data: any[];
  resolution: string;
  resolutionOptions: string[];
  setResolution: (res: string) => void;
}

const IncomeExpenseCard: React.FC<IncomeExpenseCardProps> = ({ 
  loading, data, resolution, resolutionOptions, setResolution 
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={800} color="text.primary">Income vs Operations</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Comparative analysis of monthly flow.
            </Typography>
          </Box>
          <ButtonGroup size="small" variant="contained" disableElevation>
            {resolutionOptions.map((v) => (
              <Button key={v} onClick={() => setResolution(v)}
                sx={{
                  bgcolor: resolution === v 
                    ? (isDark ? 'primary.main' : '#001E3C') 
                    : (isDark ? 'transparent' : 'white'),
                  color: resolution === v 
                    ? (isDark ? '#141313' : 'white') 
                    : 'text.secondary',
                  border: '1px solid', 
                  borderColor: 'divider',
                  '&:hover': { 
                    bgcolor: resolution === v 
                      ? (isDark ? alpha('#adc6ff', 0.85) : '#001E3C')
                      : (isDark ? alpha('#fff', 0.04) : alpha('#000', 0.02)) 
                  },
                  fontSize: '0.75rem', textTransform: 'capitalize', fontWeight: 600,
                  px: 2
                }}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          {loading ? <ChartSkeleton height={260} /> : <IncomeExpenseChart data={data} />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseCard;
