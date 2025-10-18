import React, { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

export default function Filters() {
  const [rangeFrom, setRangeFrom] = useState("387");
  const [rangeTo, setRangeTo] = useState("896");
  const [activeFilters, setActiveFilters] = useState({
    sort: "ascending",
    type: null,
    weaknesses: null,
    ability: null,
    height: null,
    weight: null,
  });

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
            <FilterButton active={activeFilters.sort === "ascending"}>
              <ArrowUpDown size={18} strokeWidth={3} />
              Ascending
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <div className="flex items-center gap-3 bg-yellow-100 border-[3px] border-black px-4 py-2">
              <span className="text-black font-black uppercase text-sm">
                From
              </span>
              <RangeInput
                value={rangeFrom}
                onChange={(e) => setRangeFrom(e.target.value)}
                placeholder="387"
              />
              <span className="text-black font-black uppercase text-sm">
                To
              </span>
              <RangeInput
                value={rangeTo}
                onChange={(e) => setRangeTo(e.target.value)}
                placeholder="896"
              />
            </div>

            <FilterButton>
              <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-blue-500 border-2 border-black"></div>
              Type
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <FilterButton>
              <div className="w-5 h-5 bg-red-500 border-2 border-black rotate-45"></div>
              Weaknesses
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <FilterButton>
              <div className="w-5 h-5 bg-purple-500 border-2 border-black rounded-full"></div>
              Ability
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <FilterButton>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stroke-black"
                strokeWidth="2"
              >
                <line x1="10" y1="2" x2="10" y2="18" />
                <line x1="7" y1="5" x2="13" y2="5" />
                <line x1="7" y1="15" x2="13" y2="15" />
              </svg>
              Height
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <FilterButton>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stroke-black"
                strokeWidth="2"
              >
                <circle cx="10" cy="8" r="4" />
                <path d="M6 16 L14 16 L12 12 L8 12 Z" />
              </svg>
              Weight
              <ChevronDown size={18} strokeWidth={3} />
            </FilterButton>

            <FilterButton variant="icon" active>
              <ChevronDown size={24} strokeWidth={3} />
            </FilterButton>
          </div>

          <div className="mt-6 pt-6 border-t-[3px] border-black flex items-center gap-3">
            <span className="text-sm font-black uppercase text-black">
              Active:
            </span>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase border-[2px] border-black">
                Range: {rangeFrom}-{rangeTo}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-green-400 border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all">
            Apply Filters
          </button>
          <button className="px-6 py-3 bg-red-400 border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all">
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
