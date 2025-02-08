import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

type TVSeries = {
  id: number;
  name: string;
  poster_path: string;
};

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const TvseriesList = ({
  category,
  title,
}: {
  category: string;
  title: string;
}) => {
  const [tvseries, setTvseries] = useState<TVSeries[]>([]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tv/${category}?api_key=${API_KEY}`)
      .then((res) => setTvseries(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } px-25 pt-10`}>
      <div className="flex items-center ">
        <h2 className="text-5xl font-bold mb-6">{title} Tv series</h2>
        <button
          onClick={() => navigate(`/tv-series-category/${category}`)}
          className={`px-5 py-1 ml-3 rounded-full font-semibold transition ${
            theme === "dark"
              ? "text-white border border-white"
              : "text-black border border-black"
          }`}>
          See All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tvseries.slice(0, 10).map((series) => (
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
    </div>
  );
};

export default TvseriesList;
