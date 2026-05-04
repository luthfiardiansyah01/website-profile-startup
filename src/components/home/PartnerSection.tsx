import React from 'react';
import { ArrowRight, Briefcase, Globe, Building2, CircleDollarSign, ExternalLink, Users } from "lucide-react";

const PartnerSection: React.FC = () => {

  const partnershipSlots = [
    {
      id: 1,
      name: 'Enterprise Collaboration Slot',
      logo: 'https://cdn-icons-png.flaticon.com/128/1995/1995574.png',
      tier: 'Open for Application'
    },
    {
      id: 2,
      name: 'Government Initiative Slot',
      logo: 'https://cdn-icons-png.flaticon.com/128/2830/2830284.png',
      tier: 'Open for Application'
    },
    {
      id: 3,
      name: 'Institutional Research Slot',
      logo: 'https://cdn-icons-png.flaticon.com/128/3135/3135768.png',
      tier: 'Open for Application'
    }
  ];

  return (
    <section id="partners" className="py-20 relative bg-[#0a0a1f] text-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#9c27b0] uppercase tracking-wider text-sm font-medium">
            Open Strategic Partnership
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            Collaboration Ecosystem 2026
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            We are opening a limited number of strategic collaboration slots for organizations ready to co-develop AI-driven transformation systems.
          </p>
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {partnershipSlots.map((slot) => (
            <div key={slot.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300">

              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{slot.name}</h3>

              <p className="text-white/70 text-sm mb-4">
                Selective collaboration opportunity for high-impact transformation projects.
              </p>

              <div className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-black">
                {slot.tier}
              </div>

            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">

          {/* LEFT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">

            <div className="mb-6 flex items-center">
              <CircleDollarSign className="w-8 h-8 text-[#00f0ff] mr-3" />
              <h3 className="text-2xl font-semibold">Enterprise Collaboration</h3>
            </div>

            <p className="text-white/70 mb-6">
              Co-develop AI-powered systems for operational efficiency, sustainability, and digital transformation.
            </p>

            <div className="space-y-4 mb-8">

              {[
                "AI system co-development",
                "Data infrastructure integration",
                "Operational transformation programs"
              ].map((text, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                  </div>
                  <p className="text-white/80">{text}</p>
                </div>
              ))}

            </div>

            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] font-medium inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300"
            >
              <span>Apply for Partnership</span>
              <ExternalLink size={16} />
            </a>

          </div>

          {/* RIGHT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">

            <div className="mb-6 flex items-center">
              <Users className="w-8 h-8 text-[#ff00c8] mr-3" />
              <h3 className="text-2xl font-semibold">Strategic Innovation Program</h3>
            </div>

            <p className="text-white/70 mb-6">
              Joint initiatives focused on climate tech, industrial intelligence, and AI-driven sustainability systems.
            </p>

            <div className="space-y-4 mb-8">

              {[
                "Pilot project collaboration",
                "Industry & government innovation programs",
                "Applied AI research & deployment"
              ].map((text, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#ff00c8]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff00c8]" />
                  </div>
                  <p className="text-white/80">{text}</p>
                </div>
              ))}

            </div>

            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff00c8] to-[#ff00c8]/70 text-white font-medium hover:shadow-[0_0_15px_rgba(255,0,200,0.5)] transition-all duration-300">
              Explore Collaboration
            </button>

          </div>

        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-white/50 text-sm">
            Selection-based collaboration • Limited strategic slots available
          </p>
        </div>

      </div>
    </section>
  );
};

export default PartnerSection;