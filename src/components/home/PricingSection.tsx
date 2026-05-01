import React from 'react';
import { Check, Shield, Zap, Target, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PricingPackage {
  id: string;
  name: string;
  startupProgram: string;
  flagshipProduct: string;
  targetMarket: string[];
  deliverables: string[];
  pricingRange: string;
  isGovernment?: boolean;
  cta: string;
}

const PricingSection = () => {
  const { t } = useLanguage();
  const packages: PricingPackage[] = [
    {
      id: 'foundation',
      name: 'Enterprise Foundation',
      startupProgram: 'Pre-Acceleration Program',
      flagshipProduct: 'Core Analytics Platform',
      targetMarket: ['Enterprise', 'Corporate'],
      deliverables: [
        'Initial business assessment and roadmap',
        'Access to foundational analytics tools',
        'Monthly mentorship sessions',
        'Network access to partner ecosystem',
      ],
      pricingRange: 'Rp 232.5M - Rp 387.5M/year',
      cta: 'Request Consultation',
    },
    {
      id: 'automation',
      name: 'Business Process Automation',
      startupProgram: 'Acceleration Track',
      flagshipProduct: 'Workflow Automation Suite',
      targetMarket: ['Corporate', 'Enterprise'],
      deliverables: [
        'Process audit and optimization strategy',
        'Custom automation implementation',
        'Team training and certification',
        'Ongoing support and optimization',
      ],
      pricingRange: 'Rp 620M - Rp 1.16B/year',
      cta: 'Request Consultation',
    },
    {
      id: 'learning',
      name: 'Gamified Learning Accelerator',
      startupProgram: 'Growth Program',
      flagshipProduct: 'Interactive Learning Platform',
      targetMarket: ['NGO', 'Corporate'],
      deliverables: [
        'Curriculum design and gamification strategy',
        'Interactive platform deployment',
        'User engagement analytics dashboard',
        'Quarterly impact assessments',
      ],
      pricingRange: 'Rp 387.5M - Rp 697.5M/year',
      cta: 'Request Consultation',
    },
    {
      id: 'climate',
      name: 'Climate & Disaster Intelligence System',
      startupProgram: 'Impact Scale Program',
      flagshipProduct: 'Climate Intelligence Platform',
      targetMarket: ['Government', 'NGO'],
      deliverables: [
        'Real-time climate data integration',
        'Predictive disaster modeling',
        'Early warning system implementation',
        'Government compliance reporting',
        'Custom dashboards for decision-makers',
      ],
      pricingRange: 'Indicative: Rp 775M - Rp 1.55B/year',
      isGovernment: true,
      cta: 'Request Official Quotation',
    },
    {
      id: 'flagship',
      name: 'Full Product Development / Flagship',
      startupProgram: 'Enterprise Scale Program',
      flagshipProduct: 'Comprehensive AI-Powered Suite',
      targetMarket: ['Enterprise'],
      deliverables: [
        'Custom product development and deployment',
        'Enterprise-grade infrastructure',
        'Dedicated technical support team',
        'Quarterly strategic reviews',
        'Custom integrations with existing systems',
      ],
      pricingRange: 'Rp 1.55B - Rp 3.875B/year',
      cta: 'Request Consultation',
    },
    {
      id: 'partnership',
      name: 'Enterprise Partnership Retainer',
      startupProgram: 'Strategic Partnership Program',
      flagshipProduct: 'Full Platform Suite + Custom Solutions',
      targetMarket: ['Enterprise', 'Government'],
      deliverables: [
        'Dedicated account management team',
        'Priority support and implementation',
        'Custom feature development',
        'Monthly strategic planning sessions',
        'Annual product roadmap collaboration',
      ],
      pricingRange: 'Rp 3.1B - Rp 7.75B/year',
      isGovernment: true,
      cta: 'Request Official Quotation',
    },
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#ff00c8] uppercase tracking-wider text-sm font-medium">{t('pricingLabel')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            {t('pricingTitle')}
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            {t('pricingDescription')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {/* Government Compliance Note */}
        <div className="mt-16 bg-[#0a0a1f]/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#00f0ff] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('pricingComplianceTitle')}</h3>
              <p className="text-white/70">
                {t('pricingComplianceDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff00c8]/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00f0ff]/5 blur-[100px] rounded-full pointer-events-none"></div>
    </section>
  );
};

const PricingCard = ({ package: pkg }: { package: PricingPackage }) => {
  const { t } = useLanguage();

  const iconMap: { [key: string]: React.ReactNode } = {
    foundation: <Target className="w-6 h-6" />,
    automation: <Zap className="w-6 h-6" />,
    learning: <TrendingUp className="w-6 h-6" />,
    climate: <Shield className="w-6 h-6" />,
    flagship: <Users className="w-6 h-6" />,
    partnership: <Check className="w-6 h-6" />,
  };

  const colorMap: { [key: string]: string } = {
    foundation: 'from-blue-500 to-cyan-500',
    automation: 'from-purple-500 to-pink-500',
    learning: 'from-emerald-500 to-teal-500',
    climate: 'from-orange-500 to-red-500',
    flagship: 'from-cyan-500 to-blue-500',
    partnership: 'from-pink-500 to-purple-500',
  };

  const translationKeyMap: { [key: string]: { name: string; program: string; product: string; cta: string; deliverables: string[] } } = {
    foundation: {
      name: t('priceEnterprise'),
      program: t('priceStartupProgram'),
      product: t('priceFlagship'),
      cta: t('requestConsultation'),
      deliverables: [t('foundationDeliverable1'), t('foundationDeliverable2'), t('foundationDeliverable3'), t('foundationDeliverable4')],
    },
    automation: {
      name: t('automationTitle'),
      program: t('automationProgram'),
      product: t('automationProduct'),
      cta: t('requestConsultation'),
      deliverables: [t('automationDeliverable1'), t('automationDeliverable2'), t('automationDeliverable3'), t('automationDeliverable4')],
    },
    learning: {
      name: t('learningTitle'),
      program: t('learningProgram'),
      product: t('learningProduct'),
      cta: t('requestConsultation'),
      deliverables: [t('learningDeliverable1'), t('learningDeliverable2'), t('learningDeliverable3'), t('learningDeliverable4')],
    },
    climate: {
      name: t('climateTitle'),
      program: t('climateProgram'),
      product: t('climateProduct'),
      cta: t('requestQuotation'),
      deliverables: [t('climateDeliverable1'), t('climateDeliverable2'), t('climateDeliverable3'), t('climateDeliverable4'), t('climateDeliverable5')],
    },
    flagship: {
      name: t('flagshipTitle'),
      program: t('flagshipProgram'),
      product: t('flagshipProduct'),
      cta: t('requestConsultation'),
      deliverables: [t('flagshipDeliverable1'), t('flagshipDeliverable2'), t('flagshipDeliverable3'), t('flagshipDeliverable4'), t('flagshipDeliverable5')],
    },
    partnership: {
      name: t('partnershipTitle'),
      program: t('partnershipProgram'),
      product: t('partnershipProduct'),
      cta: t('requestQuotation'),
      deliverables: [t('partnershipDeliverable1'), t('partnershipDeliverable2'), t('partnershipDeliverable3'), t('partnershipDeliverable4'), t('partnershipDeliverable5')],
    },
  };

  const translated = translationKeyMap[pkg.id];
  const marketTranslations = pkg.targetMarket.map(market => {
    if (market === 'Enterprise') return t('enterprise');
    if (market === 'Corporate') return t('corporate');
    if (market === 'NGO') return t('ngo');
    if (market === 'Government') return t('government');
    return market;
  });

  return (
    <div className="group relative bg-[#0a0a1f]/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
      {/* Government Badge */}
      {pkg.isGovernment && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-orange-500/20 border border-orange-500/50 rounded-full px-3 py-1 z-10">
          <Shield size={14} className="text-orange-400" />
          <span className="text-xs font-semibold text-orange-300">{t('governmentBadge')}</span>
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorMap[pkg.id]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <span className="text-white">{iconMap[pkg.id]}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{translated.name}</h3>
          <p className="text-[#00f0ff] text-sm font-medium">{translated.program}</p>
        </div>

        {/* Flagship Product */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{t('priceFlagship')}</p>
          <p className="text-white font-medium">{translated.product}</p>
        </div>

        {/* Target Market */}
        <div className="mb-6">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{t('priceTargetMarket')}</p>
          <div className="flex flex-wrap gap-2">
            {marketTranslations.map((market) => (
              <span key={market} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
                {market}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-6">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-3">{t('priceKeyDeliverables')}</p>
          <ul className="space-y-2">
            {translated.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={16} className="text-[#00f0ff] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{t('pricingRange')}</p>
          <p className="text-white font-semibold text-lg">{pkg.pricingRange}</p>
        </div>

        {/* CTA Button */}
        <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f] font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 group/btn">
          {translated.cta}
        </button>
      </div>
    </div>
  );
};

export default PricingSection;
