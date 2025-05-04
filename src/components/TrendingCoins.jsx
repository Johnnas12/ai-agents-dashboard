import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/search/trending')
      .then((response) => {
        console.log(response.data);
        setTrendingCoins(response.data.coins);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trending coins:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-white mb-6">🔥 Trending Coins</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul className="space-y-4">
          {trendingCoins.map((coin, index) => (
            <li key={index} className="flex justify-between py-3 px-6 hover:bg-gray-700 rounded-lg">
              {/* Image with fallback */}
              <img 
                src={coin.item.small} 
                alt={coin.item.name} 
                className="w-8 h-8 mr-2 rounded-full" 
                onError={(e) => e.target.src = 'https://via.placeholder.com/32'} 
              />
              <span className="text-white">{coin.item.name}</span>
              <span className="text-gray-400 text-sm">#{coin.item.market_cap_rank}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingCoins;
