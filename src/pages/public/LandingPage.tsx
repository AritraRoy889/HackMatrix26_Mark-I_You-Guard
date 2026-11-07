import React from 'react';
import { HeroSection } from '../../features/landing/HeroSection';
import { LiveScannerPreview } from '../../features/landing/LiveScannerPreview';
import { FeaturesGrid } from '../../features/landing/FeaturesGrid';
import { ThreatStatsBanner } from '../../features/landing/ThreatStatsBanner';
import { Testimonials } from '../../features/landing/Testimonials';
import { CtaSection } from '../../features/landing/CtaSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <HeroSection />
      <ThreatStatsBanner />
      <LiveScannerPreview />
      <FeaturesGrid />
      <Testimonials />
      <CtaSection />
    </div>
  );
};
