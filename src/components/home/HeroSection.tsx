import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = Math.max(1 - scrollPosition / 700, 0);
      const translateY = scrollPosition * 0.5;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Fog Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f]/70 via-[#0a0a1f]/60 to-[#0a0a1f] z-10"></div>
        <div className="absolute inset-0 bg-[url('https://media-hosting.imagekit.io/ba98f068dc654cf3/Startup%20MoedaTrace.png?Expires=1841749016&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0LWTtm0IRkxcKs6H09-fO0TAbfA5-7JALzeoqZx7D5XkBw1MtOgnRyeiyZ3fxqLlXbcVB~Ny~tWVn9fT2qm8jQvWV9xiEazleZYtI6Zar266Zj0XhnJECFSzhlkif5Gh7UdAVCXAeWsyelxemTFyrVX3PHfpARRX6V3X6R1kDmdhcA0H1bHW9mlNpH3GBoKTXDB1wPhrXOzeTcEafMoZkHMwcrVHnt2gQD8p1UiiBj2Su~6as5wv5bpuyD5dmWtUaED8dgM1rm6sU3K2WferiqiAFsSMyfMUO0AEiaqHKPiNAeHEyOUNn7wYa3~nFTGHPzsCtNHAAxPEhzVu8sAZOg__?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#0a0a1f]/30 z-[1]"></div>
        
        {/* Animated Fog */}
        <div className="absolute inset-0 z-[2]">
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#0a0a1f] opacity-60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a1f] to-transparent"></div>
        </div>
      </div>
      
      {/* Content */}
      <div 
        ref={heroRef}
        className="container mx-auto px-4 relative z-20 text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-white to-white/80 text-transparent bg-clip-text">Pioneering The</span>
          <span className="block bg-gradient-to-r from-[#00f0ff] via-[#ff00c8] to-[#9c27b0] text-transparent bg-clip-text mt-2">Future of Innovations</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          We accelerate visionary startups through cutting-edge programs, sustainable growth strategies, and a global network of innovators.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] font-medium hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300 transform hover:scale-105">
            Explore Programs
          </button>
          <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center">
            <span>Learn More</span>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer animate-bounce"
        onClick={scrollToPrograms}
      >
        <ChevronDown className="w-10 h-10 text-white/70" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -bottom-[150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff00c8] opacity-20 blur-[150px] rounded-full z-[5]"></div>
    </section>
  );
};

export default HeroSection;