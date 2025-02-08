import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeProvider";
import { FaStar } from "react-icons/fa";

type TVSeriesDetails = {
  name: string;
  overview: string;
  genres: { id: number; name: string }[];
  seasons: { season_number: number; episode_count: number; poster_path: string }[];
  poster_path: string;
  vote_average: number;
  first_air_date: string;
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

type Review = {
  id: string;
  author: string;
  content: string;
};

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const TvSeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tvseries, setTvseries] = useState<TVSeriesDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // Fetch TV series details
    axios
      .get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
      .then((res) => setTvseries(res.data))
      .catch((err) => console.error(err));

    // Fetch cast details
    axios
      .get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.error(err));

    // Fetch reviews
    axios
      .get(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}`)
      .then((res) => setReviews(res.data.results))
      .catch((err) => console.error(err));

    setLoading(false);
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  if (!tvseries) return <p className="text-center text-xl">TV Series not found.</p>;

  return (
    <div
      className={`max-w-6xl mx-auto p-6 ${
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* TV Series Header */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${tvseries.poster_path}`}
          alt={tvseries.name}
          className="w-1/3 md:w-64 rounded-lg shadow-lg"
        />
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-bold mb-2">{tvseries.name}</h1>
          <p className="text-lg mb-4">{tvseries.overview}</p>
          <p className="font-semibold flex items-center gap-2">
            <FaStar className="text-yellow-400" /> {tvseries.vote_average} / 10
          </p>
          <p className="font-semibold">📅 First Air Date: {tvseries.first_air_date}</p>
        </div>
      </div>

      {/* Genres Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Genres</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {tvseries.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Full Cast</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {cast.length > 0 ? (
            cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="flex flex-col items-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <span className="text-center text-sm font-semibold">{actor.name}</span>
                <span className="text-xs">{actor.character}</span>
              </div>
            ))
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      </div>

      {/* Seasons Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Seasons</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {tvseries.seasons.map((season) => (
            <div key={season.season_number} className="flex flex-col items-center">
              {season.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                  alt={`Season ${season.season_number}`}
                  className="w-36 h-52 rounded-lg shadow-md object-cover"
                />
              ) : (
                <div className="w-36 h-52 bg-gray-500 rounded-lg flex items-center justify-center text-white">
                  No Image
                </div>
              )}
              <p className="text-center text-lg mt-2 font-semibold">
                Season {season.season_number}
              </p>
              <p className="text-sm">{season.episode_count} Episodes</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4 mt-4">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-b pb-4">
                <p className="font-semibold">{review.author}</p>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">No reviews available for this series.</p>
        )}
      </div>
    </div>
  );
};

export default TvSeriesDetails;
