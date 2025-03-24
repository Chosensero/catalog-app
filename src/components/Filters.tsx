import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  capitalize: (str: string) => string;
}

export const Filters = ({ categories, selectedCategory, searchQuery, onCategoryChange, onSearchChange, capitalize }: FiltersProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'contained' : 'outlined'}
          onClick={() => onCategoryChange(category)}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'normal',
            backgroundColor: selectedCategory === category ? '#212121' : 'transparent',
            color: selectedCategory === category ? '#fff' : '#212121',
            borderColor: '#212121',
            '&:hover': { backgroundColor: selectedCategory === category ? '#212121' : '#f5f5f5', borderColor: '#212121' },
            height: 36,
            px: 2,
          }}
        >
          {capitalize(category === 'all' ? 'Все' : category)}
        </Button>
      ))}
    </Box>
    <TextField
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#212121', fontSize: 20 }} /></InputAdornment> }}
      size="small"
      sx={{
        width: 150,
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '& .MuiOutlinedInput-root': {
          height: 36,
          '& fieldset': { borderColor: '#212121' },
          '&:hover fieldset': { borderColor: '#212121' },
          '&.Mui-focused fieldset': { borderColor: '#212121' },
          '& .MuiInputBase-input': { color: '#212121', fontSize: '0.9rem', padding: '8px 12px' },
        },
      }}
    />
  </Box>
);