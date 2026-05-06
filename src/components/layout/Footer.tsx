import React from 'react';
import { Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
<img src="/startup-transparan-2.png" />
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/startup-transparan-2.png" alt="Startup Icon" className="h-15 w-20 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#ff00c8] text-transparent bg-clip-text">
                {t("footer.company")}
              </span>
            </div>

            <p className="text-white/70 mb-6">
              {t('footer.description')}
            </p>

            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink text={t('footer.about')} />
              <FooterLink text={t('footer.programs')} />
              <FooterLink text={t('footer.pricing')} href="#pricing" />
              <FooterLink text={t('footer.partner')} />
              <FooterLink text={t('footer.contact')} />
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="text-white/70 mb-4">
              {t('footer.donate')}
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full"
              />
              <button className="bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] px-4 rounded-r-lg flex items-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5">
    {icon}
  </a>
);

const FooterLink = ({ text, href = '#' }: { text: string; href?: string }) => (
  <li>
    <a href={href} className="text-white/70 hover:text-[#00f0ff] transition-colors">
      {text}
    </a>
  </li>
);

export default Footer;