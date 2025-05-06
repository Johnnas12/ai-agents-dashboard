import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketSummary from "./components/MarketSummary";
import AvailableCoins from "./components/AvailableCoins";
import DashboardHome from "./components/DashboardHome";
import Navbar from "./components/Navbar";
import AvailableCoinsTable from "./components/TopCoins";
import FactChecker from "./components/FactChecker";
import CryptoDigest from "./components/CryptoDigest";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardHome  />} />
          <Route path="/top-10-coins" element={<AvailableCoinsTable />} />
          <Route path="/available-coins" element={<AvailableCoins />} />
          <Route path="/market-summary" element={<MarketSummary />} />
          <Route path="/fact-checker" element={<FactChecker />} />
          <Route path="/daily-digest" element={<CryptoDigest />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
