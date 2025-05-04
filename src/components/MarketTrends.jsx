import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Add this line to register PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, 
  Title,
  Tooltip,
  Legend
);

const MarketTrends = () => {
  const [marketData, setMarketData] = useState([]);
  
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
      .then((res) => res.json())
      .then((data) => {
        setMarketData(data);
      })
      .catch((error) => console.log("Error fetching market data:", error));
  }, []);

  const chartData = {
    labels: marketData?.prices?.map((item) => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Bitcoin Market Cap',
        data: marketData?.market_caps?.map((item) => item[1]),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-white mb-6">📈 Market Cap History</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default MarketTrends;
