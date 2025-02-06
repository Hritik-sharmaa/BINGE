import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { Card, CardContent } from "@shadcn/ui/card";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const MovieList = ({ category, title }: { category: string; title: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/movie/${category}?api_key=${process.env.API_KEY}`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-md"
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
