import React from 'react';
import { Box, Typography, Card, CardContent, Stack, alpha, useTheme } from '@mui/material';
import { MOCK_TRANSACTIONS } from '../../../mock/transactions';
import { useCurrencyFormat } from '../../../hooks/useCurrencyFormat';

const RecentTransfersCard: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { formatCurrency } = useCurrencyFormat();

  // Get the 3 most recent transfers from mock data (debits only)
  const recentTransfers = MOCK_TRANSACTIONS
    .filter(t => t.type === 'debit')
    .slice(0, 4);

  return (
    <Card>
      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={700} textTransform="uppercase" letterSpacing={0.5} color="text.secondary">
            Recent Transfers
          </Typography>
          <Typography variant="caption" sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 600, '&:hover': { textDecoration: 'underline' }}}>
            View All
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          {recentTransfers.map((t, idx) => (
            <Box key={idx} sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              p: 1.5, border: '1px solid', borderColor: 'divider',
              borderRadius: 2,
              bgcolor: isDark ? alpha('#fff', 0.02) : alpha('#000', 0.02),
            }}>
              <Box>
                <Typography variant="body2" fontWeight={600} fontSize="0.82rem">{t.counterparty}</Typography>
                <Typography variant="caption" color="text.secondary">{t.date} · {t.status}</Typography>
              </Box>
              <Typography variant="body2" fontWeight={700} color="text.primary">
                {formatCurrency(t.amount)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecentTransfersCard;
