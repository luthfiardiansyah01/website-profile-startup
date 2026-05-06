import React, { useMemo } from "react";
import {
  Check,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* =========================
   SAFE ARRAY
========================= */

const asArray = (v: any): string[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return [v];
  return [];
};

type Plan = {
  title: string;
  program: string;
  product: string;
  price: string;
  cta: string;
  targetMarket?: string[];
  deliverables?: string[];
  isGovernment?: boolean;
};

/* =========================
   COMPONENT
========================= */

const PricingSection = () => {
  const { t } = useTranslation();

  const plans = t("price.packages", { returnObjects: true }) as Record<string, Plan>;
  const meta = t("price.meta", { returnObjects: true }) as any;
  const compliance = t("price.compliance", { returnObjects: true }) as any;

  const iconMap: Record<string, React.ReactNode> = {
    foundation: <Target className="w-6 h-6" />,
    automation: <Zap className="w-6 h-6" />,
    learning: <TrendingUp className="w-6 h-6" />,
    climate: <Shield className="w-6 h-6" />,
    flagship: <Users className="w-6 h-6" />,
    partnership: <Check className="w-6 h-6" />
  };

  const colorMap: Record<string, string> = {
    foundation: "from-blue-500 to-cyan-500",
    automation: "from-purple-500 to-pink-500",
    learning: "from-emerald-500 to-teal-500",
    climate: "from-orange-500 to-red-500",
    flagship: "from-cyan-500 to-blue-500",
    partnership: "from-pink-500 to-purple-500"
  };

  const normalizeMarket = (m?: string[]) => {
    if (!Array.isArray(m)) return [];
    return m.filter(Boolean);
  };

  if (!plans || Object.keys(plans).length === 0) {
    return (
      <div className="text-white text-center py-20">
        Pricing data not available
      </div>
    );
  }

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-[#ff00c8] uppercase text-sm font-medium">
            {t("price.label")}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            {t("price.title")}
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            {t("price.description")}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Object.entries(plans).map(([key, plan]: [string, Plan]) => {
            const p = plan;
            
            return (
              <div
                key={key}
                className="bg-[#0a0a1f]/30 border border-white/10 rounded-xl p-6"
              >

                {/* BADGE */}
                {p.isGovernment && (
                  <div className="mb-3 flex items-center gap-2 text-orange-400 text-xs">
                    <Shield size={14} />
                    Government Package
                  </div>
                )}

                {/* ICON */}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorMap[key] || "from-gray-700 to-gray-900"
                    } flex items-center justify-center mb-4`}
                >
                  {iconMap[key]}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-white">
                  {p.title}
                </h3>

                {/* PROGRAM */}
                <p className="text-[#00f0ff] text-sm mt-1">
                  {p.program}
                </p>

                {/* PRODUCT */}
                <p className="text-white/80 mt-3">
                  {p.product}
                </p>

                {/* TARGET MARKET (FIXED + SAFE) */}
                <div className="mt-4">
                  <p className="text-white/60 text-xs uppercase mb-2">
                    {t("price.meta.targetMarketLabel")}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(p.targetMarket) && p.targetMarket.length > 0 ? (
                      p.targetMarket.map((m, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80"
                        >
                          {m}
                        </span>
                      ))
                    ) : (<span className="text-xs text-white/40">
                      Not defined
                    </span>
                    )}
                  </div>
                </div>

                {/* DELIVERABLES */}
                <div className="mt-4">
                  <p className="text-white/60 text-xs uppercase mb-2">
                    {meta.keyDeliverables}
                  </p>

                  <ul className="space-y-2">
                    {asArray(p.deliverables).map((d, i) => (
                      <li key={i} className="flex gap-2">
                        <Check size={14} className="text-[#00f0ff]" />
                        <span className="text-sm text-white/80">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRICE */}
                <div className="mt-5 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white/60 text-xs uppercase">
                    {meta.startFrom}
                  </p>
                  <p className="text-white font-semibold">
                    {p.price}
                  </p>
                </div>

                {/* CTA */}
                <button className="mt-5 w-full py-2 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-black font-semibold">
                  {p.cta}
                </button>

              </div>
            );
          })}

        </div>

        {/* COMPLIANCE */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#00f0ff] mb-2">
            <Shield size={18} />
            <span className="font-semibold">
              {compliance.label}
            </span>
          </div>

          <p className="text-white/70">
            {compliance.description}
          </p>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;