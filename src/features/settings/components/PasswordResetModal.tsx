import React, { useState } from 'react';
import {
  Typography, Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, InputAdornment, Stack
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import { PRIMARY } from './SettingsConstants';

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [showPwd, setShowPwd] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSavePassword = () => {
    if (passwords.new !== passwords.confirm) {
      enqueueSnackbar('New passwords do not match.', { 
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
    enqueueSnackbar('Password updated successfully.', { 
      variant: 'success', 
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' } 
    });
    onClose();
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" fontWeight={800} color="text.primary">Reset Password</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Stack spacing={2.5} mt={1}>
          <TextField 
            label="Current Password" 
            type={showPwd ? 'text' : 'password'}
            fullWidth 
            size="medium"
            value={passwords.current}
            onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPwd(!showPwd)} edge="end" size="small">
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            label="New Password" 
            type={showPwd ? 'text' : 'password'}
            fullWidth 
            size="medium"
            value={passwords.new}
            onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            label="Confirm New Password" 
            type={showPwd ? 'text' : 'password'}
            fullWidth 
            size="medium"
            value={passwords.confirm}
            onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600, borderRadius: 2 }}>
          Cancel
        </Button>
        <Button onClick={handleSavePassword} variant="contained" sx={{ fontWeight: 700, borderRadius: 2, px: 3 }}>
          Update Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordResetModal;
