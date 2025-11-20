import "./css/App.css";
import Favourites from "./pages/Favorites";
import Home from "./pages/Home";
import LogIn from "./components/LogIn";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* Login page */}
          <Route path="/auth" element={<LogIn />} />

          {/* Public Dashboard */}
          <Route path="/" element={<Home />} />

          {/* Protected favorites (later we’ll protect it) */}
          <Route path="/favorites" element={<Favourites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
