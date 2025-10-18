import React, { useState, useEffect } from "react";
import { Input, Button, Pagination } from "antd";
import { Search } from "lucide-react";
import { PokemonCard } from "../src/components/PokemonCard";
import { PokemonDetailPanel } from "./components/PokemonDetailPanel";
import Filters from "./components/Filter";
import Navbar from "./components/Navbar";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

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

    setFilteredList(filtered);
    setCurrentPage(1); // reset về trang đầu khi filter thay đổi
  }, [searchTerm, rangeFrom, rangeTo, pokemonList]);

  useEffect(() => {
    if (selectedPokemon) setIsPanelVisible(true);
  }, [selectedPokemon]);

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <Filters />

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
                  selectedPokemon
                    ? "translate-x-0 sm:block"
                    : "translate-x-full"
                }
                hidden w-[400px]`}
              >
                {selectedPokemon && (
                  <div className="h-full p-6 animate-fadeIn">
                    <PokemonDetailPanel
                      pokemon={selectedPokemon}
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
