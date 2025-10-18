import React, { useState, useEffect } from "react";
import { User, Package, Award, Book } from "lucide-react";
import InfoTrainer from "../components/profile/InfoTrainer";
import ItemsTab from "../components/profile/ItemsTab";
import PokemonBag from "../components/profile/PokemonBag";
import GuideTrainer from "../components/profile/GuideTrainer";

export default function TrainerProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "PROFILE", icon: <User size={24} /> },
    { id: "items", label: "ITEMS", icon: <Package size={24} /> },
    { id: "pokemon", label: "POKÉMON", icon: <Award size={24} /> },
    { id: "guide", label: "GUIDE", icon: <Book size={24} /> },
  ];

  return (
    <div className="bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 min-h-screen p-4 md:p-8 font-mono">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_#000] p-6 transform -rotate-1">
          <h1 className="text-4xl md:text-6xl font-black text-center tracking-tighter">
            ⚡ TRAINER PROFILE ⚡
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-black border-8 border-black shadow-[12px_12px_0px_#666] p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-black shadow-[4px_4px_0px_#000]"
                    : "bg-white text-black hover:bg-yellow-200"
                } border-4 border-black font-black py-4 px-4 transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {/* PROFILE TAB */}
        {activeTab === "profile" && <InfoTrainer />}

        {/* ITEMS TAB */}
        {activeTab === "items" && <ItemsTab />}

        {/* POKEMON TAB */}
        {activeTab === "pokemon" && <PokemonBag />}

        {/* GUIDE TAB */}
        {activeTab === "guide" && <GuideTrainer />}
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-10 right-10 w-16 h-16 bg-black rotate-12 opacity-10 pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-24 h-24 bg-black -rotate-12 opacity-10 pointer-events-none" />
    </div>
  );
}
