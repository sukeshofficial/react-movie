import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

function NavBar() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  console.log("NavBar User:", user);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
        <div className="navbar-cta" ref={menuRef}>
          {!loading &&
            (user ? (
              <>
                <div
                  className="profile-button"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {user.picture ? (
                    <img src={user.picture} className="avatar" />
                  ) : (
                    <div className="avatar-fallback">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {open && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <div className="profile-name">{user.name}</div>
                      <div className="profile-email">{user.email}</div>
                    </div>

                    <button
                      className="logout-btn"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                className="login-btn"
                onClick={() => (window.location.href = "http://localhost:5173/auth")}
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
