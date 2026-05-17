import { createTheme, alpha } from '@mui/material/styles';

// ── Light Mode Tokens (Financial Design System from Stitch) ──
const PRIMARY = '#001E3C';
const SECONDARY = '#0A1929';
const TERTIARY = '#66B2FF';
const NEUTRAL = '#F3F6F9';

// ── Dark Mode Tokens (Institutional Dark from Stitch) ──
const DARK = {
  surface:                '#141313',
  surfaceDim:             '#141313',
  surfaceBright:          '#3a3939',
  surfaceContainerLowest: '#0e0e0e',
  surfaceContainerLow:    '#1c1b1b',
  surfaceContainer:       '#201f1f',
  surfaceContainerHigh:   '#2a2a2a',
  surfaceContainerHighest:'#353434',
  onSurface:              '#e5e2e1',
  onSurfaceVariant:       '#c4c7c8',
  inverseSurface:         '#e5e2e1',
  inverseOnSurface:       '#313030',
  outline:                '#8e9192',
  outlineVariant:         '#444748',
  surfaceTint:            '#c6c6c7',
  primary:                '#ffffff',
  onPrimary:              '#2f3131',
  primaryContainer:       '#e2e2e2',
  onPrimaryContainer:     '#636565',
  secondary:              '#adc6ff',
  onSecondary:            '#002e69',
  secondaryContainer:     '#4b8eff',
  onSecondaryContainer:   '#00285c',
  error:                  '#ffb4ab',
  onError:                '#690005',
  errorContainer:         '#93000a',
  onErrorContainer:       '#ffdad6',
  background:             '#141313',
  onBackground:           '#e5e2e1',
};

const SIDEBAR_BG = '#ffffff';
const SIDEBAR_HOVER = NEUTRAL;

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY,
      dark: SECONDARY,
      light: TERTIARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: NEUTRAL,
      paper: '#ffffff',
    },
    text: {
      primary: PRIMARY,
      secondary: '#64748b',
    },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    info: { main: TERTIARY },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.02em', color: PRIMARY },
    h2: { fontWeight: 700, letterSpacing: '-0.01em', color: PRIMARY },
    h3: { fontWeight: 700, color: PRIMARY },
    h4: { fontWeight: 600, color: PRIMARY },
    h5: { fontWeight: 600, color: PRIMARY },
    h6: { fontWeight: 600, color: PRIMARY },
    subtitle1: { fontWeight: 500, color: PRIMARY },
    subtitle2: { fontWeight: 500, fontSize: '0.8rem', color: PRIMARY },
    body1: { fontSize: '0.9rem', color: PRIMARY },
    body2: { fontSize: '0.8rem', color: PRIMARY },
    caption: { fontSize: '0.72rem', color: '#64748b' },
  },
  shape: { borderRadius: 10 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04)',
    '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.04)',
    '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.03)',
    '0 25px 50px -12px rgba(0,0,0,0.15)',
    ...Array(19).fill('none'),
  ] as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body { background-color: ${NEUTRAL}; }
        *:focus-visible {
          outline: 2px solid ${TERTIARY};
          outline-offset: 2px;
          border-radius: 4px;
        }
        *:focus:not(:focus-visible) {
          outline: none;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          fontSize: '0.85rem',
        },
        containedPrimary: {
          background: PRIMARY,
          boxShadow: 'none',
          '&:hover': {
            background: SECONDARY,
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          borderColor: '#e2e8f0',
          color: PRIMARY,
          '&:hover': {
            borderColor: PRIMARY,
            background: alpha(TERTIARY, 0.05),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          border: '1px solid #f1f5f9',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: NEUTRAL,
            fontWeight: 700,
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#64748b',
            borderBottom: '1px solid #e2e8f0',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: NEUTRAL,
          },
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.7rem',
          height: 24,
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontSize: '0.875rem',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: PRIMARY,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: PRIMARY,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 99 },
        bar: { borderRadius: 99 },
      },
    },
  },
});

