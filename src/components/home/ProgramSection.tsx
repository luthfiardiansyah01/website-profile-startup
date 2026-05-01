import React, { useState } from 'react';
import { Lightbulb, Building, Users, Globe, ArrowRight, Rocket, Award, Target } from 'lucide-react';
import ProgramCard from '../ui/ProgramCard';
import { useLanguage } from '../../context/LanguageContext';

const ProgramSection = () => {
  const [activeTab, setActiveTab] = useState('social');
  const { t } = useLanguage();

  const socialPrograms = [
    {
      id: 1,
      title: "Community Impact Initiative",
      description: "Empowering startups focused on social good with mentorship, resources, and networking opportunities.",
      icon: <Users className="w-6 h-6" />,
      stats: "50+ ventures supported",
      color: "from-[#00f0ff] to-[#2563eb]"
    },
    {
      id: 2,
      title: "Green Innovation Lab",
      description: "Accelerating eco-friendly startups addressing climate change and environmental sustainability.",
      icon: <Globe className="w-6 h-6" />,
      stats: "37% reduction in carbon footprint",
      color: "from-[#00f0ff] to-[#059669]"
    },
    {
      id: 3,
      title: "Education Technology Hub",
      description: "Supporting startups revolutionizing learning experiences through cutting-edge technology.",
      icon: <Lightbulb className="w-6 h-6" />,
      stats: "100K+ students impacted",
      color: "from-[#ff00c8] to-[#9c27b0]"
    }
  ];

  const businessPrograms = [
    {
      id: 4,
      title: "Accelerator Pro",
      description: "A 12-week intensive program helping startups scale rapidly with expert mentorship and funding opportunities.",
      icon: <Rocket className="w-6 h-6" />,
      stats: "$25M+ raised by graduates",
      color: "from-[#ff00c8] to-[#9c27b0]"
    },
    {
      id: 5,
      title: "Corporate Innovation Partnership",
      description: "Connecting startups with industry leaders for collaborative innovation and market expansion.",
      icon: <Building className="w-6 h-6" />,
      stats: "35+ corporate partnerships",
      color: "from-[#9c27b0] to-[#6d28d9]"
    },
    {
      id: 6,
      title: "Global Founder Network",
      description: "A global community of founders sharing insights, resources, and opportunities across borders.",
      icon: <Award className="w-6 h-6" />,
      stats: "1,200+ founders across 60 countries",
      color: "from-[#00f0ff] to-[#3b82f6]"
    }
  ];

  return (
    <section id="programs" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#00f0ff] uppercase tracking-wider text-sm font-medium">{t('programsLabel')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            {t('programsTitle')}
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            {t('programsDescription')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setActiveTab('social')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'social'
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Social Impact
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'business'
                  ? 'bg-gradient-to-r from-[#ff00c8] to-[#ff00c8]/70 text-white shadow-[0_0_10px_rgba(255,0,200,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Business Growth
            </button>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'social' ? socialPrograms : businessPrograms).map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#00f0ff] transition-colors group"
          >
            <span>View all programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#9c27b0] opacity-20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-[#00f0ff] opacity-20 blur-[100px] rounded-full"></div>
    </section>
  );
};

export default ProgramSection;