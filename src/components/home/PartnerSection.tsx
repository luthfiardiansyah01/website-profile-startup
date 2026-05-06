import React from "react";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Users
} from "lucide-react";
import { useTranslation } from "react-i18next";

const PartnerSection: React.FC = () => {
  const { t } = useTranslation();

  const partnershipSlots = [
    {
      key: "enterprise",
      icon: Briefcase
    },
    {
      key: "government",
      icon: Briefcase
    },
    {
      key: "research",
      icon: Briefcase
    }
  ];

  const enterpriseItems = [
    "partners.enterpriseCard.items.0",
    "partners.enterpriseCard.items.1",
    "partners.enterpriseCard.items.2"
  ];

  const innovationItems = [
    "partners.innovationCard.items.0",
    "partners.innovationCard.items.1",
    "partners.innovationCard.items.2"
  ];

  return (
    <section id="partners" className="py-20 relative bg-[#0a0a1f] text-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#9c27b0] uppercase tracking-wider text-sm font-medium">
            {t("partners.label")}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            {t("partners.title")}
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            {t("partners.description")}
          </p>
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {partnershipSlots.map((slot) => {
            const Icon = slot.icon;

            return (
              <div
                key={slot.key}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {t(`partners.slots.${slot.key}.name`)}
                </h3>

                <p className="text-white/70 text-sm mb-4">
                  {t(`partners.slots.${slot.key}.description`)}
                </p>

                <div className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-black">
                  {t(`partners.slots.${slot.key}.tier`)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">

          {/* LEFT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">

            <div className="mb-6 flex items-center">
              <Briefcase className="w-8 h-8 text-[#00f0ff] mr-3" />
              <h3 className="text-2xl font-semibold">
                {t("partners.enterpriseCard.title")}
              </h3>
            </div>

            <p className="text-white/70 mb-6">
              {t("partners.enterpriseCard.description")}
            </p>

            <div className="space-y-4 mb-8">
              {enterpriseItems.map((key) => (
                <div key={key} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                  </div>
                  <p className="text-white/80">{t(key)}</p>
                </div>
              ))}
            </div>

            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] font-medium inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300"
            >
              <span>{t("partners.enterpriseCard.button")}</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 relative overflow-hidden group">

            <div className="mb-6 flex items-center">
              <Users className="w-8 h-8 text-[#ff00c8] mr-3" />
              <h3 className="text-2xl font-semibold">
                {t("partners.innovationCard.title")}
              </h3>
            </div>

            <p className="text-white/70 mb-6">
              {t("partners.innovationCard.description")}
            </p>

            <div className="space-y-4 mb-8">
              {innovationItems.map((key) => (
                <div key={key} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-[#ff00c8]/20 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff00c8]" />
                  </div>
                  <p className="text-white/80">{t(key)}</p>
                </div>
              ))}
            </div>

            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff00c8] to-[#ff00c8]/70 text-white font-medium hover:shadow-[0_0_15px_rgba(255,0,200,0.5)] transition-all duration-300">
              {t("partners.innovationCard.button")}
            </button>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-white/50 text-sm">
            {t("partners.footerNote")}
          </p>
        </div>

      </div>
    </section>
  );
};

export default PartnerSection;