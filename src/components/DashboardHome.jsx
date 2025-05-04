
import React from 'react';
import Home from './Home';
import AvailableCoinsTable from "./TopCoins";
import MarketTrends from './MarketTrends';
import TrendingCoins from './TrendingCoins';
import CoinChart from './CoinChart';

function DashboardHome () {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Navbar, Sidebar, etc. */}
      <div className="p-8">
        <Home />
        <AvailableCoinsTable />
        <MarketTrends />
        <TrendingCoins />
        <CoinChart />
      </div>
    </div>
  );
};

export default DashboardHome;
