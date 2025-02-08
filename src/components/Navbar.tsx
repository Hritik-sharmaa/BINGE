import { Link } from "react-router-dom";
import { Moon, Sun, Search, Menu, X } from "lucide-react"; // Import icons
import { useTheme } from "../context/ThemeProvider";
import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: number; title: string }[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      axios
        .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => setSuggestions(res.data.results))
        .catch((err) => console.error(err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <nav
      className={`flex py-5 px-6 md:px-16 justify-between items-center ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-200 text-black"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        BINGE.
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        <Link to="/movies" className="text-xl hover:text-zinc-400 cursor-pointer">
          Movies
        </Link>
        <Link to="/tv-series" className="text-xl hover:text-zinc-400 cursor-pointer">
          TV Series
        </Link>
      </div>


      <div className="hidden md:flex items-center gap-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`px-10 w-[16rem] md:w-[20rem] py-2 rounded-full focus:outline-none border border-zinc-800 ${
              theme === "dark" ? "text-white bg-black" : "text-black bg-white"
            }`}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute top-12 w-[20rem] bg-black text-white rounded-md shadow-md overflow-hidden">
            {suggestions.slice(0, 5).map((movie) => (
              <li key={movie.id} className="p-2 hover:bg-zinc-800 cursor-pointer">
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <button onClick={toggleTheme} className="p-2 rounded-full transition duration-300 cursor-pointer">
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-16 left-0 w-full ${
            theme === "dark" ? "bg-black text-white" : "bg-gray-200 text-black"
          } p-6 shadow-md flex flex-col items-center space-y-4 md:hidden`}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`px-4 w-full py-2 rounded-md focus:outline-none border border-zinc-800 ${
                theme === "dark" ? "text-white bg-black" : "text-black bg-white"
              }`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <Link to="/movies" className="text-lg hover:text-zinc-400 cursor-pointer">
            Movies
          </Link>
          <Link to="/tv-series" className="text-lg hover:text-zinc-400 cursor-pointer">
            TV Series
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full transition duration-300 cursor-pointer">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
