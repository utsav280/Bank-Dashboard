import React from 'react';
import { Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar, alpha, useTheme } from '@mui/material';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { useNavigate } from 'react-router-dom';
import { cardSx } from './OverviewConstants';

const TX_ICONS: Record<string, React.ReactNode> = {
  'Vanguard Equities Fund': <BusinessRoundedIcon sx={{ fontSize: 18 }} />,
  'AWS Cloud Infrastructure': <CloudQueueRoundedIcon sx={{ fontSize: 18 }} />,
  'Metropolitan Properties': <AccountBalanceRoundedIcon sx={{ fontSize: 18 }} />,
};

const TRANSACTIONS = [
  { id: '1', description: 'Vanguard Equities Fund', sub: 'Dividends Credit', status: 'Completed', date: '24-Oct-2024', amount: 124500, type: 'credit' },
  { id: '2', description: 'AWS Cloud Infrastructure', sub: 'Service Payment', status: 'Pending', date: '23-Oct-2024', amount: 12480, type: 'debit' },
  { id: '3', description: 'Metropolitan Properties', sub: 'Lease Disbursement', status: 'Completed', date: '21-Oct-2024', amount: 850000, type: 'credit' },
];

const RecentTransactionsCard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card sx={{ ...cardSx, mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Typography variant="h6" fontWeight={800}>Recent Transactions</Typography>
          <Button size="small" onClick={() => navigate('/transactions')}
            sx={{ fontSize: '0.78rem', color: 'primary.main', fontWeight: 700, textTransform: 'none' }}>
            View All History
          </Button>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="medium" aria-label="Recent transactions">
            <TableHead>
              <TableRow 
                sx={{ 
                  '& th': { 
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                    color: 'text.secondary', 
                    fontSize: '0.7rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: 1, 
                    fontWeight: 700, 
                    py: 1.5 
                  } 
                }}
              >
                <TableCell>Sender / Recipient</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TRANSACTIONS.map((tx) => (
                <TableRow 
                  key={tx.id} 
                  sx={{ 
                    '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }, 
                    '& td': { borderColor: 'divider', py: 1.75 } 
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: isDark ? alpha(theme.palette.primary.main, 0.1) : '#f1f4f7', 
                          color: isDark ? theme.palette.primary.main : theme.palette.primary.dark, 
                          borderRadius: 1.5, 
                          fontSize: 16 
                        }}
                      >
                        {TX_ICONS[tx.description] || <AccountBalanceRoundedIcon sx={{ fontSize: 18 }} />}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={700} color="text.primary">{tx.description}</Typography>
                        <Typography variant="caption" color="text.secondary">{tx.sub}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={tx.status} size="small"
                      sx={{
                        bgcolor: tx.status === 'Completed' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.text.disabled, 0.1),
                        color: tx.status === 'Completed' ? 'primary.main' : 'text.secondary',
                        fontWeight: 700, fontSize: '0.65rem', borderRadius: 99, height: 20,
                      }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>{tx.date}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={800}
                      color={tx.type === 'credit' ? 'success.main' : 'error.main'}
                      sx={{ fontVariantNumeric: 'tabular-nums' }}>
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;
