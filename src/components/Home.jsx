import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome to the AI Agents Dashboard 🚀</h2>
      
      {/* System Status Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl text-white">System Status:</h3>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-white">System is up and running.</span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl text-white">Total Coins Tracked:</h3>
          <p className="text-white">150+</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl text-white">Total Active Users:</h3>
          <p className="text-white">500+</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl text-white">Top Coin: Bitcoin</h3>
          <p className="text-white">Price: $95420</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
