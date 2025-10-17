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

const PokemonSidebar = ({ pokemon, onClose, allPokemons }) => {
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

  const getEvolutionChain = (pokemon, allPokemons) => {
    const sorted = allPokemons
      .filter((p) => p.Type1 === pokemon.Type1 && p.Type2 === pokemon.Type2)
      .sort((a, b) => a.Number - b.Number);

    // Tìm index Pokémon hiện tại
    const index = sorted.findIndex((p) => p.Number === pokemon.Number);
    if (index === -1) return [];

    // Tìm start: đi ngược để tìm 0 đầu tiên mà trước nó là 1
    let start = index;
    for (let i = index; i >= 0; i--) {
      if (
        sorted[i].FinalEvolution === 0 &&
        (i === 0 || sorted[i - 1].FinalEvolution === 1)
      ) {
        start = i;
        break;
      }
    }

    // Tìm end: đi xuôi để gặp 0 tiếp theo sau 1
    let end = index;
    for (let i = index + 1; i < sorted.length; i++) {
      if (sorted[i].FinalEvolution === 0) {
        end = i;
        break;
      }
    }

    return sorted.slice(start, end + 1);
  };

  const evolutionChain = getEvolutionChain(pokemon, allPokemons);

  return (
    <div className="w-96 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
      <div className="p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg"
        >
          ×
        </button>
        <div className="text-center mb-6">
          <div className="text-gray-400 text-sm font-semibold mb-2">
            #{pokemon.Number}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {pokemon.Name}
          </h2>
          <div className="text-gray-500 text-xs mb-3">Emperor Pokémon</div>
          <div className="flex justify-center gap-2 mb-4">
            <span
              className="px-4 py-2 rounded-full text-white text-sm font-bold uppercase"
              style={{ backgroundColor: getTypeColor(pokemon.Type1) }}
            >
              {pokemon.Type1}
            </span>
            {pokemon.Type2 && (
              <span
                className="px-4 py-2 rounded-full text-white text-sm font-bold uppercase"
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
          className="w-48 h-48 object-contain mx-auto mb-6"
        />
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-700 mb-3 uppercase">
            Stats
          </h3>
          <div className="flex gap-2 mb-3 justify-between">
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
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-700 mb-3 uppercase">
            Evolution
          </h3>
          <div className="flex items-center justify-center gap-3">
            {evolutionChain.map((p, idx) => (
              <React.Fragment key={p.Number}>
                <div className="text-center">
                  <img
                    src={p.ImgURL}
                    alt={p.Name}
                    className="w-12 h-12 object-contain mb-1"
                  />
                  <div className="text-xs text-gray-500">
                    Lvl {idx === 0 ? 16 : 36}
                  </div>
                </div>
                {idx < evolutionChain.length - 1 && (
                  <div className="text-gray-400">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
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
            Generation: p.Generation ?? 0,
            ExperienceType: p["Experience type"] ?? null,
            ExperienceToLevel100: p["Experience to level 100"] ?? 0,
            CatchRate: p["Catch Rate"] ?? 0,
            ImgURL: p.ImgURL ?? "",
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
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
            <div className="mb-8 flex items-center gap-4 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm font-semibold text-gray-700">
                <ArrowUpDown size={16} /> Ascending <ChevronDown size={16} />
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
                <span className="w-4 h-4 rounded-full bg-gray-300"></span> Type{" "}
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
                Weaknesses <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
                Ability <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
                Height <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 text-sm text-gray-500">
                Weight <ChevronDown size={16} />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <ChevronDown size={20} className="text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                filteredList.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.Number}
                    pokemon={pokemon}
                    onClick={setSelectedPokemon}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {selectedPokemon && (
          <PokemonSidebar
            pokemon={selectedPokemon}
            allPokemons={pokemonList}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  );
}
