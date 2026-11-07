import React from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Streamlined Cyber-Console Pages
import Dashboard from '../pages/Dashboard';
import Scanner from '../pages/Scanner';
import ScanProgress from '../pages/ScanProgress';
import ScanReport from '../pages/ScanReport';
import ScanHistory from '../pages/ScanHistory';
import Certificates from '../pages/Certificates';
import ThreatIntelligence from '../pages/ThreatIntelligence';
import Community from '../pages/Community';
import Alerts from '../pages/Alerts';
import Watchlist from '../pages/Watchlist';
import Settings from '../pages/Settings';
import Help from '../pages/Help';

// Deep Forensics & Enterprise 20-Page Specification Pages
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ScannerPage } from '../pages/scanner/ScannerPage';
import { ScanProgressPage } from '../pages/scanner/ScanProgressPage';
import { ScanResultsPage } from '../pages/scanner/ScanResultsPage';
import { DetailedAnalysisPage } from '../pages/scanner/DetailedAnalysisPage';
import { ThreatExplorerPage } from '../pages/intelligence/ThreatExplorerPage';
import { CertificateInspectorPage } from '../pages/intelligence/CertificateInspectorPage';
import { CommunityReportsPage } from '../pages/community/CommunityReportsPage';
import { SubmitReportPage } from '../pages/community/SubmitReportPage';
import { ScanHistoryPage } from '../pages/monitoring/ScanHistoryPage';
import { AlertsPage } from '../pages/monitoring/AlertsPage';
import { WatchlistPage } from '../pages/monitoring/WatchlistPage';
import { SettingsPage } from '../pages/account/SettingsPage';
import { HelpPage } from '../pages/support/HelpPage';

export const protectedRoutes: RouteObject[] = [
  // Primary Streamlined Workspace Console
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/scanner',
        element: <Scanner />,
      },
      {
        path: '/scans/:id/progress',
        element: <ScanProgress />,
      },
      {
        path: '/scans/:scanId/progress',
        element: <ScanProgress />,
      },
      {
        path: '/scans/:id',
        element: <ScanReport />,
      },
      {
        path: '/scans/:scanId',
        element: <ScanReport />,
      },
      {
        path: '/scans/:scanId/results',
        element: <ScanReport />,
      },
      {
        path: '/scan-history',
        element: <ScanHistory />,
      },
      {
        path: '/threat-intelligence',
        element: <ThreatIntelligence />,
      },
      {
        path: '/certificates',
        element: <Certificates />,
      },
      {
        path: '/community',
        element: <Community />,
      },
      {
        path: '/alerts',
        element: <Alerts />,
      },
      {
        path: '/watchlist',
        element: <Watchlist />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/help',
        element: <Help />,
      },
    ],
  },

  // Deep Forensics & 20-Page Enterprise Suite
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/enterprise/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/enterprise/scanner',
        element: <ScannerPage />,
      },
      {
        path: '/scanner/progress',
        element: <ScanProgressPage />,
      },
      {
        path: '/scanner/results',
        element: <ScanResultsPage />,
      },
      {
        path: '/scanner/detailed-analysis',
        element: <DetailedAnalysisPage />,
      },
      {
        path: '/intelligence/threats',
        element: <ThreatExplorerPage />,
      },
      {
        path: '/intelligence/certificates',
        element: <CertificateInspectorPage />,
      },
      {
        path: '/community/reports',
        element: <CommunityReportsPage />,
      },
      {
        path: '/community/submit',
        element: <SubmitReportPage />,
      },
      {
        path: '/monitoring/history',
        element: <ScanHistoryPage />,
      },
      {
        path: '/monitoring/alerts',
        element: <AlertsPage />,
      },
      {
        path: '/monitoring/watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/account/settings',
        element: <SettingsPage />,
      },
      {
        path: '/support/help',
        element: <HelpPage />,
      },
    ],
  },
];
