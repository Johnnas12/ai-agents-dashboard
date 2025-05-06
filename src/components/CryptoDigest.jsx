import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function CryptoDigest() {
  const [availableCoins, setAvailableCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [sendingDigest, setSendingDigest] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  // Fetch available coins once
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/available-coins")
      .then(res => {
        const coinOptions = res.data.available_coins.map(coin => ({
          value: coin,
          label: coin
        }));
        setAvailableCoins(coinOptions);
        setFilteredCoins(coinOptions);
        setLoadingCoins(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingCoins(false);
      });
  }, []);

  // Handle Digest Submission
  const handleSubmit = () => {
    if (!recipientEmail) {
      setResponseMsg("❌ Please enter a recipient email.");
      return;
    }
    if (selectedCoins.length === 0) {
      setResponseMsg("❌ Please select at least one coin.");
      return;
    }

    setSendingDigest(true);
    setResponseMsg("");

    axios.post("http://127.0.0.1:8000/send-digest", {
      coins_of_interest: selectedCoins.map(c => c.value),
      recipient_email: recipientEmail
    })
      .then(res => {
        setResponseMsg("✅ Digest email sent successfully!");
        setSendingDigest(false);
        setRecipientEmail("");
        setSelectedCoins([]);
      })
      .catch(err => {
        console.error(err);
        setResponseMsg("❌ Failed to send digest.");
        setSendingDigest(false);
      });
  };

  const handleInputChange = (inputValue) => {
    const filtered = availableCoins.filter((coin) =>
      coin.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-white">📧 Send Daily Crypto Digest</h2>

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
              onInputChange={handleInputChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#1f2937',
                  color: 'white',
                  borderColor: '#4b5563',
                }),
                input: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
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
          </div>

          <div className="mb-4">
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-2 px-5 py-2 bg-green-500 hover:bg-green-600 rounded text-white flex items-center gap-2"
            disabled={sendingDigest}
          >
            {sendingDigest && (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            )}
            {sendingDigest ? 'Sending...' : 'Send Digest'}
          </button>

          {responseMsg && (
            <div className={`mt-4 p-3 rounded ${responseMsg.startsWith("✅") ? "bg-green-700" : "bg-red-700"} text-white`}>
              {responseMsg}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CryptoDigest;
