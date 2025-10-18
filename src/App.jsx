import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonList } from "./pages/PokemonList";
import { Revolution } from "./pages/RevolutionPage";
import MainLayout from "./pages/layouts/MainLayout";
import TrainerProfile from "./pages/TrainerProfile";
import { RandomRewards } from "./pages/RandomRewards";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PokemonList />} />
          <Route path="/revolution" element={<Revolution />} />
          <Route path="/profile" element={<TrainerProfile />} />
          <Route path="/random-rewards" element={<RandomRewards />} />
        </Route>
      </Routes>
    </Router>
  );
}
