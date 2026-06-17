import Chip from '@mui/material/Chip';
import { getPriority, TYPE_COLORS } from '../utils/priority';

const PriorityBadge = ({ type }) => {
  if (!type) return null;

  const color = TYPE_COLORS[type] || 'default';
  const priority = getPriority(type);

  return (
    <Chip
      label={`${type} (P${priority})`}
      color={color}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default PriorityBadge;
