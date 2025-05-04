import { useEffect, useState } from "react";
import axios from "axios";

function AvailableCoins() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/available-coins")
      .then(res => setCoins(res.data.available_coins))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">📈 Available Crypto Coins</h2>
      <ul className="space-y-2">
        {coins.map((coin, index) => (
          <li key={index} className="bg-neutral-800 p-3 rounded-lg shadow">
            {coin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableCoins;
