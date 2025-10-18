import React, { useState, useEffect, useMemo } from "react";
import { Input, Button, Pagination } from "antd";
import { Search } from "lucide-react";
import { PokemonCard } from "../src/components/PokemonCard";
import { PokemonDetailPanel } from "./components/PokemonDetailPanel";
import Filters from "./components/Filter";
import Navbar from "./components/Navbar";
import { groupPokemonByEvolutionChain } from "./utils/pokemonUtils"; // (sửa đường dẫn nếu cần)
export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    rangeFrom: "",
    rangeTo: "",
    sort: "ascending", // 'ascending' | 'descending' | 'name-asc' | 'name-desc'
    type: null, // ví dụ: "Grass"
    weakness: null, // ví dụ: "Fire"
    ability: null, // ví dụ: "Overgrow"
    height: null, // ví dụ: "small" | "medium" | "large"
    weight: null, // ví dụ: "light" | "medium" | "heavy"
  });
  const itemsPerPage = 18;

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
            // DỮ LIỆU DÙNG CHO LOGIC TIẾN HÓA
            FinalEvolution: p["Final Evolution"] ?? 0.0,

            // DỮ LIỆU DÙNG CHO LOGIC ĐIỂM YẾU
            "Against Normal": p["Against Normal"],
            "Against Fire": p["Against Fire"],
            "Against Water": p["Against Water"],
            "Against Electric": p["Against Electric"],
            "Against Grass": p["Against Grass"],
            "Against Ice": p["Against Ice"],
            "Against Fighting": p["Against Fighting"],
            "Against Poison": p["Against Poison"],
            "Against Ground": p["Against Ground"],
            "Against Flying": p["Against Flying"],
            "Against Psychic": p["Against Psychic"],
            "Against Bug": p["Against Bug"],
            "Against Rock": p["Against Rock"],
            "Against Ghost": p["Against Ghost"],
            "Against Dragon": p["Against Dragon"],
            "Against Dark": p["Against Dark"],
            "Against Steel": p["Against Steel"],
            "Against Fairy": p["Against Fairy"],
          };
        });

        setPokemonList(formatted);
        setFilteredList(formatted);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const allEvolutionChains = useMemo(
    () => groupPokemonByEvolutionChain(pokemonList),
    [pokemonList]
  );

  const [selectedChain, setSelectedChain] = useState(null);

  useEffect(() => {
    if (selectedPokemon) {
      // Khi 1 Pokémon được chọn, tìm chuỗi của nó
      const foundChain = allEvolutionChains.find((chain) =>
        chain.some((p) => p.Name === selectedPokemon.Name)
      );
      setSelectedChain(foundChain || null); // Lưu lại chuỗi này
      setIsPanelVisible(true);
    } else {
      // Khi đóng panel (selectedPokemon là null)
      setIsPanelVisible(false);
      setSelectedChain(null); // Xóa chuỗi
    }
  }, [selectedPokemon, allEvolutionChains]);
  useEffect(() => {
    let filtered = [...pokemonList];

    // 1. Filter theo Search Term
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.Name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          p.Number.toString().includes(filters.searchTerm)
      );
    }

    // 2. Filter theo Number Range
    if (filters.rangeFrom) {
      filtered = filtered.filter(
        (p) => p.Number >= parseInt(filters.rangeFrom)
      );
    }
    if (filters.rangeTo) {
      filtered = filtered.filter((p) => p.Number <= parseInt(filters.rangeTo));
    }

    // 3. Filter theo Type
    if (filters.type) {
      filtered = filtered.filter(
        (p) => p.Type1 === filters.type || p.Type2 === filters.type
      );
    }

    // 4. Filter theo Weakness
    if (filters.weakness) {
      // ví dụ: weakness = "Fire" -> check key "Against Fire"
      const key = `Against ${filters.weakness}`;
      filtered = filtered.filter((p) => p[key] > 1);
    }

    // 5. Filter theo Ability
    if (filters.ability) {
      filtered = filtered.filter(
        (p) => p.Abilities && p.Abilities.includes(filters.ability)
      );
    }
    // 8. Sắp xếp (Sort)
    if (filters.sort === "ascending") {
      filtered.sort((a, b) => a.Number - b.Number);
    } else if (filters.sort === "descending") {
      filtered.sort((a, b) => b.Number - a.Number);
    }
    // (Bạn có thể thêm các logic sort khác như 'name-asc'...)

    setFilteredList(filtered);
    setCurrentPage(1); // reset về trang đầu khi filter thay đổi
  }, [filters, pokemonList]);

  // Tính toán dữ liệu phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-white flex flex-col bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-[90%] mx-auto">
            {/* Ô search */}
            <div className="mb-8">
              <Input.Search
                placeholder="Search your Pokemon!"
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                className="w-full !border-4 !border-black !bg-white !text-lg !font-extrabold !uppercase !text-black focus:!border-red-600"
                enterButton={
                  <Button
                    className="bg-red-600 border-4 border-black text-white flex items-center justify-center"
                    icon={<Search size={24} />}
                  />
                }
              />
            </div>

            {/* Bộ lọc */}
            <Filters filters={filters} setFilters={setFilters} />

            {/* Layout chính */}
            <div
              className={`relative flex w-full h-full transition-[gap] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                selectedPokemon ? "lg:gap-0" : "gap-2"
              }`}
            >
              {/* Grid Pokémon */}
              <div
                className={`transition-[width,transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  selectedPokemon
                    ? "lg:w-[calc(100%-400px)] scale-[0.99] opacity-90"
                    : "w-full scale-100 opacity-100"
                }`}
              >
                <div
                  className={`grid gap-6 p-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    selectedPokemon
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                  }`}
                >
                  {loading ? (
                    <div className="col-span-full text-center py-20">
                      <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent animate-spin"></div>
                    </div>
                  ) : (
                    currentData.map((pokemon, idx) => (
                      <PokemonCard
                        key={idx}
                        pokemon={pokemon}
                        onClick={setSelectedPokemon}
                      />
                    ))
                  )}
                </div>

                {/* Pagination */}
                {!loading && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      current={currentPage}
                      total={filteredList.length}
                      pageSize={itemsPerPage}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false}
                      className="[&_.ant-pagination-item]:!border-4 [&_.ant-pagination-item]:!border-black [&_.ant-pagination-item-active]:!bg-red-600 [&_.ant-pagination-item-active]:!text-white [&_.ant-pagination-item-active]:!border-black font-extrabold"
                    />
                  </div>
                )}
              </div>

              {/* Panel chi tiết */}
              <div
                className={`absolute top-0 right-0 h-full shadow-[8px_8px_0_#000]
                transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${
                  isPanelVisible ? "translate-x-0 sm:block" : "translate-x-full"
                }
                hidden w-[400px]`}
              >
                {isPanelVisible && selectedPokemon && (
                  <div className="h-full p-6 animate-fadeIn">
                    <PokemonDetailPanel
                      pokemon={selectedPokemon}
                      evolutionChain={selectedChain}
                      onPokemonSelect={setSelectedPokemon}
                      onClose={() => setSelectedPokemon(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
