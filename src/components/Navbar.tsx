import { Link } from "react-router-dom";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "9f3c0d7229f3cdfc56cc0615b285ac32";
const BASE_URL = "https://api.themoviedb.org/3";

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: number; title: string }[]
  >([]);

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
    <nav className="flex py-5 bg-black text-white px-20 justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MoviesJunk.
      </Link>
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-10 w-[20rem] py-1 rounded-full text-white focus:outline-none border border-zinc-800"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-12 w-[20rem] bg-black text-white rounded-md shadow-md overflow-hidden">
            {suggestions.slice(0, 5).map((movie) => (
              <li
                key={movie.id}
                className="p-2 hover:bg-zinc-800 cursor-pointer">
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={toggleTheme}
          className="hover:bg-white hover:text-black p-2 rounded-full transition duration-300 cursor-pointer">
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
