import React from 'react';
import { Chip, alpha, useTheme } from '@mui/material';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const theme = useTheme();

  const getStatusStyle = () => {
    switch (status) {
      case 'Completed':
        return { 
          bgcolor: alpha(theme.palette.success.main, 0.12), 
          color: theme.palette.success.main 
        };
      case 'Pending':
        return { 
          bgcolor: alpha(theme.palette.warning.main, 0.12), 
          color: theme.palette.warning.main 
        };
      case 'Processing':
        return { 
          bgcolor: alpha(theme.palette.info.main, 0.12), 
          color: theme.palette.info.main 
        };
      case 'Flagged':
        return { 
          bgcolor: alpha(theme.palette.error.main, 0.12), 
          color: theme.palette.error.main 
        };
      case 'Failed':
        return { 
          bgcolor: alpha(theme.palette.error.main, 0.12), 
          color: theme.palette.error.main 
        };
      default:
        return { 
          bgcolor: alpha(theme.palette.text.secondary, 0.08), 
          color: theme.palette.text.secondary 
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        fontWeight: 700,
        fontSize: '0.62rem',
        borderRadius: 99,
        height: 20,
        ...statusStyle,
      }}
    />
  );
};

export default StatusBadge;
