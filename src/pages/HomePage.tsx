import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProgramSection from '../components/home/ProgramSection';
import PricingSection from '../components/home/PricingSection';
import PartnerSection from '../components/home/PartnerSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <PricingSection />
      <PartnerSection />
    </>
  );
};

export default HomePage;