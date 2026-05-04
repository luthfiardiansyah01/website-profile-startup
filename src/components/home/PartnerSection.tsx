import React from 'react';
import { CircleDollarSign, ExternalLink, Users } from 'lucide-react';

type Partner = {
  id: number;
  name: string;
  logo: string;
  tier: string;
};

const PartnerSection: React.FC = () => {

  const partners: Partner[] = [
    {
      id: 1,
      name: 'Orpiment Coffee',
      logo: 'https://cdn-icons-png.flaticon.com/128/2765/2765052.png',
      tier: 'Strategic Partner'
    },
    {
      id: 2,
      name: 'Afterwell Coffee and Eatery',
      logo: 'https://ugc.production.linktr.ee/a565348b-698c-4636-b199-1f5518339e3a_LOGO-afterwell.png',
      tier: 'Core Partner'
    },
    {
      id: 3,
      name: 'Telkom University',
      logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2qsIm-TY-CbL48rzncMX_hiwJYhgYFDyzgrxM_iCn1enUenC0X5xsNJ-lEQ3ivRT_aIiM98XlZDxbxrGCfX13bllkAKvneU6rnVNlncQSdjg7fG082ghkO3jqWm7UnwrismbageOqQfj9jqW8OJOJ8Yqj1zqNSLVkTgF5UDHCTGeKW4kzGuaggQ/s1134/Telkom%20University%20Logo.png',
      tier: 'Core Partner'
    },
    {
      id: 4,
      name: 'Bank Mandiri',
      logo: 'https://vectorseek.com/wp-content/uploads/2023/04/Bank-Mandiri-Logo-Vector-730x730.jpg',
      tier: 'Ecosystem Partner'
    },
    {
      id: 5,
      name: 'Dinas Lingkungan Hidup dan Kebersihan',
      logo: 'https://1.bp.blogspot.com/-MlqfkZp60ls/YA-J7AoCb4I/AAAAAAAAHUs/fHZRdg5LfI4qUkFp5OGEixjw_G-UowegACLcBGAsYHQ/w1200-h630-p-k-no-nu/lowongan-dlhk-kota-bandung.png',
      tier: 'Ecosystem Partner'
    },
    {
      id: 6,
      name: 'Pemerintahan Kota Bandung',
      logo: 'https://2.bp.blogspot.com/-z0rE6HnMtgQ/Wg-abxMBAgI/AAAAAAAAFD0/uHCcB-EiI0kxrer74nEL4KszPn2zAMCRQCLcBGAs/s1600/Kota%2BBandung.png',
      tier: 'Supporting Partner'
    },
    {
      id: 7,
      name: 'Pemerintahan Provinsi Jawa Barat',
      logo: 'https://clipground.com/images/logo-jawa-barat-png-5.png',
      tier: 'Supporting Partner'
    },
    {
      id: 8,
      name: 'Evolvix',
      logo: 'https://evolvix.my.id/wp-content/uploads/sites/738/2025/03/Logo-Evolvix-no-bg-e1742803354657-2048x1181.png',
      tier: 'Supporting Partner'
    }
  ];

  return (
    <section id="partners" className="py-20 relative bg-[#0a0a1f] text-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#9c27b0] uppercase tracking-wider text-sm font-medium">
            Strategic Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            Our Partnership Ecosystem
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            We collaborate with enterprises, institutions, and public sector organizations to build scalable intelligence systems and drive sustainable transformation.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">

          {/* LEFT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">
            <div className="mb-6 flex items-center">
              <CircleDollarSign className="w-8 h-8 text-[#00f0ff] mr-3" />
              <h3 className="text-2xl font-semibold">Enterprise Partnership</h3>
            </div>

            <p className="text-white/70 mb-6">
              Collaborate with MoedaTrace to design and deploy AI-powered intelligence systems across your organization and ecosystem.
            </p>

            <div className="space-y-4 mb-8">

              {[ 
                "Co-develop enterprise intelligence systems",
                "Access integrated data & AI infrastructure",
                "Drive innovation across industry and sustainability initiatives"
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
              <span>Become a Partner</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">
            <div className="mb-6 flex items-center">
              <Users className="w-8 h-8 text-[#ff00c8] mr-3" />
              <h3 className="text-2xl font-semibold">Strategic Collaboration</h3>
            </div>

            <p className="text-white/70 mb-6">
              Work with us on high-impact initiatives across climate, industry, and digital transformation programs.
            </p>

            <div className="space-y-4 mb-8">

              {[
                "Joint innovation & pilot projects",
                "Industry & government collaboration programs",
                "Expansion into new markets and ecosystems"
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
      </div>
    </section>
  );
};

const PartnerCard = ({ partner }: { partner: Partner }) => {

  const tierBadgeColor = {
    'Strategic Partner': 'bg-gradient-to-r from-cyan-400 to-blue-500',
    'Core Partner': 'bg-gradient-to-r from-purple-400 to-fuchsia-500',
    'Ecosystem Partner': 'bg-gradient-to-r from-emerald-400 to-teal-500',
    'Supporting Partner': 'bg-gradient-to-r from-amber-500 to-orange-600'
  }[partner.tier] || 'bg-white/20';

  return (
    <div className="group relative rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(156,39,176,0.15)]">
      
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-white/10 p-px">
        <div className="absolute inset-0 rounded-lg bg-[#0a0a1f]/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-white/5 p-1">
          <img
            src={partner.logo}
            alt={partner.name}
            className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>

        <h4 className="text-sm font-medium text-center">{partner.name}</h4>

        <div className={`mt-2 text-xs px-2 py-0.5 rounded-full ${tierBadgeColor}`}>
          {partner.tier}
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;