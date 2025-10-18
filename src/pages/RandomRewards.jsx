import React, { useState, useEffect, useRef } from "react";
import confetti from "https://esm.sh/canvas-confetti@1.6.0";
import { Button, Modal, Spin } from "antd";
import Chest from "../assets/ochest.png";
// --- Main Component ---
export const RandomRewards = () => {
  // State to hold the list of all pokemons
  const [pokemonList, setPokemonList] = useState([]);
  // State for loading status while fetching data
  const [loading, setLoading] = useState(true);
  // State to control the chest opening animation
  const [isOpening, setIsOpening] = useState(false);
  // State for the won reward
  const [reward, setReward] = useState(null);
  // State to control the reward modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State for the list of items shown in the reward slider
  const [rollingRewards, setRollingRewards] = useState([]);
  // State to track the index of the final reward for styling
  const [finalRewardIndex, setFinalRewardIndex] = useState(null);
  // Ref for the slider container to calculate positioning
  const rewardsContainerRef = useRef(null);

  // Fetch Pokemon data on component mount
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/dgeniust/pokedex-2man/refs/heads/main/pokemon_with_img.json"
        );
        let text = await res.text();
        // Clean up data inconsistencies from the source
        text = text.replace(/NaN/g, "null");
        const data = JSON.parse(text);

        const formatted = data.map((p) => ({
          Number: p.Number ?? 0,
          Name: p.Name ?? "Unknown",
          Type1: p["Type 1"] && p["Type 1"] !== "NULL" ? p["Type 1"] : null,
          Type2: p["Type 2"] && p["Type 2"] !== "NULL" ? p["Type 2"] : null,
          HP: p.HP ?? 0,
          Att: p.Att ?? 0,
          Def: p.Def ?? 0,
          BST: p.BST ?? 0,
          ImgURL: p.ImgURL ?? "https://placehold.co/96x96/f0f0f0/333?text=?",
        }));

        setPokemonList(formatted);
        // Pre-populate the slider with some random items for display
        const initialRewards = Array.from(
          { length: 50 },
          () => formatted[Math.floor(Math.random() * formatted.length)]
        );
        setRollingRewards(initialRewards);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu Pokémon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Function to trigger the enhanced confetti effect
  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 10000,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: [
          "#FFD700",
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#FFA07A",
          "#98D8C8",
        ],
      });
    }

    // Big explosion
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
    // Add stars
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      shapes: ["star"],
      colors: ["#FFD700", "#FFEA00", "#FFFFFF"],
    });

    // Confetti rain
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const rainDefaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 10000,
    };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...rainDefaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // Handler for the "Open Chest" button click
  const handleOpenChest = () => {
    if (isOpening || pokemonList.length === 0) return;

    setIsOpening(true);
    setReward(null);
    setFinalRewardIndex(null);

    // Generate a list of random rewards for the rolling animation
    const numberOfRollingItems = 50;
    const tempRollingRewards = Array.from(
      { length: numberOfRollingItems },
      () => pokemonList[Math.floor(Math.random() * pokemonList.length)]
    );

    const finalReward =
      pokemonList[Math.floor(Math.random() * pokemonList.length)];
    // Place final reward near the end of the list for a better animation effect
    const rewardIndex = numberOfRollingItems - 8;
    tempRollingRewards[rewardIndex] = finalReward;
    setRollingRewards(tempRollingRewards);
    setFinalRewardIndex(rewardIndex);

    // Start the animation after state update
    setTimeout(() => {
      const container = rewardsContainerRef.current;
      if (container) {
        const itemWidth = 128 + 16; // w-32 + gap-4
        const containerWidth = container.offsetWidth;
        const targetScrollPosition =
          rewardIndex * itemWidth - containerWidth / 2 + itemWidth / 2;

        container.style.transition =
          "transform 6s cubic-bezier(0.2, 0.95, 0.1, 1.05)";
        container.style.transform = `translateX(-${targetScrollPosition}px)`;
      }
    }, 100);

    // After animation, show the reward
    setTimeout(() => {
      setReward(finalReward);
      fireConfetti();
      setIsModalVisible(true);
    }, 6500); // Match transition duration + delay
  };

  // Handler to close modal and reset for the next round
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsOpening(false);
    setReward(null);
    setFinalRewardIndex(null);

    const container = rewardsContainerRef.current;
    if (container) {
      container.style.transition = "none";
      container.style.transform = "translateX(0)";

      setTimeout(() => {
        const nextRewards = Array.from(
          { length: 50 },
          () => pokemonList[Math.floor(Math.random() * pokemonList.length)]
        );
        setRollingRewards(nextRewards);
      }, 50);
    }
  };

  // Mapping Pokémon types to colors for neo-brutalism
  const typeColorMap = {
    Grass: "bg-green-400",
    Poison: "bg-purple-500",
    Fire: "bg-red-500",
    Flying: "bg-indigo-400",
    Water: "bg-blue-400",
    Bug: "bg-lime-500",
    Normal: "bg-gray-400",
    Electric: "bg-yellow-400",
    Ground: "bg-amber-600",
    Fairy: "bg-pink-400",
    Fighting: "bg-red-700",
    Psychic: "bg-pink-500",
    Rock: "bg-stone-500",
    Steel: "bg-slate-500",
    Ice: "bg-cyan-300",
    Ghost: "bg-indigo-700",
    Dragon: "bg-purple-800",
    Dark: "bg-gray-800",
  };

  // Main component render
  return (
    <div className="bg-[#FAF3E0] min-h-screen flex flex-col items-center justify-center text-black p-4 font-mono overflow-hidden">
      <div className="text-center w-full max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-bold mb-2 uppercase"
          style={{ textShadow: "3px 3px 0px #000" }}
        >
          Rương Báu Pokémon
        </h1>
        <p className="text-gray-700 text-lg mb-8 font-semibold">
          Mở rương và thử vận may của bạn!
        </p>

        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8">
          {isOpening && (
            <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
              {/* Central glow */}
              <div className="absolute w-full h-full bg-gradient-radial from-yellow-300/60 via-orange-200/30 to-transparent animate-pulse-glow z-0"></div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[120%] h-[120%] rounded-full bg-gradient-radial from-yellow-200/60 via-transparent to-transparent blur-3xl animate-pulse"></div>
              </div>

              {/* Sparkles */}
              <div className="sparkle-container">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
                <div className="sparkle sparkle-3"></div>
                <div className="sparkle sparkle-4"></div>
                <div className="sparkle sparkle-5"></div>
                <div className="sparkle sparkle-6"></div>
              </div>
            </div>
          )}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isOpening ? "scale-125 blur-xl bg-yellow-300/50" : "opacity-0"
              }`}
            ></div>
            <img
              src={Chest}
              alt="Treasure Chest"
              className={`w-full h-full object-contain transition-all duration-700 relative z-10 ${
                isOpening
                  ? "scale-110 rotate-3 animate-bounce"
                  : "hover:scale-105"
              }`}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center">
            <Spin size="large" />
            <p className="mt-4 text-lg font-bold">
              Đang tải dữ liệu Pokémon...
            </p>
          </div>
        ) : (
          <button
            type="primary"
            size="large"
            onClick={handleOpenChest}
            loading={isOpening}
            className="px-6 py-3 bg-red-400 text-xl border-[3px] border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
          >
            {isOpening ? "ĐANG MỞ..." : "MỞ RƯƠNG NGAY"}
          </button>
        )}
      </div>

      {/* Rewards Slider */}
      <div className="w-full mt-16 relative py-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-48 border-4 border-black z-20 pointer-events-none shadow-[8px_8px_0px_rgba(0,0,0,0.5)] bg-white/20">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-black border-r-[12px] border-r-transparent"></div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-t-[20px] border-t-black border-r-[12px] border-r-transparent"></div>
        </div>

        <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-[#FAF3E0] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-[#FAF3E0] to-transparent z-10"></div>

        <div className="w-full h-52 overflow-hidden bg-[#E4D8B4] border-y-4 border-black">
          <div
            ref={rewardsContainerRef}
            className="flex h-full items-center gap-4 px-4"
          >
            {rollingRewards.map((p, index) => (
              <div
                className={`flex-shrink-0 w-32 h-44 p-2 bg-[#FFFBEA] border-[3px] border-black shadow-[5px_5px_0_#000] rounded-none transition-transform duration-300 hover:scale-110 hover:-rotate-2 ${
                  finalRewardIndex === index ? "shadow-[0_0_25px_#FFD700]" : ""
                }`}
              >
                <div className="w-full h-24 bg-gray-100 border-2 border-black flex items-center justify-center mb-2">
                  <img
                    src={p.ImgURL}
                    alt={p.Name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <p
                  className="text-xs font-bold text-center truncate"
                  title={p.Name}
                >
                  {p.Name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reward Modal */}
      {reward && (
        <Modal
          title={
            <span className="font-bold text-2xl uppercase">Chúc Mừng!</span>
          }
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          centered
          className="neo-modal"
          destroyOnClose
        >
          <div className="text-center p-4">
            <h2
              className="text-4xl font-bold mb-2 uppercase"
              style={{ textShadow: "2px 2px 0px #000" }}
            >
              {reward.Name}
            </h2>
            <div className="mx-auto w-40 h-40 bg-gray-100 border-4 border-black flex items-center justify-center mb-4 shadow-[5px_5px_0px_#000]">
              <img
                src={reward.ImgURL}
                alt={reward.Name}
                className="w-32 h-32 object-contain"
              />
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {reward.Type1 && (
                <span
                  className={`px-3 py-1 text-sm font-bold text-white border-2 border-black shadow-[3px_3px_0px_#000] ${
                    typeColorMap[reward.Type1] || "bg-gray-500"
                  }`}
                >
                  {reward.Type1}
                </span>
              )}
              {reward.Type2 && (
                <span
                  className={`px-3 py-1 text-sm font-bold text-white border-2 border-black shadow-[3px_3px_0px_#000] ${
                    typeColorMap[reward.Type2] || "bg-gray-500"
                  }`}
                >
                  {reward.Type2}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-left bg-white/50 p-4 border-2 border-black font-semibold">
              <p>
                <strong>HP:</strong> {reward.HP}
              </p>
              <p>
                <strong>Tấn Công:</strong> {reward.Att}
              </p>
              <p>
                <strong>Phòng Thủ:</strong> {reward.Def}
              </p>
              <p>
                <strong>BST:</strong> {reward.BST}
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              onClick={handleModalClose}
              className="mt-6 neo-button bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold"
            >
              TUYỆT VỜI!
            </Button>
          </div>
        </Modal>
      )}

      {/* Custom CSS for Neo-Brutalism style and animations */}
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-in; }
        .neo-button {
          border: 3px solid black !important;
          box-shadow: 6px 6px 0px black !important;
          transition: all 0.15s ease-in-out !important;
          border-radius: 0 !important;
        }
        .neo-button:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0px black !important;
        }
        .neo-button:active {
          transform: translate(6px, 6px) !important;
          box-shadow: 0px 0px 0px black !important;
        }
        .neo-modal .ant-modal-content {
            background: #FFFDE7 !important;
            border: 5px solid black !important;
            box-shadow: 8px 8px 0px black !important;
            border-radius: 0 !important;
            animation: modal-pop 0.4s ease-out forwards;
        }
        @keyframes modal-pop {
            0% { transform: scale(0.8) rotate(-3deg); opacity: 0; }
            60% { transform: scale(1.05) rotate(2deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); }
        }

        .neo-modal .ant-modal-header {
          background: #FAF3E0 !important;
          border-bottom: 4px solid black !important;
          border-radius: 0 !important;
        }
        .neo-modal .ant-modal-close {
            top: 10px !important;
        }
        .neo-modal .ant-modal-close-x {
          color: black !important;
          font-size: 1.5rem !important;
          line-height: 1 !important;
        }
        .final-reward-glow {
            opacity: 1 !important;
            filter: grayscale(0) !important;
            transform: scale(1.15);
            box-shadow: 0 0 20px 10px #FFD700, 8px 8px 0px #000 !important;
            z-index: 25;
            background-color: #fffbeb !important;
        }
        @keyframes modal-reveal {
            from { opacity: 0; transform: scale(0.8) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
        }
        .god-ray-container {
          position: absolute;
          width: 200%;
          height: 200%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spin 20s linear infinite;
        }
        .god-ray {
          position: absolute;
          width: 8px;
          height: 300%;
          background: linear-gradient(to bottom, rgba(255,223,0,0.8), rgba(255,223,0,0));
          opacity: 0;
          animation: godRayFade 4s ease-out 1 forwards;
        }
        .god-ray:nth-child(1) { transform: rotate(0deg); animation-delay: 0s; }
        .god-ray:nth-child(2) { transform: rotate(45deg); animation-delay: 0.2s; }
        .god-ray:nth-child(3) { transform: rotate(90deg); animation-delay: 0.4s; }
        .god-ray:nth-child(4) { transform: rotate(135deg); animation-delay: 0.6s; }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes godRayFade {
            0% { opacity: 0; transform: scaleY(0.1); }
            50% { opacity: 0.6; transform: scaleY(1); }
            100% { opacity: 0; transform: scaleY(1); }
        }
        @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 10s ease infinite;
        }
      `}</style>
    </div>
  );
};
