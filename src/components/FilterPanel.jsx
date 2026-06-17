import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { NOTIFICATION_TYPES } from '../utils/priority';

const FilterPanel = ({
  typeFilter,
  searchTerm,
  sortOrder,
  limit,
  onTypeFilterChange,
  onSearchChange,
  onSortOrderChange,
  onLimitChange,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '2fr 1fr 1fr 1fr',
        },
        gap: 2,
        mb: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <TextField
        label="Search by message"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Type to search..."
        size="small"
        fullWidth
      />

      <FormControl size="small" fullWidth>
        <InputLabel id="type-filter-label">Filter by Type</InputLabel>
        <Select
          labelId="type-filter-label"
          value={typeFilter}
          label="Filter by Type"
          onChange={(e) => onTypeFilterChange(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {NOTIFICATION_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel id="sort-order-label">Sort</InputLabel>
        <Select
          labelId="sort-order-label"
          value={sortOrder}
          label="Sort"
          onChange={(e) => onSortOrderChange(e.target.value)}
        >
          <MenuItem value="desc">Latest First</MenuItem>
          <MenuItem value="asc">Oldest First</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel id="limit-label">Per Page</InputLabel>
        <Select
          labelId="limit-label"
          value={limit}
          label="Per Page"
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ gridColumn: '1 / -1' }}
      >
        Filter by type, search messages, and control sort order and page size.
      </Typography>
    </Box>
  );
};

export default FilterPanel;
