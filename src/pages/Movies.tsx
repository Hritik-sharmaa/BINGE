import MovieDetails from "../components/MovieDetails";
import MovieList from "../components/MovieList";
import "../index.css";

const Movies = () => {
  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <MovieList category="top_rated" title="Top Rated Movies" />
      <MovieList category="popular" title="Latest Movies" />
      <MovieList category="now_playing" title="Now Playing Movies" />
      <MovieList category="upcoming" title="Upcoming Movies" />
      <MovieDetails />
    </div>
  );
};

export default Movies;
