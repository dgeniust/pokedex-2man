import { Award } from "lucide-react";
import React, { useState, useEffect } from "react";

const PokemonBag = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
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
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/dgeniust/pokedex-2man/refs/heads/main/pokemon_with_img.json"
        );
        let text = await res.text();
        text = text.replace(/NaN/g, "null");
        const data = JSON.parse(text);

        const formatted = data.slice(0, 50).map((p) => {
          let abilities = [];
          try {
            abilities = JSON.parse(
              p.Abilities && p.Abilities !== "NULL"
                ? p.Abilities.replace(/'/g, '"')
                : "[]"
            );
          } catch {
            abilities = [];
          }

          return {
            Number: p.Number ?? 0,
            Name: p.Name ?? "Unknown",
            Type1: p["Type 1"] && p["Type 1"] !== "NULL" ? p["Type 1"] : null,
            Type2: p["Type 2"] && p["Type 2"] !== "NULL" ? p["Type 2"] : null,
            Abilities: abilities,
            HP: p.HP ?? 0,
            Att: p.Att ?? 0,
            Def: p.Def ?? 0,
            Spa: p.Spa ?? 0,
            Spd: p.Spd ?? 0,
            Spe: p.Spe ?? 0,
            BST: p.BST ?? 0,
            ImgURL: p.ImgURL ?? "",
            CatchRate: p["Catch Rate"] ?? 0,
            Generation: p.Generation ?? 0,
          };
        });

        setPokemonList(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);
  return (
    <div className="space-y-6">
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_#000] p-6">
        <h3 className="text-3xl font-black mb-6 flex items-center gap-2">
          <Award />
          MY POKÉMON
        </h3>
        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl font-black animate-pulse">LOADING...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemonList.slice(0, 12).map((pokemon, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPokemon(pokemon)}
                className="bg-gradient-to-br from-blue-200 to-purple-200 border-4 border-black p-4 shadow-[6px_6px_0px_#000] transform hover:scale-105 hover:rotate-2 transition-all cursor-pointer"
              >
                <div className="bg-white border-2 border-black p-2 mb-2">
                  <img
                    src={pokemon.ImgURL}
                    alt={pokemon.Name}
                    className="w-full h-32 object-contain"
                  />
                </div>
                <div className="bg-black text-white px-2 py-1 border-2 border-black mb-2">
                  <p className="font-black text-sm text-center">#{idx + 1}</p>
                </div>
                <p className="font-black text-center mb-2">{pokemon.Name}</p>
                <div className="flex gap-1 justify-center">
                  {pokemon.Type1 && (
                    <span
                      className={`${getTypeColor(
                        pokemon.Type1
                      )} text-white px-2 py-1 text-xs font-bold border-2 border-black`}
                    >
                      {pokemon.Type1}
                    </span>
                  )}
                  {pokemon.Type2 && (
                    <span
                      className={`${getTypeColor(
                        pokemon.Type2
                      )} text-white px-2 py-1 text-xs font-bold border-2 border-black`}
                    >
                      {pokemon.Type2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pokemon Detail Modal */}
      {selectedPokemon && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPokemon(null)}
        >
          <div
            className="bg-white border-8 border-black shadow-[16px_16px_0px_#000] p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-black">{selectedPokemon.Name}</h3>
              <button
                onClick={() => setSelectedPokemon(null)}
                className="bg-red-500 text-white font-black px-4 py-2 border-4 border-black hover:bg-red-600"
              >
                ✕
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-200 to-orange-200 border-4 border-black p-4">
                <img
                  src={selectedPokemon.ImgURL}
                  alt={selectedPokemon.Name}
                  className="w-full h-64 object-contain"
                />
              </div>
              <div className="space-y-3">
                <div className="bg-black text-white p-3 border-4 border-black">
                  <p className="font-black">#{selectedPokemon.Number}</p>
                </div>
                <div className="flex gap-2">
                  {selectedPokemon.Type1 && (
                    <span
                      className={`${getTypeColor(
                        selectedPokemon.Type1
                      )} text-white px-3 py-2 font-bold border-2 border-black flex-1 text-center`}
                    >
                      {selectedPokemon.Type1}
                    </span>
                  )}
                  {selectedPokemon.Type2 && (
                    <span
                      className={`${getTypeColor(
                        selectedPokemon.Type2
                      )} text-white px-3 py-2 font-bold border-2 border-black flex-1 text-center`}
                    >
                      {selectedPokemon.Type2}
                    </span>
                  )}
                </div>
                <div className="bg-blue-100 border-4 border-black p-3">
                  <p className="font-black mb-2">BASE STATS</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-bold">HP:</span>
                      <span className="font-black">{selectedPokemon.HP}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Attack:</span>
                      <span className="font-black">{selectedPokemon.Att}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Defense:</span>
                      <span className="font-black">{selectedPokemon.Def}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Sp. Atk:</span>
                      <span className="font-black">{selectedPokemon.Spa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Sp. Def:</span>
                      <span className="font-black">{selectedPokemon.Spd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Speed:</span>
                      <span className="font-black">{selectedPokemon.Spe}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t-2 border-black">
                      <span className="font-bold">Total:</span>
                      <span className="font-black text-lg">
                        {selectedPokemon.BST}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedPokemon.Abilities.length > 0 && (
                  <div className="bg-purple-100 border-4 border-black p-3">
                    <p className="font-black mb-2">ABILITIES</p>
                    <div className="space-y-1">
                      {selectedPokemon.Abilities.map((ability, idx) => (
                        <div
                          key={idx}
                          className="bg-white border-2 border-black px-2 py-1"
                        >
                          <span className="font-bold text-sm">{ability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonBag;
