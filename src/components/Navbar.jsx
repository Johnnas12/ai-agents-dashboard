import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="bg-neutral-800 p-4 shadow-lg flex gap-8">
      <Link to="/" className="text-xl font-bold text-white">AI Agents Dashboard</Link>
        <Link to="/top-10-coins" className="hover:text-green-400">Top 10 Coins</Link>
      <Link to="/market-summary" className="hover:text-green-400">Market Summary</Link>
    </nav>
  );
}

export default Navbar;
