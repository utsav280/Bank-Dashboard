import React from 'react';
import { Box, Typography, TextField, InputAdornment, Stack, Button, useTheme, alpha } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

interface TransactionHeaderProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (val: boolean) => void;
  onExport: () => void;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  searchInput, setSearchInput, isFiltersOpen, setIsFiltersOpen, onExport
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ display: 'flex', alignItems: { sm: 'flex-start' }, justifyContent: 'space-between', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <Box>
        <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>Transaction History</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage and monitor institutional fund movements across your global accounts.
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} flexShrink={0} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
        <TextField
          size="small"
          placeholder="Search description, ref..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          inputProps={{ 'aria-label': 'Search transactions by description or reference' }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: 16 }} /></InputAdornment> }}
          sx={{ minWidth: { xs: 160, sm: 220 }, bgcolor: 'background.paper' }}
        />
        <Button variant={isFiltersOpen ? "contained" : "outlined"} 
          startIcon={<FilterListRoundedIcon />} size="small"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          aria-label={isFiltersOpen ? 'Close advanced filters' : 'Open advanced filters'}
          aria-expanded={isFiltersOpen}
          sx={{ 
            borderColor: isFiltersOpen ? 'transparent' : 'divider', 
            color: isFiltersOpen 
              ? (isDark ? '#141313' : '#fff') 
              : 'text.primary', 
            bgcolor: isFiltersOpen 
              ? (isDark ? 'primary.main' : '#001E3C')
              : 'transparent',
            '&:hover': { 
              bgcolor: isFiltersOpen 
                ? (isDark ? alpha('#adc6ff', 0.85) : '#00152B') 
                : (isDark ? alpha('#fff', 0.04) : 'rgba(0,0,0,0.04)') 
            },
            height: 36, whiteSpace: 'nowrap' 
          }}>
          Advanced Filters
        </Button>
        <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />} onClick={onExport} size="small"
          aria-label="Export transactions to CSV file" 
          sx={{ height: 36, borderColor: 'divider', color: 'text.primary', whiteSpace: 'nowrap' }}>
          Export to CSV
        </Button>
      </Stack>
    </Box>
  );
};

export default TransactionHeader;
