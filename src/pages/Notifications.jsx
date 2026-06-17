import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterPanel from '../components/FilterPanel';
import NotificationList from '../components/NotificationList';
import PaginationControls from '../components/PaginationControls';
import { useNotifications } from '../hooks/useNotifications';

const Notifications = () => {
  const {
    notifications,
    totalCount,
    loading,
    error,
    isEmpty,
    refreshNotifications,
    page,
    limit,
    typeFilter,
    searchTerm,
    sortOrder,
    totalPages,
    setPage,
    setLimit,
    setTypeFilter,
    setSearchTerm,
    setSortOrder,
  } = useNotifications();

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
            All Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Browse, filter, search, and paginate through all campus notifications.
          </Typography>
        </Box>

        <IconButton
          onClick={refreshNotifications}
          disabled={loading}
          aria-label="Refresh notifications"
          color="primary"
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      <FilterPanel
        typeFilter={typeFilter}
        searchTerm={searchTerm}
        sortOrder={sortOrder}
        limit={limit}
        onTypeFilterChange={setTypeFilter}
        onSearchChange={setSearchTerm}
        onSortOrderChange={setSortOrder}
        onLimitChange={setLimit}
      />

      <NotificationList
        notifications={notifications}
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        onRetry={refreshNotifications}
        emptyMessage="No notifications match your current filters."
      />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default Notifications;
