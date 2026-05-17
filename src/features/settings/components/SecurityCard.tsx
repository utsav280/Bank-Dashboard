import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Divider, Switch, Button, alpha, useTheme
} from '@mui/material';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import { useSnackbar } from 'notistack';
import { cardStyle } from './SettingsConstants';

interface SecurityCardProps {
  onChangePassword: () => void;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ onChangePassword }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [twoFa, setTwoFa] = useState(true);
  const theme = useTheme();

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08), p: 1, borderRadius: 2, display: 'flex' }}>
            <SecurityRoundedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
          </Box>
          <Typography variant="h6" fontWeight={800} color="text.primary">Security</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={0.25}>Two-Factor Auth</Typography>
            <Typography variant="caption" color="text.secondary">SMS or Authenticator App</Typography>
          </Box>
          <Switch 
            checked={twoFa} 
            onChange={(e) => { 
              setTwoFa(e.target.checked); 
              enqueueSnackbar(`Two-Factor Authentication ${e.target.checked ? 'Enabled' : 'Disabled'}`, { 
                variant: e.target.checked ? 'success' : 'warning' 
              }); 
            }} 
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={0.25}>Reset Password</Typography>
            <Typography variant="caption" color="text.secondary">Last changed 42 days ago</Typography>
          </Box>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={onChangePassword} 
            sx={{ borderColor: 'divider', color: 'primary.main', fontSize: '0.75rem', fontWeight: 600, borderRadius: 1.5, px: 2 }}
          >
            Change
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SecurityCard;
