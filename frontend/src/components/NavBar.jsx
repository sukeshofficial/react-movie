import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { useAuth } from "../contexts/AuthContext";
function NavBar() {
  const { user, loading } = useAuth();

  console.log("NavBar User:", user);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        {/* CTA SECTION */}
        <div className="navbar-cta">
          {!loading &&
            (user ? (
              <>
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </>
            ) : (
              <button
                className="login-btn"
                onClick={() =>
                  (window.location.href = "http://localhost:5173/auth")
                }
              >
                Login
              </button>
            ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
