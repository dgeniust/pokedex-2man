import React, { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("pokedex");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ icon, label, id, color = "white" }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`
          relative flex items-center gap-3 px-4 py-2.5
          border-[3px] border-black font-black uppercase text-sm
          transition-all duration-150 ease-out
          ${
            isActive
              ? `bg-${
                  color === "white" ? "white" : color
                } text-black translate-y-0`
              : "bg-transparent text-white hover:translate-y-[-2px]"
          }
          ${
            isActive
              ? "shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]"
              : "shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_5px_0px_0px_rgba(0,0,0,1)]"
          }
          active:translate-y-[1px] active:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)]
        `}
      >
        {icon && (
          <div
            className={`flex items-center justify-center ${
              isActive ? "animate-pulse" : ""
            }`}
          >
            {icon}
          </div>
        )}
        <span className="whitespace-nowrap">{label}</span>
        {isActive && (
          <div className="absolute -bottom-[3px] left-0 right-0 h-1 bg-yellow-400 border-x-[3px] border-black"></div>
        )}
      </button>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
      <nav className="bg-black border-b-[6px] border-yellow-400 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 border-[4px] border-black rotate-45 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-[3px] border-black rounded-full"></div>
              </div>
              <div className="hidden lg:block">
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Pokédex
                </h1>
                <div className="h-1 w-16 bg-yellow-400"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-white border-[3px] border-black"></div>
                }
                label="Home"
                id="home"
                color="white"
              />
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-red-500 border-[3px] border-black flex items-center justify-center">
                    <div className="w-3 h-3 bg-white border-[2px] border-black rounded-full"></div>
                  </div>
                }
                label="Pokédex"
                id="pokedex"
                color="red-500"
              />
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-blue-500 border-[3px] border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-white border-[2px] border-black"></div>
                  </div>
                }
                label="Videogames"
                id="videogames"
                color="blue-500"
              />
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-yellow-400 border-[3px] border-black rotate-45"></div>
                }
                label="GCC Pokémon"
                id="gcc"
                color="yellow-400"
              />
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-purple-500 border-[3px] border-black rounded-full"></div>
                }
                label="TV Pokémon"
                id="tv"
                color="purple-500"
              />
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-green-500 border-[3px] border-black">
                    <div className="w-2 h-2 bg-black mt-1 ml-1"></div>
                  </div>
                }
                label="Play! Pokémon"
                id="play"
                color="green-500"
              />
              <NavItem
                icon={
                  <div className="w-6 h-6 bg-orange-500 border-[3px] border-black flex items-center justify-center text-white font-black text-xs">
                    N
                  </div>
                }
                label="News"
                id="news"
                color="orange-500"
              />
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2.5 bg-white border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all">
                <Search size={20} strokeWidth={3} />
              </button>
              <button className="p-2.5 bg-yellow-400 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all">
                <User size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-yellow-400 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={3} />
              ) : (
                <Menu size={24} strokeWidth={3} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t-[3px] border-yellow-400 space-y-2">
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-white border-[2px] border-black"></div>
                }
                label="Home"
                id="home"
                color="white"
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-red-500 border-[2px] border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-white border border-black rounded-full"></div>
                  </div>
                }
                label="Pokédex"
                id="pokedex"
                color="red-500"
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-blue-500 border-[2px] border-black"></div>
                }
                label="Videogames"
                id="videogames"
                color="blue-500"
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-yellow-400 border-[2px] border-black rotate-45"></div>
                }
                label="GCC Pokémon"
                id="gcc"
                color="yellow-400"
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-purple-500 border-[2px] border-black rounded-full"></div>
                }
                label="TV Pokémon"
                id="tv"
                color="purple-500"
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-green-500 border-[2px] border-black"></div>
                }
                label="Play! Pokémon"
                id="play"
                color="green-500"
              />
              <NavItem
                icon={
                  <div className="w-5 h-5 bg-orange-500 border-[2px] border-black"></div>
                }
                label="News"
                id="news"
                color="orange-500"
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
