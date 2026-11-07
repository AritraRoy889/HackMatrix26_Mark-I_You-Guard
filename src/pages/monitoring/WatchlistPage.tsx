import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertsPage } from './AlertsPage';

export const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Keep URL parameter aligned so tab switches smoothly
    navigate('/monitoring/alerts?tab=watchlist', { replace: true });
  }, [navigate]);

  return <AlertsPage />;
};
