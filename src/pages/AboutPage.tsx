import React from 'react';
import { Target, Lightbulb, TrendingUp, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Vision & Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#9c27b0] uppercase tracking-wider text-sm font-medium">Who We Are</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
              Vision & Mission
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Vision Card */}
            <div className="bg-[#0a0a1f]/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center">
                  <Target className="w-8 h-8 text-[#00f0ff] mr-3" />
                  <h2 className="text-2xl font-semibold">Vision</h2>
                </div>

                <p className="text-lg text-white/80 leading-relaxed">
                  Build AI-powered infrastructure for productive, resilient, and sustainable ecosystems
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[#0a0a1f]/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00c8]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center">
                  <Lightbulb className="w-8 h-8 text-[#ff00c8] mr-3" />
                  <h2 className="text-2xl font-semibold">Mission</h2>
                </div>

                <ol className="space-y-4">
                  <MissionItem icon={<Zap size={18} />} text="Improve productivity using AI-driven insights" />
                  <MissionItem icon={<TrendingUp size={18} />} text="Enable efficient and sustainable business operations" />
                  <MissionItem icon={<Lightbulb size={18} />} text="Connect learning, data, and economic opportunities" />
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff00c8]/5 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

const MissionItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-[#ff00c8]/20 flex items-center justify-center flex-shrink-0 mt-1">
      {icon}
    </div>
    <span className="text-white/80">{text}</span>
  </li>
);

export default AboutPage;
