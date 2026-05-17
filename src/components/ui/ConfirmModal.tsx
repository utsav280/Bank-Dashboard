import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider, Stack, useTheme, alpha,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  amount?: string;
  recipient?: string;
  reference?: string;
  networkFee?: string;
  totalDebit?: string;
  confirmLabel?: string;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open, onClose, onConfirm,
  title = 'Irreversible Action',
  amount, recipient, reference,
  networkFee = '₹12.50',
  totalDebit,
  confirmLabel = 'Authorize Payment',
  isLoading = false,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', m: 2 } }}
    >
      {/* Header */}
      <Box sx={{ 
        bgcolor: isDark ? alpha(theme.palette.error.main, 0.08) : '#fff5f5', 
        pt: 3, pb: 2, px: 3, 
        display: 'flex', alignItems: 'center', gap: 1.5, 
        borderBottom: '1px solid', borderColor: 'divider' 
      }}>
        <WarningAmberRoundedIcon sx={{ color: 'error.main', fontSize: 28 }} />
        <Typography id="confirm-dialog-title" variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Typography id="confirm-dialog-description" variant="body1" color="text.primary" mb={3} sx={{ lineHeight: 1.5 }}>
          You are about to authorize an external transfer of{' '}
          <strong>{amount}</strong> to <strong>{recipient}</strong>.
        </Typography>

        {/* Details Box */}
        <Box sx={{ 
          bgcolor: isDark ? alpha('#fff', 0.03) : '#f1f5f9', 
          borderRadius: 1.5, p: 2.5, mb: 3 
        }}>
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>Reference:</Typography>
              <Typography variant="body2" fontWeight={700} color="text.primary">{reference || 'Q3 INVOICE #8821'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>Network Fee:</Typography>
              <Typography variant="body2" fontWeight={700} color="text.primary">{networkFee}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>Total Debit:</Typography>
              <Typography variant="body2" fontWeight={800} color="text.primary">{totalDebit || amount}</Typography>
            </Box>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.5 }}>
          By clicking confirm, you acknowledge that this transaction cannot be cancelled once initiated on the SWIFT network.
        </Typography>
      </DialogContent>

      {/* Footer */}
      <Box sx={{ 
        bgcolor: isDark ? alpha('#fff', 0.02) : '#f8fafc', 
        p: 3, borderTop: '1px solid', borderColor: 'divider' 
      }}>
        <Stack direction="row" spacing={1.5}>
          <Button onClick={onClose} variant="outlined" fullWidth disabled={isLoading}
            sx={{ 
              borderColor: 'divider', 
              color: 'text.primary', 
              bgcolor: isDark ? 'transparent' : '#fff', 
              '&:hover': { bgcolor: isDark ? alpha('#fff', 0.04) : '#f1f5f9' }, 
              py: 1.25, fontWeight: 700 
            }}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" fullWidth disabled={isLoading}
            sx={{ py: 1.25, fontWeight: 700, boxShadow: 'none' }}
          >
            {isLoading ? 'Processing…' : confirmLabel}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ConfirmModal;
