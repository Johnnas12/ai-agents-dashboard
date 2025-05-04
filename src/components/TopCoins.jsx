import React, { useState, useEffect } from "react";
import axios from "axios";

const AvailableCoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1")
      .then(response => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching coins data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Top 10 Coins</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Coin</th>
              <th className="py-3 px-6 text-left">Price (USD)</th>
              <th className="py-3 px-6 text-left">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className="hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex items-center">
                  {/* Display the coin's icon */}
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                  {coin.name}
                </td>
                <td className="py-3 px-6">${coin.current_price.toFixed(2)}</td>
                <td className="py-3 px-6">{coin.price_change_percentage_24h.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableCoinsTable;