// ── Dark Theme — Stitch "Institutional Dark" exact match ──
export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: 'dark',
    primary: {
      main: DARK.secondary,       // #adc6ff – Trustworthy Blue accent
      dark: '#004493',
      light: '#d8e2ff',
    },
    secondary: {
      main: DARK.secondaryContainer, // #4b8eff
    },
    background: {
      default: DARK.surface,                // #141313  Level 0
      paper: DARK.surfaceContainerLow,      // #1c1b1b  Level 1
    },
    text: {
      primary: DARK.onSurface,              // #e5e2e1
      secondary: DARK.onSurfaceVariant,     // #c4c7c8
    },
    success: { main: '#4ade80' },
    warning: { main: '#fbbf24' },
    error: { main: DARK.error },            // #ffb4ab
    info: { main: DARK.secondary },         // #adc6ff
    divider: DARK.outlineVariant,           // #444748
  },
  typography: {
    ...lightTheme.typography,
    h1: { ...lightTheme.typography.h1, color: DARK.onSurface },
    h2: { ...lightTheme.typography.h2, color: DARK.onSurface },
    h3: { ...lightTheme.typography.h3, color: DARK.onSurface },
    h4: { ...lightTheme.typography.h4, color: DARK.onSurface },
    h5: { ...lightTheme.typography.h5, color: DARK.onSurface },
    h6: { ...lightTheme.typography.h6, color: DARK.onSurface },
    subtitle1: { ...lightTheme.typography.subtitle1, color: DARK.onSurface },
    subtitle2: { ...lightTheme.typography.subtitle2, color: DARK.onSurface },
    body1: { ...lightTheme.typography.body1, color: DARK.onSurface },
    body2: { ...lightTheme.typography.body2, color: DARK.onSurfaceVariant },
    caption: { ...lightTheme.typography.caption, color: DARK.outline },
  },
  components: {
    ...lightTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body { background-color: ${DARK.surface}; }
        *:focus-visible {
          outline: 2px solid ${DARK.secondary};
          outline-offset: 2px;
          border-radius: 4px;
        }
        *:focus:not(:focus-visible) {
          outline: none;
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: DARK.surfaceContainerLow,
          borderBottom: `1px solid ${DARK.outlineVariant}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          fontSize: '0.85rem',
        },
        containedPrimary: {
          background: DARK.primary,           // #ffffff  – high-impact white CTA
          color: DARK.surface,                // #141313
          boxShadow: 'none',
          '&:hover': {
            background: DARK.primaryContainer,  // #e2e2e2
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          borderColor: DARK.outlineVariant,
          color: DARK.onSurface,
          '&:hover': {
            borderColor: DARK.secondary,
            background: alpha(DARK.secondary, 0.08),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          border: `1px solid ${DARK.outlineVariant}`,
          backgroundColor: DARK.surfaceContainerLow,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: DARK.surfaceContainer,  // #201f1f
            fontWeight: 700,
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: DARK.onSurfaceVariant,
            borderBottom: `1px solid ${DARK.outlineVariant}`,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha(DARK.surfaceTint, 0.04),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: DARK.outlineVariant,
          color: DARK.onSurface,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontSize: '0.875rem',
            '& fieldset': {
              borderColor: DARK.outlineVariant,
            },
            '&:hover fieldset': {
              borderColor: DARK.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: DARK.secondary,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: DARK.onSurfaceVariant,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: DARK.onSurfaceVariant,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: DARK.secondary,
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: DARK.secondary,
          },
        },
        track: {
          backgroundColor: DARK.outline,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: DARK.secondary,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: DARK.outlineVariant,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: DARK.surfaceContainerLow,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: DARK.onSurfaceVariant,
          '&.Mui-selected': {
            color: DARK.secondary,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: DARK.surfaceContainerHigh,
          backgroundImage: 'none',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: DARK.onSurfaceVariant,
        },
        selectIcon: {
          color: DARK.onSurfaceVariant,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.7rem',
          height: 24,
          borderRadius: 6,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 99 },
        bar: { borderRadius: 99 },
      },
    },
  },
});

// Export for backward compatibility
export { SIDEBAR_BG, SIDEBAR_HOVER, PRIMARY as PURPLE };

// Export dark tokens for component-level use
export { DARK };
