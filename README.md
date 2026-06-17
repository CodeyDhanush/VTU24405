# VTU24405
A production-ready React application for viewing and managing campus notifications with priority sorting, filtering, search, and pagination.
## Project Structure

```
src/
├── api/
│   └── notificationApi.js
├── components/
│   ├── NotificationCard.jsx
│   ├── NotificationList.jsx
│   ├── PriorityBadge.jsx
│   ├── FilterPanel.jsx
│   └── PaginationControls.jsx
├── context/
│   └── NotificationContext.jsx
├── hooks/
│   ├── useNotifications.js
│   └── usePriorityNotifications.js
├── middleware/
│   └── apiLogger.js
├── services/
│   └── logger.js
├── pages/
│   ├── PriorityInbox.jsx
│   └── Notifications.jsx
├── routes/
│   └── AppRoutes.jsx
├── utils/
│   ├── priority.js
│   ├── sorting.js
│   └── filtering.js
├── App.jsx
└── main.jsx
```
