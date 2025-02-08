import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider";

type Movie = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
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

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Fetch movie details
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch movie credits (cast)
    axios
      .get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.error(err));

    // Fetch movie reviews
    axios
      .get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
      .then((res) => setReviews(res.data.results))
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  if (!movie) return <p className="text-center text-xl">Movie not found.</p>;

  return (
    <div
      className={`max-w-6xl mx-auto p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-1/3 md:w-64 rounded-lg shadow-lg"
        />
        <div className="flex flex-col w-full">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-400" />
            <span className="ml-2">{movie.vote_average} / 10</span>
          </div>
          <p className="mb-4 text-lg">{movie.overview}</p>
          <p className="font-semibold">Release Date: {movie.release_date}</p>
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
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <span className="text-center text-sm">{actor.name}</span>
                <span className="text-xs">{actor.character}</span>
              </div>
            ))
          ) : (
            <p>No cast information available.</p>
          )}
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
          <p className="mt-4">No reviews available for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
