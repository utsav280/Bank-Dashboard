import React from 'react';
import { Box, Typography, Card, CardContent, Button, alpha, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const TransferInfoCard: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card sx={{ 
      border: '1px solid', 
      borderColor: isDark ? alpha(theme.palette.primary.main, 0.3) : alpha('#001E3C', 0.3), 
      bgcolor: isDark ? alpha(theme.palette.primary.main, 0.06) : alpha('#001E3C', 0.04) 
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
          <InfoOutlinedIcon sx={{ color: 'primary.main', mt: 0.2, fontSize: 20 }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main">Secure Transfer</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5} fontSize="0.8rem">
              Transfers exceeding ₹50,000 require dual approval from your RM within 2 hours.
            </Typography>
          </Box>
        </Box>
        <Button size="small" sx={{ color: 'primary.main', fontSize: '0.78rem', p: 0, textDecoration: 'underline' }}>
          Learn about transfer limits →
        </Button>
      </CardContent>
    </Card>
  );
};

export default TransferInfoCard;
