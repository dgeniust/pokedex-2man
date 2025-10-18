import React from "react";
export const PokemonDetailPanel = ({
  pokemon,
  evolutionChain,
  onPokemonSelect,
  onClose,
}) => {
  if (!pokemon) {
    return (
      <div className="w-96 bg-white border-4 border-black p-6 flex items-center justify-center">
        <p className="text-black font-bold text-center uppercase">
          Select a Pokémon to view details
        </p>
      </div>
    );
  }

  const getTypeColor = (type) => {
    const colors = {
      Fire: "bg-red-600",
      Water: "bg-blue-500",
      Grass: "bg-green-600",
      Electric: "bg-yellow-400",
      Psychic: "bg-pink-600",
      Ice: "bg-cyan-400",
      Dragon: "bg-indigo-700",
      Dark: "bg-gray-900",
      Fairy: "bg-pink-400",
      Normal: "bg-gray-400",
      Fighting: "bg-red-700",
      Flying: "bg-blue-400",
      Poison: "bg-purple-600",
      Ground: "bg-yellow-700",
      Rock: "bg-amber-800",
      Bug: "bg-green-700",
      Ghost: "bg-purple-700",
      Steel: "bg-gray-500",
    };
    return colors[type] || "bg-gray-400";
  };

  const getStatColor = (label) => {
    const colors = {
      HP: "bg-red-600",
      Att: "bg-orange-500",
      Def: "bg-yellow-500",
      Spa: "bg-blue-500",
      Spd: "bg-green-500",
      Spe: "bg-pink-500",
    };
    return colors[label] || "bg-gray-500";
  };

  const stats = [
    { label: "HP", value: pokemon.HP, max: 255 },
    { label: "Att", value: pokemon.Att, max: 255 },
    { label: "Def", value: pokemon.Def, max: 255 },
    { label: "Spa", value: pokemon.Spa, max: 255 },
    { label: "Spd", value: pokemon.Spd, max: 255 },
    { label: "Spe", value: pokemon.Spe, max: 255 },
  ];

  const getWeaknesses = () => {
    const weaknesses = [];
    const typeMap = {
      "Against Normal": "Normal",
      "Against Fire": "Fire",
      "Against Water": "Water",
      "Against Electric": "Electric",
      "Against Grass": "Grass",
      "Against Ice": "Ice",
      "Against Fighting": "Fighting",
      "Against Poison": "Poison",
      "Against Ground": "Ground",
      "Against Flying": "Flying",
      "Against Psychic": "Psychic",
      "Against Bug": "Bug",
      "Against Rock": "Rock",
      "Against Ghost": "Ghost",
      "Against Dragon": "Dragon",
      "Against Dark": "Dark",
      "Against Steel": "Steel",
      "Against Fairy": "Fairy",
    };

    Object.keys(typeMap).forEach((key) => {
      const value = pokemon[key];
      if (value && value > 1) {
        weaknesses.push({ type: typeMap[key], multiplier: value });
      }
    });

    return weaknesses;
  };

  const weaknesses = getWeaknesses();

  return (
    <div className="w-96 bg-white border-4 border-black shadow-[8px_8px_0_0_#000] overflow-y-auto h-full">
      <div className="p-6">
        {/* Header with close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-black border-4 border-black text-white font-extrabold flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Pokemon Number and Name */}
        <div className="text-center mb-4">
          <p className="text-black text-sm font-bold mb-2">#{pokemon.Number}</p>
          <h2 className="text-black text-3xl font-extrabold uppercase mb-2">
            {pokemon.Name}
          </h2>
        </div>

        {/* Types */}
        <div className="flex justify-center gap-2 mb-6">
          <span
            className={`px-4 py-2 ${getTypeColor(
              pokemon.Type1
            )} border-4 border-black text-white text-sm font-extrabold uppercase shadow-[4px_4px_0_0_#000]`}
          >
            {pokemon.Type1}
          </span>
          {pokemon.Type2 && (
            <span
              className={`px-4 py-2 ${getTypeColor(
                pokemon.Type2
              )} border-4 border-black text-white text-sm font-extrabold uppercase shadow-[4px_4px_0_0_#000]`}
            >
              {pokemon.Type2}
            </span>
          )}
        </div>

        {/* Pokemon Image */}
        <div className="bg-transparent border-4 border-black p-6 mb-6 shadow-[4px_4px_0_0_#000]">
          <img
            src={pokemon.ImgURL}
            alt={pokemon.Name}
            className="w-full h-48 object-contain"
          />
        </div>

        {/* Abilities */}
        {pokemon.Abilities && pokemon.Abilities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-black text-xs font-extrabold uppercase mb-3 border-b-4 border-black pb-2">
              Abilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.Abilities.map((ability, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 bg-cyan-300 border-4 border-black text-black text-sm font-bold uppercase shadow-[2px_2px_0_0_#000]"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats with Bar Chart */}
        <div className="mb-6">
          <h3 className="text-black text-xs font-extrabold uppercase mb-4 border-b-4 border-black pb-2">
            Stats
          </h3>

          <div className="space-y-3">
            {stats.map((stat) => {
              const percentage = (stat.value / stat.max) * 100;
              return (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-black font-extrabold text-xs uppercase w-12">
                      {stat.label}
                    </span>
                    <span className="text-black font-extrabold text-sm">
                      {stat.value}
                    </span>
                  </div>
                  <div className="w-full h-6 bg-gray-200 border-4 border-black">
                    <div
                      className={`h-full ${getStatColor(
                        stat.label
                      )} border-r-4 border-black`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Stats */}
          <div className="mt-4 bg-purple-400 border-4 border-black p-3 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between">
              <span className="text-black font-extrabold uppercase">Total</span>
              <span className="text-black font-extrabold text-xl">
                {pokemon.BST}
              </span>
            </div>
          </div>
        </div>

        {/* Weaknesses */}
        {weaknesses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-black text-xs font-extrabold uppercase mb-3 border-b-4 border-black pb-2">
              Weaknesses
            </h3>
            <div className="flex flex-wrap gap-2">
              {weaknesses.map((weakness, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-2 ${getTypeColor(
                    weakness.type
                  )} border-4 border-black text-white text-sm font-bold uppercase shadow-[2px_2px_0_0_#000]`}
                >
                  {weakness.type} ×{weakness.multiplier}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pokemon Info */}
        <div>
          <h3 className="text-black text-xs font-extrabold uppercase mb-3 border-b-4 border-black pb-2">
            Pokemon Info
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-pink-200 border-4 border-black p-3 shadow-[2px_2px_0_0_#000]">
              <p className="text-black text-xs font-bold uppercase mb-1">
                Height
              </p>
              <p className="text-black text-lg font-extrabold">
                {pokemon.Height ? `${pokemon.Height}m` : "-"}
              </p>
            </div>
            <div className="bg-blue-200 border-4 border-black p-3 shadow-[2px_2px_0_0_#000]">
              <p className="text-black text-xs font-bold uppercase mb-1">
                Weight
              </p>
              <p className="text-black text-lg font-extrabold">
                {pokemon.Weight ? `${pokemon.Weight}kg` : "-"}
              </p>
            </div>
            <div className="bg-green-200 border-4 border-black p-3 shadow-[2px_2px_0_0_#000]">
              <p className="text-black text-xs font-bold uppercase mb-1">
                Generation
              </p>
              <p className="text-black text-lg font-extrabold">
                {pokemon.Generation || "-"}
              </p>
            </div>
            <div className="bg-yellow-200 border-4 border-black p-3 shadow-[2px_2px_0_0_#000]">
              <p className="text-black text-xs font-bold uppercase mb-1">
                Catch Rate
              </p>
              <p className="text-black text-lg font-extrabold">
                {pokemon.CatchRate || "-"}
              </p>
            </div>
          </div>
        </div>
        {evolutionChain && evolutionChain.length > 0 && (
          <div className="mb-6">
            <h3 className="text-black text-xs font-extrabold uppercase mb-3 border-b-4 border-black pb-2">
              Evolutions
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {evolutionChain.map((evoPokemon, idx) => {
                const isCurrent = evoPokemon.Name === pokemon.Name;
                return (
                  <React.Fragment key={evoPokemon.Name}>
                    {idx > 0 && (
                      <div className="flex items-center justify-center text-2xl font-bold text-black">
                        →
                      </div>
                    )}
                    <button
                      onClick={() => onPokemonSelect(evoPokemon)}
                      className={`flex flex-col items-center p-2 border-4 border-black transition-all
                          w-28 h-28 justify-center /* <-- THÊM DÒNG NÀY */
                          ${
                            isCurrent
                              ? "bg-yellow-300 shadow-[4px_4px_0_0_#000]"
                              : "bg-gray-100 hover:bg-yellow-200"
                          }`}
                      title={`View ${evoPokemon.Name}`}
                    >
                      <img
                        src={evoPokemon.ImgURL}
                        alt={evoPokemon.Name}
                        className="w-16 h-16 object-contain"
                      />
                      <span className="text-black text-xs font-bold uppercase mt-1 text-center /* <-- THÊM text-center */">
                        {evoPokemon.Name}
                      </span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
