import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Avatar, alpha, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';

const RECENT_PAYEES = [
  { id: 'p1', name: 'Global Logistics Solutions Inc.', type: 'External', last: '2 days ago', avatar: 'GL', account: '1092837465' },
  { id: 'p2', name: 'PetroStar Corp.', type: 'External', last: '1 week ago', avatar: 'PS', account: '9876543210' },
];

interface RecentPayeesCardProps {
  onSelect: (name: string, account: string) => void;
}

const RecentPayeesCard: React.FC<RecentPayeesCardProps> = ({ onSelect }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle2" fontWeight={700} mb={2} textTransform="uppercase" letterSpacing={0.5} color="text.secondary">
          Recent Payees
        </Typography>
        <Stack spacing={1.5}>
          {RECENT_PAYEES.map((p) => (
            <Box key={p.id} onClick={() => {
              onSelect(p.name, p.account);
              enqueueSnackbar(`Auto-filled ${p.name}`, { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            }} sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              p: 1.5, border: '1px solid', borderColor: 'divider',
              borderRadius: 2, cursor: 'pointer',
              '&:hover': { 
                bgcolor: isDark ? alpha('#fff', 0.04) : alpha('#001E3C', 0.04), 
                borderColor: 'primary.main' 
              },
              transition: 'all 0.15s',
            }}>
              <Avatar sx={{ 
                width: 36, height: 36, 
                bgcolor: alpha(theme.palette.primary.main, 0.1), 
                color: 'primary.main', 
                fontSize: 12, fontWeight: 700 
              }}>
                {p.avatar}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} fontSize="0.82rem">{p.name}</Typography>
                <Typography variant="caption" color="text.secondary">{p.type} · {p.last}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecentPayeesCard;
