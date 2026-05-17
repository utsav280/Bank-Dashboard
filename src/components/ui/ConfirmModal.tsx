import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider, Stack, useTheme, alpha, TextField,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
  const [confirmText, setConfirmText] = useState('');

  // Reset typed text each time modal opens/closes
  useEffect(() => {
    if (!open) setConfirmText('');
  }, [open]);

  const isConfirmed = confirmText === 'CONFIRM';

  return (
    <Dialog open={open} onClose={() => !isLoading && onClose()} maxWidth="xs" fullWidth
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', m: 2 } }}
    >
      {/* Header */}
      <Box sx={{
        bgcolor: isDark ? alpha(theme.palette.error.main, 0.1) : '#fff5f5',
        pt: 3, pb: 2, px: 3,
        display: 'flex', alignItems: 'center', gap: 1.5,
        borderBottom: '1px solid', borderColor: isDark ? alpha(theme.palette.error.main, 0.2) : '#fecaca'
      }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2,
          bgcolor: isDark ? alpha(theme.palette.error.main, 0.15) : '#fee2e2',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <WarningAmberRoundedIcon sx={{ color: 'error.main', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography id="confirm-dialog-title" variant="h6" fontWeight={800} color="error.main">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This action cannot be undone once authorized
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Typography id="confirm-dialog-description" variant="body1" color="text.primary" mb={3} sx={{ lineHeight: 1.6 }}>
          You are about to authorize an external transfer of{' '}
          <Box component="span" sx={{ fontWeight: 800, color: 'error.main' }}>{amount}</Box>
          {' '}to{' '}
          <Box component="span" sx={{ fontWeight: 700 }}>{recipient}</Box>.
        </Typography>

        {/* Details Box */}
        <Box sx={{
          bgcolor: isDark ? alpha('#fff', 0.03) : '#f8fafc',
          borderRadius: 2, p: 2.5, mb: 3,
          border: '1px solid', borderColor: 'divider'
        }}>
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>Reference:</Typography>
              <Typography variant="body2" fontWeight={700} color="text.primary">{reference || 'N/A'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>Network Fee:</Typography>
              <Typography variant="body2" fontWeight={700} color="text.primary">{networkFee}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>Total Debit:</Typography>
              <Typography variant="body2" fontWeight={800} color="error.main" sx={{ fontSize: '0.95rem' }}>
                {totalDebit || amount}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Typed Confirmation */}
        <Box sx={{
          bgcolor: isDark ? alpha(theme.palette.warning.main, 0.05) : '#fffbeb',
          border: '1px solid',
          borderColor: isDark ? alpha(theme.palette.warning.main, 0.2) : '#fde68a',
          borderRadius: 2, p: 2, mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <LockOutlinedIcon sx={{ fontSize: 14, color: 'warning.main' }} />
            <Typography variant="caption" color="warning.main" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Authorization Required
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1.5} sx={{ lineHeight: 1.5 }}>
            Type <strong>CONFIRM</strong> below to authorize this irreversible SWIFT transaction.
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Type CONFIRM"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: 2,
                ...(isConfirmed && {
                  borderColor: 'success.main',
                  '& fieldset': { borderColor: 'success.main' },
                }),
              }
            }}
            inputProps={{ 'aria-label': 'Type CONFIRM to authorize payment' }}
          />
        </Box>

        <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic', lineHeight: 1.5, display: 'block' }}>
          Once initiated on the SWIFT network, this transaction cannot be cancelled or reversed.
        </Typography>
      </DialogContent>

      {/* Footer */}
      <Box sx={{
        bgcolor: isDark ? alpha('#fff', 0.02) : '#f8fafc',
        p: 3, borderTop: '1px solid', borderColor: 'divider'
      }}>
        <Stack direction="row" spacing={1.5}>
          <Button
            onClick={() => !isLoading && onClose()}
            variant="outlined"
            fullWidth
            disabled={isLoading}
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
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            fullWidth
            disabled={isLoading || !isConfirmed}
            sx={{
              py: 1.25, fontWeight: 700, boxShadow: 'none',
              '&:not(:disabled)': {
                bgcolor: 'error.main',
                '&:hover': { bgcolor: 'error.dark', boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.4)}` },
              }
            }}
          >
            {isLoading ? 'Processing…' : confirmLabel}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ConfirmModal;
