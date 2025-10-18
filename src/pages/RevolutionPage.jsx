import React, { useState, useEffect } from "react";

// --- Icons ---
const ArrowRightOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h88.5c3.9 0 7.6-1.4 10.5-3.9L869 536.2a32.07 32.07 0 000-48.4z"></path>
  </svg>
);

const ThunderIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
  </svg>
);

export const Revolution = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolutionResult, setEvolutionResult] = useState(null);
  const [message, setMessage] = useState("");
  const [showFlash, setShowFlash] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [successRate, setSuccessRate] = useState(60);

  // Fetch Pokemon data
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
            ImgURL: p.ImgURL ?? "",
            FinalEvolution: p["Final Evolution"] ?? 0.0,
          };
        });

        setPokemonList(formatted);

        // Set initial Pokemon (Bulbasaur -> Ivysaur)
        const bulbasaur = formatted.find((p) => p.Number === 1);
        const ivysaur = formatted.find((p) => p.Number === 2);
        setCurrentPokemon(bulbasaur);
        setNextPokemon(ivysaur);

        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // CSS Animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes glowing {
        0%, 100% { 
          box-shadow: 0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #f59e0b;
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 0 40px #fbbf24, 0 0 80px #f59e0b, 0 0 120px #d97706;
          transform: scale(1.05);
        }
      }
      @keyframes flash {
        0% { opacity: 0; }
        10% { opacity: 1; }
        20% { opacity: 0; }
        30% { opacity: 1; }
        40% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
      }
      .animate-glowing {
        animation: glowing 1s infinite ease-in-out;
      }
      .animate-flash {
        animation: flash 2s ease-out;
      }
      .animate-shake {
        animation: shake 0.5s infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleEvolve = () => {
    if (isEvolving || !currentPokemon || !nextPokemon) return;

    setIsEvolving(true);
    setEvolutionResult(null);
    setMessage(`${currentPokemon.Name} is reacting to the evolution stone...`);

    setTimeout(() => {
      const successChance = Math.random() * 100;
      if (successChance <= successRate) {
        setEvolutionResult("success");
        setShowFlash(true);
        setMessage(
          `Congratulations! ${currentPokemon.Name} evolved into ${nextPokemon.Name}!`
        );

        setTimeout(() => {
          setShowFlash(false);
        }, 2000);
      } else {
        setEvolutionResult("fail");
        setMessage(`Oh no! The evolution failed! Try again!`);
      }
      setIsEvolving(false);
    }, 3000);
  };

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

  if (loading) {
    return (
      <div className="bg-yellow-300 min-h-screen flex items-center justify-center">
        <div className="text-4xl font-black">LOADING...</div>
      </div>
    );
  }

  if (!currentPokemon || !nextPokemon) {
    return (
      <div className="bg-yellow-300 min-h-screen flex items-center justify-center">
        <div className="text-2xl font-black">ERROR: Pokemon data not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 min-h-screen flex flex-col items-center justify-center p-4 font-mono select-none relative overflow-hidden">
      {/* Flash Effect */}
      {showFlash && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-white animate-flash" />
          <div
            className="absolute inset-0 bg-yellow-200 animate-flash"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-black rotate-12 opacity-10" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-black -rotate-12 opacity-10" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-black rotate-45 opacity-10" />

      <div className="w-full max-w-5xl relative z-10">
        {/* Title */}
        <div className="text-center mb-8 relative">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-2 tracking-tighter transform -rotate-1 inline-block border-8 border-black bg-white px-8 py-4 shadow-[12px_12px_0px_#000]">
            EVOLUTION LAB
          </h1>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-8 h-8 bg-red-500 border-4 border-black rotate-12" />
            <div className="w-8 h-8 bg-blue-500 border-4 border-black -rotate-12" />
            <div className="w-8 h-8 bg-green-500 border-4 border-black rotate-6" />
          </div>
        </div>

        {/* Main Evolution Box */}
        <div className="bg-white border-8 border-black p-8 md:p-10 shadow-[16px_16px_0px_#000] transform rotate-0 hover:rotate-0 transition-transform">
          {/* Success Rate Display */}
          <div className="mb-6 flex justify-center">
            <div className="bg-yellow-400 border-4 border-black px-6 py-3 shadow-[6px_6px_0px_#000] transform -rotate-2">
              <p className="text-xl font-black flex items-center gap-2">
                <ThunderIcon />
                SUCCESS RATE: {successRate}%
                <ThunderIcon />
              </p>
            </div>
          </div>

          <div className="flex items-center justify-around gap-4 md:gap-8">
            {/* Current Pokemon */}
            <div
              className={`text-center transition-all duration-300 ${
                isEvolving && evolutionResult !== "success"
                  ? "animate-shake"
                  : ""
              }`}
            >
              <div className="bg-gradient-to-br from-blue-300 to-purple-300 border-6 border-black p-4 shadow-[8px_8px_0px_#000] transform hover:rotate-3 transition-transform">
                <img
                  src={currentPokemon.ImgURL}
                  alt={currentPokemon.Name}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain"
                />
              </div>
              <div className="mt-4 bg-black text-white px-4 py-2 font-black text-xl border-4 border-black shadow-[4px_4px_0px_#666]">
                {currentPokemon.Name}
              </div>
              <div className="flex gap-2 justify-center mt-2">
                {currentPokemon.Type1 && (
                  <span
                    className={`${getTypeColor(
                      currentPokemon.Type1
                    )} text-white px-3 py-1 text-sm font-bold border-2 border-black`}
                  >
                    {currentPokemon.Type1}
                  </span>
                )}
                {currentPokemon.Type2 && (
                  <span
                    className={`${getTypeColor(
                      currentPokemon.Type2
                    )} text-white px-3 py-1 text-sm font-bold border-2 border-black`}
                  >
                    {currentPokemon.Type2}
                  </span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="text-6xl md:text-8xl text-black font-black">
              <ArrowRightOutlined />
            </div>

            {/* Next Pokemon */}
            <div
              className={`text-center transition-all duration-1000 ${
                isEvolving ? "animate-glowing" : ""
              }`}
            >
              <div
                className={`bg-gradient-to-br from-green-300 to-yellow-300 border-6 border-black p-4 shadow-[8px_8px_0px_#000] transition-all duration-1000 ${
                  evolutionResult === "success"
                    ? "shadow-[0_0_80px_20px_#fbbf24] scale-110"
                    : ""
                }`}
              >
                <img
                  src={nextPokemon.ImgURL}
                  alt={nextPokemon.Name}
                  className={`w-32 h-32 md:w-48 md:h-48 object-contain transition-all duration-1000 ${
                    evolutionResult === "success"
                      ? "grayscale-0"
                      : "grayscale brightness-50"
                  }`}
                />
              </div>
              <div
                className={`mt-4 bg-black text-white px-4 py-2 font-black text-xl border-4 border-black shadow-[4px_4px_0px_#666] transition-opacity duration-1000 ${
                  evolutionResult === "success" ? "opacity-100" : "opacity-30"
                }`}
              >
                {nextPokemon.Name}
              </div>
              <div
                className={`flex gap-2 justify-center mt-2 transition-opacity duration-1000 ${
                  evolutionResult === "success" ? "opacity-100" : "opacity-30"
                }`}
              >
                {nextPokemon.Type1 && (
                  <span
                    className={`${getTypeColor(
                      nextPokemon.Type1
                    )} text-white px-3 py-1 text-sm font-bold border-2 border-black`}
                  >
                    {nextPokemon.Type1}
                  </span>
                )}
                {nextPokemon.Type2 && (
                  <span
                    className={`${getTypeColor(
                      nextPokemon.Type2
                    )} text-white px-3 py-1 text-sm font-bold border-2 border-black`}
                  >
                    {nextPokemon.Type2}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats Comparison */}
          {evolutionResult === "success" && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-blue-200 border-4 border-black p-4">
                <h3 className="font-black mb-2">BEFORE</h3>
                <div className="text-sm space-y-1">
                  <p>HP: {currentPokemon.HP}</p>
                  <p>ATK: {currentPokemon.Att}</p>
                  <p>DEF: {currentPokemon.Def}</p>
                  <p>BST: {currentPokemon.BST}</p>
                </div>
              </div>
              <div className="bg-green-200 border-4 border-black p-4">
                <h3 className="font-black mb-2">AFTER</h3>
                <div className="text-sm space-y-1">
                  <p>HP: {nextPokemon.HP}</p>
                  <p>ATK: {nextPokemon.Att}</p>
                  <p>DEF: {nextPokemon.Def}</p>
                  <p>BST: {nextPokemon.BST}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col items-center gap-6">
          {/* Evolution Stone */}
          <div className="bg-purple-400 border-6 border-black p-4 shadow-[8px_8px_0px_#000] transform -rotate-1">
            <p className="font-black text-xl">⚡ EVOLUTION STONE REQUIRED ⚡</p>
          </div>

          {/* Evolve Button */}
          <button
            onClick={handleEvolve}
            disabled={isEvolving}
            className={`w-full max-w-md text-black font-black text-3xl py-6 px-12 border-8 border-black transform transition-all duration-150 hover:scale-105
              ${
                isEvolving
                  ? "bg-gray-400 cursor-not-allowed"
                  : evolutionResult === "success"
                  ? "bg-green-400 shadow-[12px_12px_0px_#000] hover:shadow-[8px_8px_0px_#000]"
                  : evolutionResult === "fail"
                  ? "bg-red-400 shadow-[12px_12px_0px_#000] hover:shadow-[8px_8px_0px_#000]"
                  : "bg-yellow-400 shadow-[12px_12px_0px_#000] hover:shadow-[8px_8px_0px_#000]"
              }
              active:shadow-none active:translate-x-[12px] active:translate-y-[12px]`}
          >
            {isEvolving
              ? "EVOLVING..."
              : evolutionResult
              ? "TRY AGAIN"
              : "EVOLVE NOW!"}
          </button>

          {/* Message */}
          <div className="min-h-16 flex items-center justify-center">
            {message && (
              <div className="bg-white border-4 border-black px-6 py-3 shadow-[6px_6px_0px_#000]">
                <p className="text-lg font-bold text-center">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
