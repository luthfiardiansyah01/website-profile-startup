import React from 'react';
import { GanttChartSquare, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import startupIcon from '@/assets/startup-transparan-2.png'
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/startup-transparan-2.png" alt="Startup Icon" className="h-15 w-20 animate-pulse"/>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#ff00c8] text-transparent bg-clip-text">
                MoedaTrace
              </span>
            </div>
            <p className="text-white/70 mb-6">
              Reshaping the future of startup acceleration with innovative programs and sustainable growth strategies.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink text={t('footerAbout')} />
              <FooterLink text={t('footerPrograms')} />
              <FooterLink text={t('footerPricing')} href="#pricing" />
              <FooterLink text={t('becomePartner')} href="https://forms.google.com" />
              <FooterLink text={t('footerContact')} />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="text-white/70 mb-4">
              {t('donate')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
              />
              <button className="bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] font-medium px-4 rounded-r-lg flex items-center hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © 2025 MoedaTrace. {t('footerCopyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-white/50 text-sm hover:text-white/80 transition-colors cursor-pointer">
              {t('footerPrivacy')}
            </span>
            <span className="text-white/50 text-sm hover:text-white/80 transition-colors cursor-pointer">
              {t('footerTerms')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#00f0ff] transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,240,255,0.5)]"
  >
    {icon}
  </a>
);

const FooterLink = ({ text, href = '#' }: { text: string; href?: string }) => (
  <li>
    <a href={href} target={href !== '#' ? '_blank' : undefined} rel={href !== '#' ? 'noopener noreferrer' : undefined} className="text-white/70 hover:text-[#00f0ff] transition-colors flex items-center gap-1 group">
      <span>{text}</span>
      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
    </a>
  </li>
);

export default Footer;