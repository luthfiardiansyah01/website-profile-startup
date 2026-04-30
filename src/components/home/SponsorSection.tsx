import React from 'react';
import { CircleDollarSign, ExternalLink, Users } from 'lucide-react';
import DonationButton from '../ui/DonationButton';

const SponsorSection = () => {
  const sponsors = [
    {
      id: 1,
      name: 'Orpiment Coffee',
      logo: 'https://cdn-icons-png.flaticon.com/128/2765/2765052.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Platinum'
    },
    {
      id: 2,
      name: 'Afterwell Coffee and Eatery',
      logo: 'https://ugc.production.linktr.ee/a565348b-698c-4636-b199-1f5518339e3a_LOGO-afterwell.png?io=true&size=avatar-v3_0.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Gold'
    },
    {
      id: 3,
      name: 'Telkom University',
      logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2qsIm-TY-CbL48rzncMX_hiwJYhgYFDyzgrxM_iCn1enUenC0X5xsNJ-lEQ3ivRT_aIiM98XlZDxbxrGCfX13bllkAKvneU6rnVNlncQSdjg7fG082ghkO3jqWm7UnwrismbageOqQfj9jqW8OJOJ8Yqj1zqNSLVkTgF5UDHCTGeKW4kzGuaggQ/s1134/Telkom%20University%20Logo.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Gold'
    },
    {
      id: 4,
      name: 'Bank Mandiri',
      logo: 'https://vectorseek.com/wp-content/uploads/2023/04/Bank-Mandiri-Logo-Vector-730x730.jpg?auto=compress&cs=tinysrgb&w=300',
      tier: 'Silver'
    },
    {
      id: 5,
      name: 'Dinas Lingkungan Hidup dan Kebersihan',
      logo: 'https://1.bp.blogspot.com/-MlqfkZp60ls/YA-J7AoCb4I/AAAAAAAAHUs/fHZRdg5LfI4qUkFp5OGEixjw_G-UowegACLcBGAsYHQ/w1200-h630-p-k-no-nu/lowongan-dlhk-kota-bandung.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Silver'
    },
    {
      id: 6,
      name: 'Pemerintahan Kota Bandung',
      logo: 'https://2.bp.blogspot.com/-z0rE6HnMtgQ/Wg-abxMBAgI/AAAAAAAAFD0/uHCcB-EiI0kxrer74nEL4KszPn2zAMCRQCLcBGAs/s1600/Kota%2BBandung.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Bronze'
    },
    {
      id: 7,
      name: 'Pemerintahan Provinsi Jawa Barat',
      logo: 'https://clipground.com/images/logo-jawa-barat-png-5.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Bronze'
    },
    {
      id: 8,
      name: 'Evolvix',
      logo: 'https://evolvix.my.id/wp-content/uploads/sites/738/2025/03/Logo-Evolvix-no-bg-e1742803354657-2048x1181.png?auto=compress&cs=tinysrgb&w=300',
      tier: 'Bronze'
    }
    
  ];

  return (
    <section id="sponsors" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#9c27b0] uppercase tracking-wider text-sm font-medium">Our Partnership</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            Partners in Innovation
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Meet the visionary organizations that partner with our mission to accelerate startup success.
          </p>
        </div>

        {/* Partnership Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>

        {/* Support and Donation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <div className="bg-[#0a0a1f]/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="mb-6 flex items-center">
                <CircleDollarSign className="w-8 h-8 text-[#00f0ff] mr-3" />
                <h3 className="text-2xl font-semibold">Become a Partner</h3>
              </div>

              <p className="text-white/70 mb-6">
                Join our network of forward-thinking organizations partnering for innovation and growth with the next generation of startups.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff]"></div>
                  </div>
                  <p className="text-white/80">Brand visibility across our platform and events</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff]"></div>
                  </div>
                  <p className="text-white/80">Direct access to our network of innovative startups</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff]"></div>
                  </div>
                  <p className="text-white/80">Opportunities to mentor and collaborate with founders</p>
                </div>
              </div>
              
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] font-medium inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300"
              >
                <span>Partner With Us</span>
                <ExternalLink size={16} />
              </a>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#00f0ff]/20 blur-[80px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          
          <div className="bg-[#0a0a1f]/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="mb-6 flex items-center">
                <Users className="w-8 h-8 text-[#ff00c8] mr-3" />
                <h3 className="text-2xl font-semibold">Support Our Mission</h3>
              </div>
              
              <p className="text-white/70 mb-6">
                Your contribution helps us empower the next generation of innovators and create lasting impact through our programs.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#ff00c8]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff00c8]"></div>
                  </div>
                  <p className="text-white/80">Fund scholarships for underrepresented founders</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#ff00c8]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff00c8]"></div>
                  </div>
                  <p className="text-white/80">Support our mentor network and educational programs</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#ff00c8]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff00c8]"></div>
                  </div>
                  <p className="text-white/80">Help expand our reach to emerging markets</p>
                </div>
              </div>
              
              <DonationButton />
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#ff00c8]/20 blur-[80px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SponsorCard = ({ sponsor }: { sponsor: { id: number, name: string, logo: string, tier: string } }) => {
  const tierBadgeColor = {
    'Platinum': 'bg-gradient-to-r from-slate-200 to-slate-400',
    'Gold': 'bg-gradient-to-r from-yellow-300 to-amber-500',
    'Silver': 'bg-gradient-to-r from-slate-300 to-slate-500',
    'Bronze': 'bg-gradient-to-r from-amber-600 to-amber-800'
  }[sponsor.tier] || 'bg-white/20';

  return (
    <div className="group relative rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(156,39,176,0.15)]">
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/5 to-white/10 p-px overflow-hidden">
        <div className="absolute inset-0 rounded-lg bg-[#0a0a1f]/50 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-white/5 p-1">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="w-full h-full object-cover rounded-full filter grayscale group-hover:filter-none transition-all duration-300"
          />
        </div>
        
        <h4 className="text-sm font-medium text-center">{sponsor.name}</h4>
        
        <div className={`mt-2 text-xs px-2 py-0.5 rounded-full ${tierBadgeColor} inline-block`}>
          {sponsor.tier}
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;