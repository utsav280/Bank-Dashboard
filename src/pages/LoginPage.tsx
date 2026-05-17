import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, InputAdornment, IconButton, alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { mockLogin, clearError } from '../features/auth/authSlice';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@fintrust.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await (dispatch as any)(mockLogin(email.trim(), password));
    if (ok) navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box sx={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -200, left: -200,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{
            width: 52, height: 52, bgcolor: '#001E3C', borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 2,
          }}>
            <LockRoundedIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography variant="h5" fontWeight={800} color="white" gutterBottom>
            FinTrust
          </Typography>
          <Typography variant="body2" color={alpha('#fff', 0.5)}>
            Institutional Banking Portal
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3, boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6" fontWeight={700} mb={0.5}>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter your institutional credentials to continue.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {error && (
                  <Alert severity="error" sx={{ borderRadius: 2, fontSize: '0.82rem' }}>
                    {error}
                  </Alert>
                )}
                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  size="small"
                  autoComplete="email"
                />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  size="small"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPassword((s) => !s)} edge="end">
                          {showPassword
                            ? <VisibilityOffRoundedIcon fontSize="small" />
                            : <VisibilityRoundedIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                  sx={{ mt: 1, py: 1.25 }}
                >
                  {isLoading ? 'Authenticating…' : 'Sign In to Portal'}
                </Button>
              </Box>
            </form>

            {/* Demo creds */}
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1}>
                Demo Credentials
              </Typography>
              {[
                { role: 'Admin', email: 'admin@fintrust.in', pass: 'admin123' },
                { role: 'User', email: 'user@fintrust.in', pass: 'user123' },
              ].map((c) => (
                <Box
                  key={c.role}
                  onClick={() => { setEmail(c.email); setPassword(c.pass); }}
                  sx={{
                    cursor: 'pointer', p: 1, borderRadius: 1, mb: 0.5,
                    '&:hover': { bgcolor: alpha('#001E3C', 0.08) },
                    transition: 'background 0.15s',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    <strong>{c.role}:</strong> {c.email} / {c.pass}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
