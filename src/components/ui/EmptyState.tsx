import React from 'react';
import { Box, Typography, Button, alpha, useTheme } from '@mui/material';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import CloudOffRoundedIcon from '@mui/icons-material/CloudOffRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

type EmptyVariant = 'no-results' | 'empty' | 'error' | 'offline';

interface EmptyStateProps {
  variant?: EmptyVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

const VARIANT_CONFIG: Record<EmptyVariant, { icon: React.ElementType; defaultTitle: string; defaultDesc: string; color: string }> = {
  'no-results': {
    icon: SearchOffRoundedIcon,
    defaultTitle: 'No results found',
    defaultDesc: 'Try adjusting your filters or search terms to find what you\'re looking for.',
    color: 'warning.main',
  },
  'empty': {
    icon: InboxRoundedIcon,
    defaultTitle: 'Nothing here yet',
    defaultDesc: 'This section is empty. Items will appear here once they\'re available.',
    color: 'info.main',
  },
  'error': {
    icon: ErrorOutlineRoundedIcon,
    defaultTitle: 'Something went wrong',
    defaultDesc: 'We encountered an unexpected error. Please try again or contact support if the issue persists.',
    color: 'error.main',
  },
  'offline': {
    icon: CloudOffRoundedIcon,
    defaultTitle: 'Connection lost',
    defaultDesc: 'Unable to reach the server. Check your network connection and try again.',
    color: 'text.secondary',
  },
};

const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'empty',
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}) => {
  const theme = useTheme();
  const config = VARIANT_CONFIG[variant];
  const IconComponent = config.icon;

  return (
    <Box
      role="status"
      aria-label={title || config.defaultTitle}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: compact ? 4 : 8,
        px: 3,
      }}
    >
      {/* Icon circle */}
      <Box
        sx={{
          width: compact ? 48 : 72,
          height: compact ? 48 : 72,
          borderRadius: '50%',
          bgcolor: (t) => alpha(t.palette.mode === 'dark' ? '#fff' : '#000', 0.04),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: compact ? 1.5 : 2.5,
        }}
      >
        <IconComponent
          sx={{
            fontSize: compact ? 24 : 36,
            color: config.color,
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant={compact ? 'body1' : 'h6'}
        fontWeight={700}
        color="text.primary"
        mb={0.75}
      >
        {title || config.defaultTitle}
      </Typography>

      {/* Description */}
      <Typography
        variant={compact ? 'caption' : 'body2'}
        color="text.secondary"
        sx={{ maxWidth: 360, lineHeight: 1.6 }}
      >
        {description || config.defaultDesc}
      </Typography>

      {/* Action button */}
      {(actionLabel || variant === 'error' || variant === 'offline') && (
        <Button
          variant="outlined"
          size={compact ? 'small' : 'medium'}
          startIcon={variant === 'error' || variant === 'offline' ? <RefreshRoundedIcon /> : undefined}
          onClick={onAction}
          sx={{
            mt: compact ? 2 : 3,
            borderColor: 'divider',
            color: 'text.primary',
            fontWeight: 600,
            borderRadius: 1.5,
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
            },
          }}
        >
          {actionLabel || (variant === 'error' || variant === 'offline' ? 'Try Again' : '')}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
