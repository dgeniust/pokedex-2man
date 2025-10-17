import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ArrowUpDown } from "lucide-react";

const PokemonCard = ({ pokemon, onClick }) => {
  const getTypeColor = (type) => {
    const colors = {
      Fire: "#F08030",
      Water: "#6890F0",
      Grass: "#78C850",
      Electric: "#F8D030",
      Psychic: "#F85888",
      Ice: "#98D8D8",
      Dragon: "#7038F8",
      Dark: "#705848",
      Fairy: "#EE99AC",
      Normal: "#A8A878",
      Fighting: "#C03028",
      Flying: "#A890F0",
      Poison: "#A040A0",
      Ground: "#E0C068",
      Rock: "#B8A038",
      Bug: "#A8B820",
      Ghost: "#705898",
      Steel: "#B8B8D0",
    };
    return colors[type] || "#A8A878";
  };

  return (
    <div
      onClick={() => onClick(pokemon)}
      className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-gray-300"
    >
      <div className="text-center mb-3">
        <div className="text-gray-400 text-xs font-semibold mb-1">
          N°{pokemon.Number}
        </div>
        <img
          src={pokemon.ImgURL}
          alt={pokemon.Name}
          className="w-24 h-24 mx-auto mb-3 object-contain"
        />
        <h3 className="text-lg font-bold text-gray-800 mb-3">{pokemon.Name}</h3>
        <div className="flex justify-center gap-2">
          <span
            className="px-4 py-1 rounded-full text-white text-xs font-semibold uppercase"
            style={{ backgroundColor: getTypeColor(pokemon.Type1) }}
          >
            {pokemon.Type1}
          </span>
          {pokemon.Type2 && (
            <span
              className="px-4 py-1 rounded-full text-white text-xs font-semibold uppercase"
              style={{ backgroundColor: getTypeColor(pokemon.Type2) }}
            >
              {pokemon.Type2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const PokemonDetailModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const getTypeColor = (type) => {
    const colors = {
      Fire: "#F08030",
      Water: "#6890F0",
      Grass: "#78C850",
      Electric: "#F8D030",
      Psychic: "#F85888",
      Ice: "#98D8D8",
      Dragon: "#7038F8",
      Dark: "#705848",
      Fairy: "#EE99AC",
      Normal: "#A8A878",
      Fighting: "#C03028",
      Flying: "#A890F0",
      Poison: "#A040A0",
      Ground: "#E0C068",
      Rock: "#B8A038",
      Bug: "#A8B820",
      Ghost: "#705898",
      Steel: "#B8B8D0",
    };
    return colors[type] || "#A8A878";
  };

  const getStatColor = (stat) => {
    const colors = {
      HP: "#FF5959",
      ATK: "#F5AC78",
      DEF: "#FAE078",
      SPA: "#9DB7F5",
      SPD: "#A7DB8D",
      SPE: "#FA92B2",
    };
    return colors[stat] || "#A8A878";
  };

  const stats = [
    { label: "HP", value: pokemon.HP, key: "HP" },
    { label: "ATK", value: pokemon.Att, key: "ATK" },
    { label: "DEF", value: pokemon.Def, key: "DEF" },
    { label: "SPA", value: pokemon.Spa, key: "SPA" },
    { label: "SPD", value: pokemon.Spd, key: "SPD" },
    { label: "SPE", value: pokemon.Spe, key: "SPE" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left Section */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <div className="text-gray-400 text-sm font-semibold mb-2">
                #{pokemon.Number}
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {pokemon.Name}
              </h2>
              <div className="text-gray-500 text-sm mb-3">Emperor Pokémon</div>
              <div className="flex justify-center gap-2 mb-6">
                <span
                  className="px-5 py-2 rounded-full text-white text-sm font-bold uppercase"
                  style={{ backgroundColor: getTypeColor(pokemon.Type1) }}
                >
                  {pokemon.Type1}
                </span>
                {pokemon.Type2 && (
                  <span
                    className="px-5 py-2 rounded-full text-white text-sm font-bold uppercase"
                    style={{ backgroundColor: getTypeColor(pokemon.Type2) }}
                  >
                    {pokemon.Type2}
                  </span>
                )}
              </div>
            </div>

            <img
              src={pokemon.ImgURL}
              alt={pokemon.Name}
              className="w-64 h-64 object-contain mb-6"
            />

            {/* Abilities */}
            <div className="w-full bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                ABILITIES
              </h3>
              <div className="flex gap-2 justify-center">
                {pokemon.Abilities.slice(0, 2).map((ability, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-gray-700 border-2 border-gray-200"
                  >
                    {ability}
                  </button>
                ))}
              </div>
            </div>

            {/* Height & Weight */}
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-sm font-bold text-gray-700 mb-1">
                  HEIGHT
                </div>
                <div className="text-lg font-bold text-gray-800">1.7m</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-sm font-bold text-gray-700 mb-1">
                  WEIGHT
                </div>
                <div className="text-lg font-bold text-gray-800">84.5kg</div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                POKÉDEX ENTRY
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                It swims as fast as a jet boat. The edges of its wings are sharp
                and can slice apart drifting ice.
              </p>
            </div>

            {/* Weaknesses */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                WEAKNESSES
              </h3>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-400"></div>
                <div className="w-8 h-8 rounded-full bg-orange-400"></div>
                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              </div>
            </div>

            {/* Base XP */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-2">BASE EXP</h3>
              <div className="text-2xl font-bold text-gray-800">239</div>
            </div>

            {/* Stats */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4">STATS</h3>
              <div className="flex gap-2 mb-2">
                {stats.map((stat) => (
                  <div key={stat.key} className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1"
                      style={{ backgroundColor: getStatColor(stat.key) }}
                    >
                      {stat.label}
                    </div>
                    <div className="text-xs font-bold text-gray-700">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-bold">
                <span>TOT</span>
                <span>{pokemon.BST}</span>
              </div>
            </div>

            {/* Evolution */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">
                EVOLUTION
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <img
                    src={pokemon.ImgURL}
                    alt=""
                    className="w-16 h-16 object-contain mb-1"
                  />
                  <div className="text-xs text-gray-500">Lvl 16</div>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-center">
                  <img
                    src={pokemon.ImgURL}
                    alt=""
                    className="w-16 h-16 object-contain mb-1"
                  />
                  <div className="text-xs text-gray-500">Lvl 36</div>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-center">
                  <img
                    src={pokemon.ImgURL}
                    alt=""
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/dgeniust/pokedex-2man/refs/heads/main/pokemon_with_img.json"
        );
        let text = await res.text();
        text = text.replace(/NaN/g, "null");
        const data = JSON.parse(text);

        const formatted = data.map((p) => {
          let abilities = [];
          try {
            abilities = JSON.parse(p.Abilities.replace(/'/g, '"'));
          } catch {
            abilities = [];
          }

          return {
            Number: p.Number,
            Name: p.Name,
            Type1: p["Type 1"],
            Type2: p["Type 2"],
            Abilities: abilities,
            HP: p.HP,
            Att: p.Att,
            Def: p.Def,
            Spa: p.Spa,
            Spd: p.Spd,
            Spe: p.Spe,
            BST: p.BST,
            Generation: p.Generation,
            ExperienceType: p["Experience type"],
            ExperienceToLevel100: p["Experience to level 100"],
            CatchRate: p["Catch Rate"],
            ImgURL: p.ImgURL,
          };
        });

        setPokemonList(formatted);
        setFilteredList(formatted.slice(0, 100));
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = [...pokemonList];

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.Number.toString().includes(searchTerm)
      );
    }

    if (rangeFrom) {
      filtered = filtered.filter((p) => p.Number >= parseInt(rangeFrom));
    }

    if (rangeTo) {
      filtered = filtered.filter((p) => p.Number <= parseInt(rangeTo));
    }

    setFilteredList(filtered.slice(0, 100));
  }, [searchTerm, rangeFrom, rangeTo, pokemonList]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-gray-400 font-semibold">Home</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-red-500 font-bold">Pokedex</span>
            </div>
            <span className="text-gray-400 font-semibold">Videogames</span>
            <span className="text-gray-400 font-semibold">GCC Pokemon</span>
            <span className="text-gray-400 font-semibold">TV Pokemon</span>
            <span className="text-gray-400 font-semibold">Play! Pokemon</span>
            <span className="text-gray-400 font-semibold">News</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search your Pokémon!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-red-400 focus:outline-none text-gray-600"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
            <Search size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm font-semibold text-gray-700">
            <ArrowUpDown size={16} />
            Ascending
            <ChevronDown size={16} />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">from</span>
            <input
              type="number"
              value={rangeFrom}
              onChange={(e) => setRangeFrom(e.target.value)}
              placeholder="387"
              className="w-20 px-3 py-2 rounded-lg border border-gray-300 text-center text-sm"
            />
            <span className="text-sm text-gray-600">to</span>
            <input
              type="number"
              value={rangeTo}
              onChange={(e) => setRangeTo(e.target.value)}
              placeholder="896"
              className="w-20 px-3 py-2 rounded-lg border border-gray-300 text-center text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
            <span className="w-4 h-4 rounded-full bg-gray-300"></span>
            Type
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
            Weaknesses
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
            Ability
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
            Height
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
            Weight
            <ChevronDown size={16} />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <ChevronDown size={20} className="text-white" />
          </button>
        </div>

        {/* Pokemon Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredList.map((pokemon, idx) => (
              <PokemonCard
                key={`${pokemon.Number}-${idx}`}
                pokemon={pokemon}
                onClick={setSelectedPokemon}
              />
            ))}
          </div>
        )}
      </div>

      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}
