import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";

const categoryTitles: { [key: string]: string } = {
  popular: "Popular",
  now_playing: "Now Playing",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const MoviesCategory = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    if (!category) return;

    axios
      .get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`)
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      })
      .catch((err) => console.error(err));
  }, [category, page]);

  const title = categoryTitles[category as string] || category;

  return (
    <div
      className={`px-6 md:px-25 pt-10 min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}>
      <div className="flex items-center justify-between">
        <h2 className="text-5xl font-bold mb-6">{title} Movies</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
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
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
          disabled={page === 1}>
          Previous
        </button>
        {[...Array(Math.min(totalPages, 5))].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              page === i + 1 ? "bg-blue-600" : "bg-gray-700"
            } text-white`}>
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesCategory;
