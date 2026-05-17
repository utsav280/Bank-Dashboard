import React from 'react';
import {
  Box, Typography, Card, CardContent, Button, alpha
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useSnackbar } from 'notistack';
import { ERROR, cardStyle } from './SettingsConstants';

const DangerZoneCard: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDeactivate = () => {
    enqueueSnackbar('Deactivation request submitted to admin.', { 
      variant: 'error', 
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' } 
    });
  };

  return (
    <Card sx={{ ...cardStyle, borderColor: alpha(ERROR, 0.2), bgcolor: alpha(ERROR, 0.02) }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box sx={{ bgcolor: alpha(ERROR, 0.1), p: 1, borderRadius: 2, display: 'flex' }}>
            <WarningAmberRoundedIcon sx={{ color: ERROR, fontSize: 22 }} />
          </Box>
          <Typography variant="h6" fontWeight={800} color={ERROR}>Danger Zone</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
            Temporarily disable your institutional access. All pending transactions will remain active, but you will not be able to log in.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          color="error" 
          size="medium" 
          onClick={handleDeactivate} 
          sx={{ width: '100%', fontWeight: 700, borderRadius: 2, py: 1, borderColor: alpha(ERROR, 0.3), '&:hover': { bgcolor: alpha(ERROR, 0.05) } }}
        >
          Request Deactivation
        </Button>
      </CardContent>
    </Card>
  );
};

export default DangerZoneCard;
