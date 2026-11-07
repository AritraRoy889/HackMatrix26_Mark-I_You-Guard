import { Navigate, Outlet } from 'react-router-dom';
import { currentUser } from '../services/auth';

export default function ProtectedRoute({
  children
}: {
  children?: React.ReactNode;
}) {
  if (!currentUser()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children || <Outlet />}</>;
}

export { ProtectedRoute };
