import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const categoryTitles: { [key: string]: string } = {
  popular: "Popular",
  now_playing: "Now Playing",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

type TVSeries = {
  id: number;
  name: string;
  poster_path: string;
};

const TvSeriesCategory = () => {
  const { category } = useParams();
  const [tvseries, setTvseries] = useState<TVSeries[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    if (!category) return;

    axios
      .get(`${BASE_URL}/tv/${category}?api_key=${API_KEY}&page=${page}`)
      .then((res) => {
        setTvseries(res.data.results);
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
      <h2 className="text-5xl font-bold mb-6">{title} TV Series</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tvseries.map((series) => (
          <div key={series.id}>
            <Link to={`/tv-series/${series.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
                className="rounded-lg shadow-md w-full"
              />
              <h3 className="mt-2 font-bold">{series.name}</h3>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

export default TvSeriesCategory;
