import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of coins for the dropdown
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10, // Limit to top 10 coins
        page: 1
      }
    })
      .then(response => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch historical data for the selected coin when it changes
    if (selectedCoin) {
      setLoading(true);
      axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: '7' // Get data for the last 7 days
        }
      })
        .then(response => {
          const prices = response.data.prices;
          const labels = prices.map(item => new Date(item[0]).toLocaleDateString());
          const data = prices.map(item => item[1]);

          setChartData({
            labels,
            datasets: [{
              label: `${selectedCoin.toUpperCase()} Price (USD)`,
              data,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              tension: 0.4
            }]
          });
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching chart data:", error);
          setLoading(false);
        });
    }
  }, [selectedCoin]);

  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value);
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Coin Price Chart</h2>

      <div className="mb-6">
        <label htmlFor="coin-select" className="text-white font-semibold mr-4">Select Coin:</label>
        <select
          id="coin-select"
          value={selectedCoin}
          onChange={handleCoinChange}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {/* Display the chart */}
      {chartData && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default CoinChart;
