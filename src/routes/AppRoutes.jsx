import { Routes, Route, Navigate } from 'react-router-dom';
import PriorityInbox from '../pages/PriorityInbox';
import Notifications from '../pages/Notifications';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PriorityInbox />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
