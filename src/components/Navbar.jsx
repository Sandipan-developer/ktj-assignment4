import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center container mx-auto px-4">
        <h1 className="text-xl font-bold">📰 NewsDashboard</h1>

        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1 rounded text-black"
          />
          <button type="submit" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">
            Go
          </button>
        </form>

        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/saved" className="hover:underline">My Summaries</Link>
        </div>
      </div>
    </nav>
  );
}




