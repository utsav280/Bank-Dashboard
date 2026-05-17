import React from 'react';
import {
  Box, Typography, Card, CardContent, ToggleButtonGroup, ToggleButton, alpha, useTheme
} from '@mui/material';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setTheme } from '../../theme/themeSlice';
import { cardStyle } from './SettingsConstants';

const AppearanceCard: React.FC = () => {
  const mode = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08), p: 1, borderRadius: 2, display: 'flex' }}>
            <BrushRoundedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
          </Box>
          <Typography variant="h6" fontWeight={800} color="text.primary">Appearance</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={0.25}>Interface Theme</Typography>
            <Typography variant="caption" color="text.secondary">Customize your display.</Typography>
          </Box>
          <ToggleButtonGroup
            exclusive
            value={mode}
            onChange={(_, v) => v && dispatch(setTheme(v))}
            size="small"
            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04), p: 0.5, borderRadius: 2 }}
          >
            <ToggleButton value="light" sx={{ 
              fontSize: '0.75rem', px: 2, py: 0.75, textTransform: 'none', fontWeight: 600, borderRadius: 1.5, border: 'none', 
              '&.Mui-selected': { 
                bgcolor: isDark ? '#353434' : 'white', 
                color: isDark ? '#e5e2e1' : '#001E3C', 
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.05)' 
              } 
            }}>
              Light
            </ToggleButton>
            <ToggleButton value="dark" sx={{ 
              fontSize: '0.75rem', px: 2, py: 0.75, textTransform: 'none', fontWeight: 600, borderRadius: 1.5, border: 'none', 
              '&.Mui-selected': { 
                bgcolor: isDark ? 'primary.main' : '#001E3C', 
                color: isDark ? '#141313' : 'white', 
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.15)' 
              } 
            }}>
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AppearanceCard;
