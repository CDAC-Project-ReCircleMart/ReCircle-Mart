/**
 * FavouritesContext.jsx
 * Manages liked listings across the app
 */

import { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  // Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (item) => {
    setFavourites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavourite = (id) => favourites.some((fav) => fav.id === id);

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
