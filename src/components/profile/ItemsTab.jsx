import { Package } from "lucide-react";
import React from "react";

const ItemsTab = () => {
  // Items Data
  const items = [
    { id: 1, name: "Poké Ball", count: 25, icon: "🔴", rarity: "common" },
    { id: 2, name: "Great Ball", count: 15, icon: "🔵", rarity: "uncommon" },
    { id: 3, name: "Ultra Ball", count: 8, icon: "🟡", rarity: "rare" },
    { id: 4, name: "Master Ball", count: 1, icon: "🟣", rarity: "legendary" },
    { id: 5, name: "Potion", count: 30, icon: "🧪", rarity: "common" },
    { id: 6, name: "Super Potion", count: 20, icon: "💉", rarity: "uncommon" },
    { id: 7, name: "Revive", count: 12, icon: "💚", rarity: "rare" },
    { id: 8, name: "Thunder Stone", count: 3, icon: "⚡", rarity: "rare" },
    { id: 9, name: "Fire Stone", count: 2, icon: "🔥", rarity: "rare" },
    { id: 10, name: "Rare Candy", count: 5, icon: "🍬", rarity: "legendary" },
  ];
  const getRarityColor = (rarity) => {
    const colors = {
      common: "bg-gray-300",
      uncommon: "bg-green-400",
      rare: "bg-blue-400",
      legendary: "bg-purple-500",
    };
    return colors[rarity] || "bg-gray-300";
  };
  return (
    <div className="bg-white border-8 border-black shadow-[12px_12px_0px_#000] p-6">
      <h3 className="text-3xl font-black mb-6 flex items-center gap-2">
        <Package />
        ITEM BAG
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${getRarityColor(
              item.rarity
            )} border-4 border-black p-4 shadow-[6px_6px_0px_#000] transform hover:scale-105 transition-transform cursor-pointer`}
          >
            <div className="text-5xl text-center mb-2">{item.icon}</div>
            <p className="font-black text-center text-sm mb-1">{item.name}</p>
            <div className="bg-black text-white text-center py-1 border-2 border-black">
              <span className="font-black">x{item.count}</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs font-bold uppercase">{item.rarity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsTab;
