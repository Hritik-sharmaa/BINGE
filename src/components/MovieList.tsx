import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const MovieList = ({
  category,
  title,
}: {
  category: string;
  title: string;
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } px-25 pt-10`}>
      <div className="flex items-center ">
        <h2 className="text-5xl font-bold mb-6">{title}</h2>
        <button
          onClick={() => navigate(`/movies-category/${category}`)}
          className={`px-5 py-1 ml-3 rounded-full font-semibold transition ${
            theme === "dark"
              ? "text-white border border-white"
              : "text-black border border-black"
          }`}>
          See All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.slice(0, 10).map((movie) => (
          <div key={movie.id}>
            <div>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-md w-full"
                />
                <h3 className="mt-2 font-bold">{movie.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
