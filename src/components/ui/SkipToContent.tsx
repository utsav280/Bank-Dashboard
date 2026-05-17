import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Skip-to-content link — invisible until focused via keyboard.
 * Allows keyboard users to bypass repetitive navigation.
 */
const SkipToContent: React.FC = () => (
  <Box
    component="a"
    href="#main-content"
    sx={{
      position: 'fixed',
      top: -100,
      left: 16,
      zIndex: 9999,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      px: 3,
      py: 1.5,
      borderRadius: 1.5,
      textDecoration: 'none',
      fontWeight: 700,
      fontSize: '0.875rem',
      boxShadow: 4,
      transition: 'top 0.2s ease',
      '&:focus': {
        top: 16,
        outline: 'none',
      },
    }}
  >
    Skip to main content
  </Box>
);

export default SkipToContent;
