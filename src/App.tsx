import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList category="popular" title="Latest Movies" />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
