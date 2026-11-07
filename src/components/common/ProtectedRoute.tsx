import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export interface ProtectedRouteProps
{
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ( {
  children,
  requiredRole,
} ) =>
{
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if ( !isAuthenticated )
  {
    return <Navigate to="/auth/login" state={ { from: location } } replace />;
  }

  if ( requiredRole && user?.role !== requiredRole && user?.role !== 'admin' )
  {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{ children }</>;
};
