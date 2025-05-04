import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import ReactMarkdown from 'react-markdown';


function MarketSummary() {
  const [availableCoins, setAvailableCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [result, setResult] = useState(null);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Fetch available coins only once and cache it
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/available-coins")
      .then(res => {
        const coinOptions = res.data.available_coins.map(coin => ({
          value: coin,
          label: coin
        }));
        setAvailableCoins(coinOptions);  // Store full list
        setFilteredCoins(coinOptions);   // Store filtered list
        setLoadingCoins(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingCoins(false);
      });
  }, []);

  // Handle the submit action to fetch the market summary
  const handleSubmit = () => {
    setLoadingSummary(true);
    axios.post("http://127.0.0.1:8000/market-summary", {
      tracked_keywords: selectedCoins.map(c => c.value)
    })
      .then(res => {
        setResult(res.data);
        setLoadingSummary(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingSummary(false);
      });
  };

  // Filter the available coins based on the user's input
  const handleInputChange = (inputValue) => {
    const filtered = availableCoins.filter((coin) =>
      coin.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCoins(filtered);  // Update the list shown in the dropdown
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-white">📝 Generate Market Summary</h2>

      {/* Coins Loading Spinner */}
      {loadingCoins ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-green-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Select
              options={filteredCoins}
              isMulti
              onChange={setSelectedCoins}
              value={selectedCoins}
              placeholder="Search and select coins..."
              className="text-black"
              onInputChange={handleInputChange}  // Handle the filtering here
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#1f2937', // Tailwind gray-800
                  color: 'white',
                  borderColor: '#4b5563', // Tailwind gray-600
                }),
                input: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151', // Tailwind gray-700
                  color: 'white',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#4b5563' : '#374151',
                  color: 'white',
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: '#065f46', 
                  color: 'white',
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#16a34a', 
                    color: 'white',
                  },
                }),
              }}
            />

            <button
              onClick={handleSubmit}
              className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 rounded text-white flex items-center gap-2"
              disabled={loadingSummary}
            >
              {loadingSummary ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : null}
              {loadingSummary ? 'Generating...' : 'Submit'}
            </button>
          </div>

          {selectedCoins.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold text-white">Your Preferences:</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {selectedCoins.map((coin, index) => (
                  <span key={index} className="bg-green-700 px-3 py-1 rounded text-white">
                    {coin.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 text-white">
              <h3 className="text-xl font-bold mb-3">📊 AI Market Summary</h3>

              <div className="bg-neutral-800 p-4 rounded mb-4 prose prose-invert max-w-none">
                <ReactMarkdown>{result.summary}</ReactMarkdown>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(result.market_data).map(([keyword, data]) => (
                  <div key={keyword} className="bg-gray-800 p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-lg mb-2">{keyword}</h4>
                    <p>💵 Price (USD): <span className="text-green-400">${data.price_usd}</span></p>
                    <p>📈 24h Change:
                      <span className={`ml-1 ${data.change_24h.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {data.change_24h}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MarketSummary;
