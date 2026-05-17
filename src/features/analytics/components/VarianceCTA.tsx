import React from 'react';
import { Box, Typography, Button, useTheme, alpha } from '@mui/material';

const VarianceCTA: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      mt: 4, p: { xs: 3, sm: 4 }, borderRadius: 4,
      bgcolor: isDark ? '#2a2a2a' : '#001E3C', 
      display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between',
      flexDirection: { xs: 'column', sm: 'row' }, gap: 3,
      boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,30,60,0.15)',
      border: isDark ? '1px solid' : 'none',
      borderColor: isDark ? '#444748' : 'transparent',
    }}>
      <Box>
        <Typography variant="h6" color="white" fontWeight={700} mb={0.5}>
          Liquidity is 12% higher than Q2 projections.
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.7)" fontWeight={500}>
          Based on current trajectory, internal yield targets will be met 14 days ahead of schedule.
        </Typography>
      </Box>
      <Button variant="contained" size="large" sx={{ 
        fontSize: '0.85rem', 
        bgcolor: isDark ? '#adc6ff' : 'white', 
        color: isDark ? '#141313' : '#001E3C', 
        '&:hover': { bgcolor: isDark ? alpha('#adc6ff', 0.85) : '#f8fafc' }, 
        px: 4, fontWeight: 700, whiteSpace: 'nowrap' 
      }}>
        Analyze Variance
      </Button>
    </Box>
  );
};

export default VarianceCTA;
