import { alpha } from '@mui/material';
import type { Variants } from 'framer-motion';
export const PRIMARY = '#001E3C';
export const ACCENT = '#66B2FF';
export const SURFACE = '#f7fafd';

export const cardSx = {
  bgcolor: 'background.paper',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: (t: any) => t.palette.mode === 'dark' ? 'none' : '0 2px 4px rgba(0,30,60,0.05)',
};

export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
export const item: Variants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } } };
