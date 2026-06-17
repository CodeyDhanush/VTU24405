import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationList from '../components/NotificationList';
import { usePriorityNotifications } from '../hooks/usePriorityNotifications';

const PriorityInbox = () => {
  const {
    notifications,
    totalCount,
    topN,
    topNOptions,
    setTopN,
    loading,
    error,
    isEmpty,
    refreshNotifications,
  } = usePriorityNotifications();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Priority Inbox
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Top notifications sorted by priority (Placement → Result → Event),
            then by latest timestamp.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="top-n-label">Show Top</InputLabel>
            <Select
              labelId="top-n-label"
              value={topN}
              label="Show Top"
              onChange={(e) => setTopN(Number(e.target.value))}
            >
              {topNOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton
            onClick={refreshNotifications}
            disabled={loading}
            aria-label="Refresh notifications"
            color="primary"
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {!loading && !error && totalCount > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing top {Math.min(topN, totalCount)} of {totalCount} notifications
        </Typography>
      )}

      <NotificationList
        notifications={notifications}
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        onRetry={refreshNotifications}
        emptyMessage="No notifications available in the priority inbox."
      />
    </Box>
  );
};

export default PriorityInbox;
