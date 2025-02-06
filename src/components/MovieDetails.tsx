import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "9f3c0d7229f3cdfc56cc0615b285ac32";
const BASE_URL = "https://api.themoviedb.org/3";

type Movie = {
  id: number;
  title: string;
  overview: string;
};

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
