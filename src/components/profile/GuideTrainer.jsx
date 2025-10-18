import { Book, ChevronRight, Heart, Zap } from "lucide-react";
import React from "react";

const GuideTrainer = () => {
  const getTypeColor = (type) => {
    const colors = {
      Normal: "bg-gray-400",
      Fire: "bg-red-500",
      Water: "bg-blue-500",
      Electric: "bg-yellow-400",
      Grass: "bg-green-500",
      Ice: "bg-cyan-400",
      Fighting: "bg-orange-700",
      Poison: "bg-purple-500",
      Ground: "bg-yellow-700",
      Flying: "bg-indigo-400",
      Psychic: "bg-pink-500",
      Bug: "bg-lime-500",
      Rock: "bg-yellow-800",
      Ghost: "bg-purple-700",
      Dragon: "bg-indigo-700",
      Dark: "bg-gray-800",
      Steel: "bg-gray-500",
      Fairy: "bg-pink-400",
    };
    return colors[type] || "bg-gray-400";
  };
  return (
    <div className="bg-white border-8 border-black shadow-[12px_12px_0px_#000] p-6">
      <h3 className="text-3xl font-black mb-6 flex items-center gap-2">
        <Book />
        POKÉMON GUIDE
      </h3>
      <div className="space-y-4">
        <div className="bg-red-100 border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <h4 className="font-black text-xl mb-2 flex items-center gap-2">
            <Heart className="text-red-500" />
            TYPE EFFECTIVENESS
          </h4>
          <p className="font-bold">
            Learn which types are strong or weak against others!
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
            {["Fire", "Water", "Grass", "Electric", "Ice", "Fighting"].map(
              (type) => (
                <div
                  key={type}
                  className={`${getTypeColor(
                    type
                  )} text-white text-center py-2 border-2 border-black font-bold text-sm`}
                >
                  {type}
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-yellow-100 border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <h4 className="font-black text-xl mb-2 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            EVOLUTION GUIDE
          </h4>
          <p className="font-bold mb-3">Different ways Pokémon can evolve:</p>
          <div className="space-y-2">
            <div className="bg-white border-2 border-black p-3 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-black">Level Up</p>
                <p className="text-sm">Evolve by reaching a certain level</p>
              </div>
            </div>
            <div className="bg-white border-2 border-black p-3 flex items-center gap-3">
              <span className="text-2xl">💎</span>
              <div>
                <p className="font-black">Evolution Stones</p>
                <p className="text-sm">
                  Use special stones to trigger evolution
                </p>
              </div>
            </div>
            <div className="bg-white border-2 border-black p-3 flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-black">Trading</p>
                <p className="text-sm">Some Pokémon evolve when traded</p>
              </div>
            </div>
            <div className="bg-white border-2 border-black p-3 flex items-center gap-3">
              <span className="text-2xl">💖</span>
              <div>
                <p className="font-black">Friendship</p>
                <p className="text-sm">High friendship can trigger evolution</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-100 border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <h4 className="font-black text-xl mb-2">🎯 CATCHING TIPS</h4>
          <ul className="space-y-2 font-bold">
            <li className="flex items-start gap-2">
              <ChevronRight className="mt-1 flex-shrink-0" />
              <span>Lower the wild Pokémon's HP for better catch rate</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="mt-1 flex-shrink-0" />
              <span>Status conditions like sleep increase catch rate</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="mt-1 flex-shrink-0" />
              <span>Use better Poké Balls for tougher Pokémon</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="mt-1 flex-shrink-0" />
              <span>Some Pokémon are easier to catch at night</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-100 border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
          <h4 className="font-black text-xl mb-2">⭐ LEGENDARY POKÉMON</h4>
          <p className="font-bold">
            Ultra-rare and powerful Pokémon that appear only once per game.
            Prepare carefully before challenging them!
          </p>
          <div className="mt-3 bg-black text-yellow-400 p-3 border-2 border-black">
            <p className="font-black text-center">SAVE BEFORE BATTLE!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideTrainer;
