import React, { useState, useRef } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button,
  TextField, Divider, Avatar, Stack, alpha, useTheme
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { updateUser } from '../../auth/authSlice';
import { useSnackbar } from 'notistack';
import { PRIMARY, TERTIARY, cardStyle } from './SettingsConstants';

const PersonalInformationCard: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');

  const isAvatarUrl = user?.avatar?.startsWith('http') || user?.avatar?.startsWith('data:image');

  const handleSaveProfile = () => {
    dispatch(updateUser({ name, email, phone, jobTitle }));
    enqueueSnackbar('Profile updated successfully.', { 
      variant: 'success', 
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' } 
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Avatar = event.target.result as string;
          dispatch(updateUser({ avatar: base64Avatar }));
          enqueueSnackbar('Profile picture uploaded successfully.', { 
            variant: 'success', 
            anchorOrigin: { vertical: 'bottom', horizontal: 'right' } 
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveClick = () => {
    dispatch(updateUser({ avatar: name ? name.substring(0, 2).toUpperCase() : 'U' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    enqueueSnackbar('Profile picture removed.', { 
      variant: 'success', 
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' } 
    });
  };

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" fontWeight={800} color="text.primary">Personal Information</Typography>
          <Button 
            variant="contained" 
            size="small" 
            onClick={handleSaveProfile} 
            sx={{ height: 36, px: 3, fontSize: '0.8rem', fontWeight: 700, borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Update your account details and professional credentials.
        </Typography>

        <Grid container spacing={2.5} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              fullWidth 
              size="medium" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Professional Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              fullWidth 
              size="medium" 
              type="email" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Office Extension" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              fullWidth 
              size="medium" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Job Title" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              fullWidth 
              size="medium" 
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Profile Picture */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />
          <Avatar 
            src={isAvatarUrl ? user?.avatar : undefined}
            sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.2), 
              color: isDark ? theme.palette.primary.main : theme.palette.primary.dark, 
              fontSize: 20, 
              fontWeight: 800 
            }}
          >
            {!isAvatarUrl && user?.avatar}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={0.25}>Profile Picture</Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={1.5} sx={{ fontSize: '0.75rem' }}>
              JPG, GIF or PNG. Max size of 800K
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleUploadClick} 
                sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: 1.5 }}
              >
                Upload New
              </Button>
              <Button 
                variant="text" 
                size="small" 
                onClick={handleRemoveClick} 
                color="error" 
                sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: 1.5 }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
