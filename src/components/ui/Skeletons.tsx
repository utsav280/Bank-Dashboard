import React from 'react';
import { Skeleton, Card, CardContent, Box, Stack, keyframes } from '@mui/material';

/* ── Shimmer animation ─────────────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const shimmerSx = {
  '&::after': {
    content: '""',
    position: 'absolute' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: (t: any) =>
      t.palette.mode === 'dark'
        ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
    backgroundSize: '400px 100%',
    animation: `${shimmer} 1.6s ease-in-out infinite`,
  },
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

/* ── Stat Card Skeleton ────────────────────────────────── */
export const StatCardSkeleton: React.FC = () => (
  <Card sx={{ p: 2, ...shimmerSx }}>
    <Skeleton variant="text" width={120} height={16} sx={{ mb: 1 }} />
    <Skeleton variant="text" width={180} height={36} sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />
  </Card>
);

/* ── Table Skeleton ────────────────────────────────────── */
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 8 }) => (
  <Box>
    {Array.from({ length: rows }).map((_, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={200} sx={{ flex: 1 }} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={80} />
      </Box>
    ))}
  </Box>
);

/* ── Chart Skeleton ────────────────────────────────────── */
export const ChartSkeleton: React.FC<{ height?: number }> = ({ height = 240 }) => (
  <Skeleton variant="rectangular" width="100%" height={height} sx={{ borderRadius: 2, ...shimmerSx }} />
);

/* ── Card Grid Skeleton ────────────────────────────────── */
export const CardGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: `repeat(${count}, 1fr)` }, gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <StatCardSkeleton key={i} />
    ))}
  </Box>
);

/* ── Page Skeleton ─────────────────────────────────────── */
export const PageSkeleton: React.FC = () => (
  <Stack spacing={3}>
    <Box>
      <Skeleton variant="text" width={200} height={36} />
      <Skeleton variant="text" width={320} height={20} />
    </Box>
    <CardGridSkeleton count={4} />
    <Card>
      <CardContent>
        <Skeleton variant="text" width={160} height={24} sx={{ mb: 2 }} />
        <TableSkeleton rows={6} />
      </CardContent>
    </Card>
  </Stack>
);

/* ── Payments Page Skeleton ────────────────────────────── */
export const PaymentFormSkeleton: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
    {/* Left: Form card */}
    <Card sx={{ flex: 1.4, ...shimmerSx }}>
      <CardContent sx={{ p: 3 }}>
        <Skeleton variant="text" width={160} height={28} sx={{ mb: 3 }} />
        <Stack spacing={2.5}>
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 1.5 }} />
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 1.5 }} />
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1.5 }} />
        </Stack>
      </CardContent>
    </Card>
    {/* Right: Info cards */}
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Card sx={shimmerSx}>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width="100%" height={14} sx={{ mt: 0.5 }} />
              <Skeleton variant="text" width="80%" height={14} />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={shimmerSx}>
        <CardContent sx={{ p: 2.5 }}>
          <Skeleton variant="text" width={110} height={20} sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 2 }} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

/* ── Overview Cards Skeleton ───────────────────────────── */
export const OverviewSkeleton: React.FC = () => (
  <Stack spacing={3}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Skeleton variant="text" width={160} height={36} />
        <Skeleton variant="text" width={260} height={18} />
      </Box>
      <Skeleton variant="rectangular" width={160} height={36} sx={{ borderRadius: 1.5 }} />
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
      <Card sx={shimmerSx}><CardContent sx={{ p: 3 }}><Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2 }} /></CardContent></Card>
      <Stack spacing={2}>
        <Card sx={shimmerSx}><CardContent sx={{ p: 2.5 }}><Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} /></CardContent></Card>
        <Card sx={shimmerSx}><CardContent sx={{ p: 2.5 }}><Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} /></CardContent></Card>
      </Stack>
    </Box>
  </Stack>
);
