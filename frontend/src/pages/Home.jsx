import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";
import SearchIcon from "../assets/search-icon.png";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    loadMovies(page);
  }, []);

  const loadMovies = async (pageNumber) => {
    try {
      const popularMovies = await getPopularMovies(pageNumber);
      setMovies((prev) => [...prev, ...popularMovies]);
    } catch (err) {
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (bottom && !isFetchingMore && !loading) {
        setIsFetchingMore(true);
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore, loading]);

  // Fetch next page when page increments
  useEffect(() => {
    if (page !== 1) loadMovies(page);
  }, [page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      if (searchResults.length === 0) {
        setError(`No results found for "${searchQuery}"`);
        setMovies([]);
      } else {
        setError(null);
        setMovies(searchResults);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img src={SearchIcon}></img>
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
      {isFetchingMore && (
        <div className="loading-more">Loading more movies...</div>
      )}
    </div>
  );
}

export default Home;
