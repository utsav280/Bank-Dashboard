import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, alpha } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { TERTIARY, ERROR, cardStyle } from './AnalyticsConstants';

const LOG_ICONS: Record<string, React.ReactNode> = {
  success: <CheckCircleOutlineRoundedIcon fontSize="small" sx={{ color: TERTIARY }} />,
  warning: <WarningAmberRoundedIcon fontSize="small" sx={{ color: ERROR }} />,
  info: <SwapHorizRoundedIcon fontSize="small" sx={{ color: '#94a3b8' }} />,
};

interface ActiveLogsCardProps {
  logs: any[];
}

const ActiveLogsCard: React.FC<ActiveLogsCardProps> = ({ logs }) => {
  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight={800} color="text.primary" mb={0.5}>Active Logs</Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={4}>
          System-flagged events & reconciliations.
        </Typography>
        <Stack spacing={3} sx={{ mt: 'auto', mb: 4 }}>
          {logs.map((log: any) => (
            <Box key={log.id} sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: 2, flexShrink: 0,
                bgcolor: log.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {LOG_ICONS[log.type]}
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700} color="text.primary" mb={0.25}>{log.title}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.4}>{log.description}</Typography>
                <Typography variant="caption" color="text.disabled" fontWeight={600} sx={{ mt: 1, display: 'block', fontSize: '0.6rem' }}>{log.time}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Button variant="outlined" fullWidth size="small"
          sx={{ borderColor: 'divider', color: 'text.primary', fontWeight: 600, fontSize: '0.8rem', mt: 'auto', py: 1 }}>
          View Audit Trail
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActiveLogsCard;
