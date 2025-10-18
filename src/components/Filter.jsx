import React, { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

export default function Filters({ filters, setFilters }) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'weakness', 'type', v.v.
  const ALL_TYPES = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];

  // (Bạn có thể copy hàm này từ PokemonDetailPanel hoặc tạo file utils riêng)
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
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value, // Click lần nữa để clear
    }));
  };
  const toggleSort = () => {
    setFilters((prev) => ({
      ...prev,
      // Logic ví dụ: chỉ đổi giữa ascending và descending (theo số)
      sort: prev.sort === "ascending" ? "descending" : "ascending",
    }));
  };
  const renderDropdown = (filterKey) => {
    // (Sau này bạn có thể thêm 'type', 'ability' vào đây)
    let list;
    if (filterKey === "weakness" || filterKey === "type") {
      list = ALL_TYPES;
    } else {
      return null; // Hoặc logic cho 'ability', v.v.
    }

    return (
      <div className="absolute z-10 top-full mt-2 w-72 bg-white border-4 border-black p-4 grid grid-cols-3 gap-2 shadow-[4px_4px_0_#000]">
        {list.map((item) => (
          <button
            key={item}
            onClick={() => handleFilterSelect(filterKey, item)}
            className={`px-3 py-2 border-2 border-black text-xs font-bold uppercase text-white shadow-[2px_2px_0_#000] 
                        ${getTypeColor(item)} 
                        ${
                          filters[filterKey] === item
                            ? "ring-4 ring-yellow-400 ring-inset"
                            : "hover:opacity-80"
                        }`} // Sửa highlight
          >
            {item}
          </button>
        ))}
      </div>
    );
  };

  const FilterButton = ({
    children,
    onClick,
    active = false,
    variant = "default",
  }) => (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-5 py-3 
        border-[3px] border-black font-black uppercase text-sm
        transition-all duration-150 ease-out
        ${variant === "icon" ? "w-12 h-12 justify-center p-0" : ""}
        ${
          active
            ? "bg-black text-white translate-x-0 translate-y-0"
            : "bg-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px]"
        }
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-[2px] active:translate-y-[2px]
      `}
    >
      {children}
    </button>
  );

  const RangeInput = ({ value, onChange, placeholder }) => (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-24 h-12 px-3 text-center
        border-[3px] border-black bg-white
        font-black uppercase text-base
        focus:outline-none focus:ring-4 focus:ring-yellow-300
        transition-all duration-150
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      "
    />
  );

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-black uppercase mb-2 tracking-tight text-black">
            Pokémon Filters
          </h1>
          <div className="h-2 w-32 bg-black"></div>
        </div>

        <div className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap gap-4 items-center">
            <FilterButton active={true} onClick={toggleSort}>
              <ArrowUpDown size={18} strokeWidth={3} />
              {filters.sort === "ascending" ? "Ascending" : "Descending"}
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <div className="flex items-center gap-3 bg-yellow-100 border-[3px] border-black px-4 py-2">
              <span className="text-black font-black uppercase text-sm">
                From
              </span>
              <RangeInput
                value={filters.rangeFrom}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, rangeFrom: e.target.value }))
                }
                placeholder="387"
              />
              <span className="text-black font-black uppercase text-sm">
                To
              </span>
              <RangeInput
                value={filters.rangeTo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, rangeTo: e.target.value }))
                }
                placeholder="896"
              />
            </div>

            <div className="relative">
              {" "}
              {/* Cần container relative */}
              <FilterButton
                onClick={() =>
                  setOpenDropdown(openDropdown === "type" ? null : "type")
                }
                active={filters.type !== null}
              >
                <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-blue-500 border-2 border-black"></div>
                {filters.type || "Type"}
                <ChevronDown size={18} strokeWidth={3} />
              </FilterButton>
              {openDropdown === "type" && renderDropdown("type")}
            </div>

            <div className="relative">
              {" "}
              {/* Cần container relative */}
              <FilterButton
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "weakness" ? null : "weakness"
                  )
                }
                active={filters.weakness !== null}
              >
                <div className="w-5 h-5 bg-red-500 border-2 border-black rotate-45"></div>
                {filters.weakness || "Weaknesses"}
                <ChevronDown size={18} strokeWidth={3} />
              </FilterButton>
              {openDropdown === "weakness" && renderDropdown("weakness")}
            </div>

            <FilterButton>
              <div className="w-5 h-5 ..."></div>
              {filters.ability || "Ability"}
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <FilterButton variant="icon" active>
              <ChevronDown size={24} strokeWidth={3} />
            </FilterButton>
          </div>

          {/* --- BƯỚC 4: CẬP NHẬT HIỂN THỊ FILTER ĐANG ÁP DỤNG --- */}
          <div className="mt-6 pt-6 border-t-[3px] border-black flex items-center gap-3">
            <span className="text-sm font-black uppercase text-black">
              Active:
            </span>
            <div className="flex gap-2 flex-wrap">
              {/* Hiển thị Range */}
              {(filters.rangeFrom || filters.rangeTo) && (
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase border-[2px] border-black">
                  Range: {filters.rangeFrom || "1"}-{filters.rangeTo || "Max"}
                </span>
              )}
              {/* Hiển thị Type */}
              {filters.type && (
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase border-[2px] border-black">
                  Type: {filters.type}
                </span>
              )}
              {/* Hiển thị Weakness */}
              {filters.weakness && (
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase border-[2px] border-black">
                  Weakness: {filters.weakness}
                </span>
              )}
              {/* (Thêm các filter khác ở đây) */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-green-400 border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all">
            Apply Filters
          </button>
          <button
            className="px-6 py-3 bg-red-400 border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            onClick={() =>
              setFilters({
                // <-- Reset toàn bộ state
                searchTerm: "",
                rangeFrom: "",
                rangeTo: "",
                sort: "ascending",
                type: null,
                weakness: null,
                ability: null,
                height: null,
                weight: null,
              })
            }
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
