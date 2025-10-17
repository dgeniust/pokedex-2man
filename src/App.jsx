import React, { useState } from "react";
import "antd/dist/reset.css";
import { Card, Modal, Row, Col, Tag, Progress } from "antd";
import {
  TrophyOutlined,
  ThunderboltOutlined,
  StarOutlined,
} from "@ant-design/icons";

const pokemonList = [
  {
    Number: 867,
    Name: "Runerigus",
    Type1: "Ground",
    Type2: "Ghost",
    Abilities: ["Wandering Spirit"],
    HP: 58,
    Att: 95,
    Def: 145,
    Spa: 50,
    Spd: 105,
    Spe: 30,
    BST: 483,
    Mean: 80.5,
    StandardDeviation: 38.6,
    Generation: 8.0,
    ExperienceType: "Medium Fast",
    ExperienceToLevel100: 1000000,
    FinalEvolution: 1.0,
    CatchRate: 90,
    Legendary: 0.0,
    ImgURL: "https://img.pokemondb.net/artwork/avif/runerigus.avif",
  },
];

// Component: PokemonCard
const PokemonCard = ({ pokemon, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      hoverable
      className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
      cover={
        <div className="relative bg-gray-50 p-6">
          <div className="absolute top-4 right-4 bg-black text-white rounded-full px-3 py-1 text-sm font-bold">
            #{pokemon.Number}
          </div>
          <img
            alt={pokemon.Name}
            src={pokemon.ImgURL}
            className="h-48 object-contain mx-auto transition-all duration-300"
            style={{
              filter: imageLoaded
                ? "drop-shadow(0 8px 12px rgba(0,0,0,0.3))"
                : "none",
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      }
      onClick={() => onClick(pokemon)}
    >
      <div className="text-center">
        <h2 className="text-xl font-bold mb-3 text-gray-900">{pokemon.Name}</h2>
        <div className="flex justify-center gap-2 mb-3">
          <Tag
            color="black"
            className="text-white px-4 py-1 rounded-full font-semibold border-0"
          >
            {pokemon.Type1}
          </Tag>
          {pokemon.Type2 && (
            <Tag
              color="gray"
              className="text-black px-4 py-1 rounded-full font-semibold border-0"
            >
              {pokemon.Type2}
            </Tag>
          )}
        </div>
        <div className="flex justify-around mt-4 pt-3 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{pokemon.HP}</div>
            <div className="text-xs text-gray-500">HP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {pokemon.Att}
            </div>
            <div className="text-xs text-gray-500">ATK</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {pokemon.Def}
            </div>
            <div className="text-xs text-gray-500">DEF</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Component: StatBar
const StatBar = ({ label, value, max = 255 }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value}</span>
    </div>
    <Progress
      percent={(value / max) * 100}
      showInfo={false}
      strokeColor="black"
      trailColor="#e5e7eb"
      strokeWidth={12}
      className="rounded-full"
    />
  </div>
);

// Component: PokemonModal
const PokemonModal = ({ pokemon, visible, onClose }) => {
  if (!pokemon) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="pokemon-modal"
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {pokemon.Name}
              </h2>
              <div className="flex justify-center gap-2 mb-2">
                <Tag
                  color="black"
                  className="text-white px-4 py-1 rounded-full font-semibold text-sm border-0"
                >
                  {pokemon.Type1}
                </Tag>
                {pokemon.Type2 && (
                  <Tag
                    color="gray"
                    className="text-black px-4 py-1 rounded-full font-semibold text-sm border-0"
                  >
                    {pokemon.Type2}
                  </Tag>
                )}
              </div>
              <div className="text-gray-500 text-sm">#{pokemon.Number}</div>
            </div>
            <img
              src={pokemon.ImgURL}
              alt={pokemon.Name}
              className="w-64 h-64 object-contain"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))",
              }}
            />
            <div className="mt-4 bg-black text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2">
              <TrophyOutlined />
              BST: {pokemon.BST}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ThunderboltOutlined className="text-gray-700" />
                Base Stats
              </h3>
              <StatBar label="HP" value={pokemon.HP} />
              <StatBar label="Attack" value={pokemon.Att} />
              <StatBar label="Defense" value={pokemon.Def} />
              <StatBar label="Sp. Attack" value={pokemon.Spa} />
              <StatBar label="Sp. Defense" value={pokemon.Spd} />
              <StatBar label="Speed" value={pokemon.Spe} />
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <StarOutlined className="text-gray-700" />
                Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500 text-xs">Abilities</div>
                  <div className="font-semibold text-gray-900">
                    {pokemon.Abilities.join(", ")}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500 text-xs">Catch Rate</div>
                  <div className="font-semibold text-gray-900">
                    {pokemon.CatchRate}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500 text-xs">Generation</div>
                  <div className="font-semibold text-gray-900">
                    Gen {pokemon.Generation}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500 text-xs">Experience Type</div>
                  <div className="font-semibold text-gray-900">
                    {pokemon.ExperienceType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Component: App (Main)
export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="min-h-screen w-full p-6 bg-gray-100">
      <div className="w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Pokémon Gallery
          </h1>
          <p className="text-gray-600 text-lg">
            Discover and explore your favorite Pokémon
          </p>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {pokemonList.map((pokemon) => (
            <Col xs={24} sm={12} md={8} lg={6} key={pokemon.Number}>
              <PokemonCard pokemon={pokemon} onClick={setSelectedPokemon} />
            </Col>
          ))}
        </Row>
      </div>

      <PokemonModal
        pokemon={selectedPokemon}
        visible={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}
