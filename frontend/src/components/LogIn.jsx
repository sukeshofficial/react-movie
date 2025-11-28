import "../css/LogIn.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import GoogleIcon from "../assets/google.png";
import GithubIcon from "../assets/github.png";
import MovieImg from "../assets/movie.jpeg";

function LogIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const googleLogin = () => {
    window.location.href = "http://localhost:4001/auth/google";
  };
  
  const githubLogin = () => {
    window.location.href = "http://localhost:4001/auth/github";
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="login-wrapper">
      <div className="login-bg"></div>
      <div className="login-overlay"></div>

      <div className="login-card">
        <h1>Login to your account</h1>
        <p>Enter your email below to login</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="s@example.com" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className="btn-primary">Login</button>

        <div className="divider">or continue with</div>

        <button className="oauth-btn btn-github" onClick={githubLogin}>
          <img src={GithubIcon} className="github-img"/> Login with GitHub
        </button>

        <button className="oauth-btn btn-google" onClick={googleLogin}>
          <img src={GoogleIcon} /> Login with Google
        </button>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
