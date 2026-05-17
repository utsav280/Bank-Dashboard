import React from 'react';
import {
  Typography, Card, CardContent, useTheme
} from '@mui/material';
import { useAppSelector } from '../../../app/hooks';

const RoleInfoCard: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card sx={{ 
      bgcolor: isDark ? '#2a2a2a' : '#001E3C', 
      borderRadius: 3, 
      boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,30,60,0.15)', 
      border: isDark ? '1px solid' : 'none',
      borderColor: isDark ? '#444748' : 'transparent',
    }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="body1" fontWeight={800} color="white" mb={1}>
          {user?.role === 'admin' ? 'Administrator Access' : 'Standard User Access'}
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.7)" lineHeight={1.6}>
          {user?.role === 'admin'
            ? 'You have full visibility across all accounts and can manage users, roles, and system settings. Ensure you adhere to compliance guidelines.'
            : 'You have read-only access to your assigned accounts. Contact your RM for elevated permissions.'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoleInfoCard;
