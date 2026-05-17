import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent, Grid, alpha, useTheme } from '@mui/material';
import { useCurrencyFormat } from '../../../hooks/useCurrencyFormat';
import { MOCK_TRANSACTIONS } from '../../../mock/transactions';

const TransactionSummaryCards: React.FC = () => {
  const { formatCurrency } = useCurrencyFormat();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const flaggedCount = useMemo(() => MOCK_TRANSACTIONS.filter((t) => t.status === 'Flagged').length, []);
  const pendingCount = useMemo(() => MOCK_TRANSACTIONS.filter((t) => t.status === 'Pending').length, []);
  const totalVolume = useMemo(() => MOCK_TRANSACTIONS.reduce((s, t) => s + t.amount, 0), []);

  const cards = [
    { label: `Total Volume (${MOCK_TRANSACTIONS.length})`, value: formatCurrency(totalVolume), sub: '+2.4% vs last mo.', color: 'text.primary' },
    { label: `Pending Settlement`, value: formatCurrency(MOCK_TRANSACTIONS.filter((t) => t.status === 'Pending').reduce((s, t) => s + t.amount, 0)), sub: `${pendingCount} Active Holds`, color: 'text.primary' },
    { label: 'Flagged Transactions', value: String(flaggedCount).padStart(2, '0'), sub: 'Requires Attention', color: 'error.main', isError: true },
  ];

  return (
    <Grid container spacing={2} mb={3} alignItems="stretch">
      {cards.map((card) => (
        <Grid item xs={12} sm={4} key={card.label}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: isDark ? 'none' : '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
            border: '1px solid',
            borderColor: card.isError 
              ? (isDark ? alpha(theme.palette.error.main, 0.3) : '#fee2e2') 
              : 'divider',
            bgcolor: card.isError 
              ? (isDark ? alpha(theme.palette.error.main, 0.06) : '#fffaf5') 
              : 'background.paper',
            display: 'flex', flexDirection: 'column'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 }, flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase" letterSpacing={0.5}>
                  {card.label}
                </Typography>
                {card.isError && (
                  <Typography variant="caption" color="error" fontWeight={700}>Requires Attention</Typography>
                )}
                {card.sub && !card.isError && (
                  <Typography variant="caption" color="success.main" fontWeight={600}>{card.sub}</Typography>
                )}
              </Box>
              <Typography variant="h4" fontWeight={800} color={card.color} mt={1}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TransactionSummaryCards;
