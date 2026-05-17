import { alpha } from '@mui/material';

export const PRIMARY = '#001E3C';
export const SECONDARY = '#0A1929';
export const TERTIARY = '#66B2FF';
export const ERROR = '#BA1A1A';

export const cardStyle = {
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  boxShadow: (t: any) => t.palette.mode === 'dark' ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
  borderRadius: 3,
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const
};
