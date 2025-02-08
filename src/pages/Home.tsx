import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import ThemeProvider from "../context/ThemeProvider";
import Navbar from "../components/Navbar";
import MovieDetails from "../components/MovieDetails";
import Movies from "./Movies";
import Tvseries from "./Tvseries";
import MovieList from "../components/MovieList";
import TvSeriesDetails from "./TvseriesDetails";
import MoviesCategory from "../components/MoviesCategory";
import TvSeriesCategory from "../components/TvseriesCategory";
import TvseriesList from "../components/TvseriesList";
import Footer from "../components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HomePage = () => {
  return (
    <>
      <div className="flex justify-center items-center text-5xl font-extrabold mt-20">
        <h1>Movies</h1>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.5 } },
        }}>
        <motion.div variants={fadeInUp}>
          <MovieList category="now_playing" title="Now Playing Movies" />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MovieList category="upcoming" title="Upcoming Movies" />
        </motion.div>
        <div className="flex justify-center items-center text-5xl font-extrabold mt-20">
          <h1>Tv series </h1>
        </div>
        <motion.div variants={fadeInUp}>
          <TvseriesList category="top_rated" title="Top Rated" />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <TvseriesList category="airing_today" title="Airing Today" />
        </motion.div>
      </motion.div>
    </>
  );
};

const Home = () => {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/tv-series" element={<Tvseries />} />
            <Route path="/tv-series/:id" element={<TvSeriesDetails />} />
            <Route
              path="/movies-category/:category"
              element={<MoviesCategory />}
            />
            <Route
              path="/tv-series-category/:category"
              element={<TvSeriesCategory />}
            />
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Home;
