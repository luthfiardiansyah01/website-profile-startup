import React, { useState } from "react";
import { ArrowRight, Globe, Building, Lightbulb, Target, Rocket, Award } from "lucide-react";
import ProgramCard from "../ui/ProgramCard";
import { useTranslation } from "react-i18next";

const ProgramSection = () => {
  const [activeTab, setActiveTab] = useState("industry");
  const { t } = useTranslation();

  // ✅ ICON MAP (per program index per tab)
  const iconMap: Record<string, React.ReactNode[]> = {
    industry: [
      <Globe className="w-6 h-6 text-white" />,
      <Building className="w-6 h-6 text-white" />,
      <Lightbulb className="w-6 h-6 text-white" />
    ],
    climate: [
      <Target className="w-6 h-6 text-white" />,
      <Rocket className="w-6 h-6 text-white" />,
      <Award className="w-6 h-6 text-white" />
    ],
    ai: [
      <Lightbulb className="w-6 h-6 text-white" />,
      <Building className="w-6 h-6 text-white" />,
      <Rocket className="w-6 h-6 text-white" />
    ]
  };

  // ✅ COLOR MAP (prevents "undefined" Tailwind bug)
  const colorMap: Record<string, string[]> = {
    industry: [
      "from-[#00f0ff] to-[#059669]",
      "from-[#00f0ff] to-[#2563eb]",
      "from-[#ff00c8] to-[#9c27b0]"
    ],
    climate: [
      "from-[#00f0ff] to-[#3b82f6]",
      "from-[#ff00c8] to-[#9c27b0]",
      "from-[#00f0ff] to-[#2563eb]"
    ],
    ai: [
      "from-[#ff00c8] to-[#9c27b0]",
      "from-[#00f0ff] to-[#2563eb]",
      "from-[#00f0ff] to-[#3b82f6]"
    ]
  };

  // ✅ GET DATA FROM i18n (SAFE)
  const programs =
    (t(`program.tabs.${activeTab}.items`, {
      returnObjects: true
    }) as any[]) || [];

  // ✅ MERGE UI + CONTENT
  const programsWithIcons = programs.map((p, i) => ({
    ...p,
    icon: iconMap[activeTab]?.[i] ?? <div className="w-2 h-2 bg-white rounded-full" />,
    color: colorMap[activeTab]?.[i] ?? "from-gray-500 to-gray-700"
  }));

  return (
    <section id="programs" className="py-20 relative">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#00f0ff] uppercase tracking-wider text-sm font-medium">
            {t("program.label")}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
            {t("program.title")}
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            {t("program.description")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1">
            {["industry", "climate", "ai"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#00f0ff]/70 text-[#0a0a1f]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t(`program.tabs.${tab}.label`)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programsWithIcons.map((program, i) => (
            <ProgramCard key={i} program={program} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#00f0ff] transition-colors group"
          >
            <span>{t("program.viewAll")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProgramSection;