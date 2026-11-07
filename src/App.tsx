import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';

import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import ScanProgress from './pages/ScanProgress';
import ScanReport from './pages/ScanReport';
import ScanHistory from './pages/ScanHistory';

import Certificates from './pages/Certificates';
import ThreatIntelligence from './pages/ThreatIntelligence';
import Community from './pages/Community';
import Alerts from './pages/Alerts';
import Watchlist from './pages/Watchlist';
import Settings from './pages/Settings';
import Help from './pages/Help';

function PrivatePage({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public pages */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-email"
        element={<VerifyEmail />}
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <PrivatePage>
            <Dashboard />
          </PrivatePage>
        }
      />

      {/* Scanning */}

      <Route
        path="/scanner"
        element={
          <PrivatePage>
            <Scanner />
          </PrivatePage>
        }
      />

      <Route
        path="/scans/:id/progress"
        element={
          <PrivatePage>
            <ScanProgress />
          </PrivatePage>
        }
      />

      <Route
        path="/scans/:id"
        element={
          <PrivatePage>
            <ScanReport />
          </PrivatePage>
        }
      />

      <Route
        path="/scan-history"
        element={
          <PrivatePage>
            <ScanHistory />
          </PrivatePage>
        }
      />

      {/* Intelligence */}

      <Route
        path="/certificates"
        element={
          <PrivatePage>
            <Certificates />
          </PrivatePage>
        }
      />

      <Route
        path="/threat-intelligence"
        element={
          <PrivatePage>
            <ThreatIntelligence />
          </PrivatePage>
        }
      />

      <Route
        path="/community"
        element={
          <PrivatePage>
            <Community />
          </PrivatePage>
        }
      />

      {/* Monitoring */}

      <Route
        path="/alerts"
        element={
          <PrivatePage>
            <Alerts />
          </PrivatePage>
        }
      />

      <Route
        path="/watchlist"
        element={
          <PrivatePage>
            <Watchlist />
          </PrivatePage>
        }
      />

      {/* Account */}

      <Route
        path="/settings"
        element={
          <PrivatePage>
            <Settings />
          </PrivatePage>
        }
      />

      <Route
        path="/help"
        element={
          <PrivatePage>
            <Help />
          </PrivatePage>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
