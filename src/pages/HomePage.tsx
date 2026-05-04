import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProgramSection from '../components/home/ProgramSection';
import PricingSection from '../components/home/PricingSection';
import SponsorSection from '../components/home/SponsorSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <PricingSection />
      <PartnershipSection />
    </>
  );
};

export default HomePage;