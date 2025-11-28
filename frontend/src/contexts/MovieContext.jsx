import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    // Create a key based on user email
    const getStorageKey = () => {
        if (!user) return "favorites_guest";
        return `favorites_${user.email}`;
    };

    // Load favorites when user logs in
    useEffect(() => {
        const key = getStorageKey();
        const saved = JSON.parse(localStorage.getItem(key)) || [];
        setFavorites(saved);
    }, [user]);

     // Save favorites whenever they change
    useEffect(() => {
        const key = getStorageKey();
        localStorage.setItem(key, JSON.stringify(favorites));
    }, [favorites, user]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite
    }

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
};

export const useMovies = () => useContext(MovieContext);