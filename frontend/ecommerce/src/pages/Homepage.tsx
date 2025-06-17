import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeatureSections';
import StatsSection from '../components/sections/StatsSection';
import CTASection from '../components/sections/CTASection';

const HomePage: React.FC = () => {
  return (
    <div className="min-vh-100 bg-white">
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;
