export const PokemonCard = ({ pokemon, onClick }) => {
  const getTypeColor = (type) => {
    const colors = {
      Fire: "#FF6B6B",
      Water: "#4ECDC4",
      Grass: "#A3E635",
      Electric: "#FACC15",
      Psychic: "#F472B6",
      Ice: "#7DD3FC",
      Dragon: "#C084FC",
      Dark: "#374151",
      Fairy: "#F9A8D4",
      Normal: "#D1D5DB",
      Fighting: "#F87171",
      Flying: "#93C5FD",
      Poison: "#C084FC",
      Ground: "#FBBF24",
      Rock: "#A16207",
      Bug: "#A3E635",
      Ghost: "#818CF8",
      Steel: "#9CA3AF",
    };
    return colors[type] || "#E5E7EB";
  };

  return (
    <div
      onClick={() => onClick(pokemon)}
      className="w-[200px] min-h-[280px] bg-white border-[3px] border-black rounded-lg shadow-[6px_6px_0_#000] 
                 flex flex-col justify-between items-center p-4 text-center cursor-pointer transition-all duration-200
                 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#000]"
    >
      <div className="text-sm font-bold text-black bg-yellow-400 border-2 border-black rounded-md px-2 py-1 self-start">
        N°{pokemon.Number}
      </div>

      <div className="flex justify-center items-center flex-1 my-3">
        <img
          src={pokemon.ImgURL}
          alt={pokemon.Name}
          className="w-[120px] h-auto transition-transform duration-200 hover:scale-110"
        />
      </div>

      <h3 className="text-lg font-extrabold text-black uppercase mb-2">
        {pokemon.Name}
      </h3>

      <div className="flex justify-center flex-wrap gap-2">
        <span
          className="px-3 py-1 border-2 border-black rounded-md font-bold text-sm shadow-[3px_3px_0_#000]"
          style={{ backgroundColor: getTypeColor(pokemon.Type1) }}
        >
          {pokemon.Type1}
        </span>

        {pokemon.Type2 && (
          <span
            className="px-3 py-1 border-2 border-black rounded-md font-bold text-sm shadow-[3px_3px_0_#000]"
            style={{ backgroundColor: getTypeColor(pokemon.Type2) }}
          >
            {pokemon.Type2}
          </span>
        )}
      </div>
    </div>
  );
};
