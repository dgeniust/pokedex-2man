import { Star } from "lucide-react";
import React from "react";

const InfoTrainer = () => {
  // Trainer Info
  const trainerInfo = {
    name: "Ash Ketchum",
    title: "Pokémon Master",
    id: "PKM-001337",
    level: 42,
    badges: 8,
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    joinDate: "March 2024",
    hometown: "Pallet Town",
    caught: 150,
    battlesWon: 342,
    money: 12450,
  };
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Trainer Card */}
      <div className="md:col-span-1">
        <div className="bg-white border-8 border-black shadow-[12px_12px_0px_#000] p-6 transform rotate-1">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-300 border-4 border-black p-4 mb-4">
            <img
              src={trainerInfo.avatar}
              alt="Trainer"
              className="w-full h-48 object-contain"
            />
          </div>
          <div className="bg-black text-white border-4 border-black p-4 mb-4">
            <h2 className="text-2xl font-black mb-1">{trainerInfo.name}</h2>
            <p className="text-yellow-400 font-bold">{trainerInfo.title}</p>
            <p className="text-gray-400 text-sm mt-2">ID: {trainerInfo.id}</p>
          </div>
          <div className="bg-red-500 border-4 border-black p-4 text-white font-black text-center">
            <p className="text-3xl">LV. {trainerInfo.level}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="md:col-span-2 space-y-4">
        <div className="bg-white border-8 border-black shadow-[12px_12px_0px_#000] p-6 transform -rotate-1">
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" />
            TRAINER STATS
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-200 border-4 border-black p-4">
              <p className="text-sm font-bold text-gray-700">BADGES</p>
              <p className="text-3xl font-black">{trainerInfo.badges}/8</p>
            </div>
            <div className="bg-green-200 border-4 border-black p-4">
              <p className="text-sm font-bold text-gray-700">POKÉMON</p>
              <p className="text-3xl font-black">{trainerInfo.caught}</p>
            </div>
            <div className="bg-purple-200 border-4 border-black p-4">
              <p className="text-sm font-bold text-gray-700">BATTLES WON</p>
              <p className="text-3xl font-black">{trainerInfo.battlesWon}</p>
            </div>
            <div className="bg-yellow-200 border-4 border-black p-4">
              <p className="text-sm font-bold text-gray-700">MONEY</p>
              <p className="text-3xl font-black">₽{trainerInfo.money}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-8 border-black shadow-[12px_12px_0px_#000] p-6">
          <h3 className="text-2xl font-black mb-4">📍 INFORMATION</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b-4 border-black pb-2">
              <span className="font-bold">Hometown:</span>
              <span className="font-black">{trainerInfo.hometown}</span>
            </div>
            <div className="flex justify-between border-b-4 border-black pb-2">
              <span className="font-bold">Joined:</span>
              <span className="font-black">{trainerInfo.joinDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Trainer ID:</span>
              <span className="font-black">{trainerInfo.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTrainer;
