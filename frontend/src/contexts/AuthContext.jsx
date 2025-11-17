import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    // Fetch logged-in user on app load
    useEffect(() => {
        axios
        .get('http://localhost:4001/auth/me')
        .then((res) => {
            if(res.data) {
                setUser(res.data);
                toast.success(`Welcome ${res.data.name}! 👋`);
            }
        })
        .finally(() => setLoading(false));
    }, []);

    const value = {
        user, 
        loading 
    }
    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
}