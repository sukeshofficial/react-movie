import { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  // Fetch logged-in user on app load

  useEffect(() => {
    axios
      .get("http://localhost:4001/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUser(res.data);

          if (!toastShown.current) {
            toast.success(`Welcome ${res.data.name}! 👋`);
            toastShown.current = true;
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    user,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
