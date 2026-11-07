# HackMatrix26_Mark-I_You-Guard: THREATGUARD 🛡️
> Enterprise-grade AI-Powered Phishing & Malicious Website Detection Platform.

THREATGUARD (built on the You Guard architecture) is a comprehensive, production-grade cybersecurity SaaS web application delivering zero-trust URL security assessment, four-pillar threat analysis, real-time SSL/TLS certificate chain verification, interactive IOC threat graph exploration, and continuous domain watchlist monitoring.

---

## 🌐 20-Page Application Suite

The suite implements 20 responsive, enterprise-grade screens tailored for Desktop 1440 × 1024 high fidelity:

### Public & Authentication
- **Page 01 — Landing Page (`/`)**: Dark navy & electric cyan hero, URL scanner input, animated radar visual, 4 demo metrics, four-pillar features, 4-stage workflow visual, testimonials, and enterprise footer.
- **Page 02 — Login Screen (`/auth/login`)**: Two-column layout with 3D shield & glowing radar artwork, 3 trust statements, email/password validation, and Google SSO.
- **Page 03 — User Registration (`/auth/register`)**: Full name, work email, real-time password entropy bar, 4-point requirement checklist, terms acceptance, and Google signup.
- **Page 04 — Forgot Password Recovery (`/auth/forgot-password`)**: Minimalist recovery card with automated token dispatch states and success confirmation.
- **Page 05 — Email Verification (`/auth/verify-email`)**: 6-digit OTP verification card with live resend countdown timer and expired code state preview.

### Core SOC Dashboard & Scanner
- **Page 06 — Main Security Dashboard (`/dashboard`)**: Security overview, URL scanner CTA, 4 demo metric cards, SVG threat trend line chart, threat distribution donut, 4-pillar scanning status, recent scans, and alerts feed.
- **Page 07 — URL Security Scanner (`/scanner`)**: Central scanner card, paste/clear buttons, Full Scan vs Rapid Check presets, 4 pillar check cards, recent scans list, legal disclaimer.
- **Page 08 — Live Screening Progress (`/scanner/progress`)**: Circular animated cybersecurity radar ring, live 4-pillar progress meters, real-time event feed, cancel button.
- **Page 09 — Scan Results Overview (`/scanner/results`)**: Circular risk score gauge (0–100), AI explanation, 4 pillar results cards with "View Details" linking to Page 10, risk contribution bar, findings & remedies.
- **Page 10 — Detailed Four Pillar Analysis (`/scanner/detailed-analysis`)**: Comprehensive deep inspection across Web, TLS, Dynamic Sandbox, and Threat Intelligence; collapsible evidence payloads, technical metadata sidebar.

### Intelligence, Cryptography & Community
- **Page 11 — Certificate Inspector (`/intelligence/certificates`)**: Domain search, Leaf → Intermediate → Root interactive trust chain, TLS assessment, expiration timeline, Certificate Transparency logs.
- **Page 12 — Threat Intelligence Explorer (`/intelligence/threats`)**: Global IOC search, interactive SVG network graph (domain, IP, certificate, campaign, community report), node details panel, recent threat table.
- **Page 13 — Community Threat Reports (`/community/reports`)**: Top stats (Total, Verified, In Review, Rejected), report CTA, community submissions table with category, reporter reputation, confidence score.
- **Page 14 — Submit Threat Report (`/community/submit`)**: URL, 7 threat categories, behavior description, discovery date, drag-and-drop evidence area, privacy notice; Right sidebar: How it works & guidelines.

### Monitoring, Settings & System States
- **Page 15 — Scan History & Audit Log (`/monitoring/history`)**: Search & filters (date, risk, status), 4 demo stat cards, enterprise table (score, verdict, scan type, actions: view, rescan, copy, delete), pagination.
- **Page 16 — Monitoring & Alerts (`/monitoring/alerts`)**: Dual tabs ("Security Alerts" and "My Watchlist"), slide-over domain details panel (30-day mini chart & SSL status), notification settings modal.
- **Page 17 — Account Settings (`/account/settings`)**: 5 vertical tabs: Profile, Security (password, 2FA/MFA toggle, sessions), Notifications (email, in-app, webhook), Preferences (themes), Privacy (retention, JSON export, delete modal).
- **Page 18 — Help & Knowledge Center (`/support/help`)**: "How Can We Help You?" search bar, 6 featured help cards, expandable FAQ accordion, Support Ticket modal, Bug Report modal, Platform Status widget.
- **Page 19 — 404 — Signal Lost (`/404`)**: Cyber radar with disconnected node, stylized glowing 404, diagnostic block (`ERR_HTTP_404_TARGET_UNREACHABLE`), Return to Dashboard & Homepage CTAs.
- **Page 20 — Server Error & Maintenance (`/maintenance`)**: Hex lock & gear illustration, "500 — SYSTEM MAINTENANCE", cluster telemetry status box, interactive "Retry Connection" button, SLA link.

---

## ⚡ The Four Pillar Detection Architecture

1. **Web Security Assessment**: Redirect loops, cloaking detection, DOM iframe inspection, external resource provenance, and security headers (CSP, HSTS, X-Frame-Options).
2. **Advanced Certificate Validation**: Full X.509 chain of trust (Leaf → Intermediate → Root), Certificate Transparency (CT) log checks, revocation status (CRL & OCSP), and TLS cipher deprecation checks.
3. **Dynamic Threat Analysis**: Isolated headless browser sandbox, behavioral DOM event tracking, brand impersonation computer-vision matching, and payload detonation.
4. **Threat Intelligence & Community**: Real-time cross-referencing against Google Safe Browsing, VirusTotal, Spamhaus DBL, AlienVault OTX, and consensus-verified community threat reports.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Launch development server
npm run dev

# 3. Compile production build
npm run build

# 4. Preview compiled bundle
npm run preview
```
