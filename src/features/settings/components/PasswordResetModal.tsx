import React, { useState } from 'react';
import {
  Typography, Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, InputAdornment, Stack
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Per-field visibility state (more professional than one global toggle)
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleClose = () => {
    setPasswords({ current: '', new: '', confirm: '' });
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    onClose();
  };

  const handleSavePassword = () => {
    if (!passwords.current) {
      enqueueSnackbar('Please enter your current password.', {
        variant: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
      });
      return;
    }
    if (passwords.new.length < 8) {
      enqueueSnackbar('Password must be at least 8 characters.', {
        variant: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
      });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      enqueueSnackbar('New passwords do not match.', {
        variant: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
      });
      return;
    }
    enqueueSnackbar('Password updated successfully.', {
      variant: 'success',
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
    });
    handleClose();
  };

  const VisibilityToggle = ({ show, onToggle, label }: { show: boolean; onToggle: () => void; label: string }) => (
    <InputAdornment position="end">
      <IconButton
        onClick={onToggle}
        edge="end"
        size="small"
        aria-label={show ? `Hide ${label}` : `Show ${label}`}
      >
        {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" fontWeight={800} color="text.primary">Reset Password</Typography>
        <IconButton onClick={handleClose} size="small" aria-label="Close password dialog">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <Stack spacing={2.5} mt={1}>
          <TextField
            label="Current Password"
            type={showCurrent ? 'text' : 'password'}
            fullWidth
            size="medium"
            value={passwords.current}
            onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
            InputProps={{
              endAdornment: (
                <VisibilityToggle
                  show={showCurrent}
                  onToggle={() => setShowCurrent(v => !v)}
                  label="current password"
                />
              )
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            inputProps={{ 'aria-label': 'Current password' }}
          />
          <TextField
            label="New Password"
            type={showNew ? 'text' : 'password'}
            fullWidth
            size="medium"
            value={passwords.new}
            onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
            helperText="Minimum 8 characters"
            InputProps={{
              endAdornment: (
                <VisibilityToggle
                  show={showNew}
                  onToggle={() => setShowNew(v => !v)}
                  label="new password"
                />
              )
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            inputProps={{ 'aria-label': 'New password' }}
          />
          <TextField
            label="Confirm New Password"
            type={showConfirm ? 'text' : 'password'}
            fullWidth
            size="medium"
            value={passwords.confirm}
            onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
            error={!!passwords.confirm && passwords.confirm !== passwords.new}
            helperText={passwords.confirm && passwords.confirm !== passwords.new ? "Passwords do not match" : ""}
            InputProps={{
              endAdornment: (
                <VisibilityToggle
                  show={showConfirm}
                  onToggle={() => setShowConfirm(v => !v)}
                  label="confirm password"
                />
              )
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            inputProps={{ 'aria-label': 'Confirm new password' }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600, borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSavePassword}
          variant="contained"
          sx={{ fontWeight: 700, borderRadius: 2, px: 3 }}
          disabled={!passwords.current || !passwords.new || !passwords.confirm}
        >
          Update Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetModal;
