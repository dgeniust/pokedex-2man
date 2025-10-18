
/**
 * Nhóm danh sách Pokémon phẳng thành các chuỗi tiến hóa.
 * Dữ liệu JSON gốc phải có trường "Final Evolution".
 * @param {Array<Object>} allPokemon - Toàn bộ danh sách Pokémon (đã format).
 * @returns {Array<Array<Object>>}
 */
export const groupPokemonByEvolutionChain = (allPokemon) => {
  if (!allPokemon || allPokemon.length === 0) {
    return [];
  }

  const allChains = [];
  let currentChain = [];

  for (let i = 0; i < allPokemon.length; i++) {
    const pokemon = allPokemon[i];
    
    // Rất quan trọng: Đảm bảo bạn đã thêm 'FinalEvolution' khi format
    if (!pokemon.hasOwnProperty('FinalEvolution')) {
      console.error("Lỗi: Pokémon object bị thiếu key 'FinalEvolution'. Bạn đã thêm nó vào hàm format trong App.js chưa?");
      // Bỏ qua nếu thiếu key
      if (currentChain.length > 0) allChains.push(currentChain);
      currentChain = [];
      continue; 
    }
    
    currentChain.push(pokemon);

    const isFinalEvolution = pokemon.FinalEvolution === 1.0;
    const isLastPokemonInList = (i === allPokemon.length - 1);

    if (isLastPokemonInList) {
      allChains.push(currentChain);
      break;
    }

    const nextPokemon = allPokemon[i + 1];
    const nextPokemonStartsNewChain = nextPokemon.FinalEvolution === 0.0;

    if (isFinalEvolution && nextPokemonStartsNewChain) {
      allChains.push(currentChain);
      currentChain = []; // Bắt đầu chuỗi mới
    }
  }

  return allChains;
};