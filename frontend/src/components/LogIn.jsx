import "../css/LogIn.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LogIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const googleLogin = () => {};
  const githubLogin = () => {
    window.location.href = "http://localhost:4001/auth/github";
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="auth">
      <h2>Welcome to the OAuth Demo</h2>
      <button onClick={googleLogin}>Login with Google</button>
      <button onClick={githubLogin}>Login with Github</button>
      <Link to="/" className="skip-login">Skip Login →</Link>
    </div>
  );
}

export default LogIn;
