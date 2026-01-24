import { createContext, useContext, useState, useEffect } from "react";

// CREATE CONTEXT
const FavouritesContext = createContext();

// PROVIDER
export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  // 🔴 LOAD FROM LOCALSTORAGE ON FIRST LOAD
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  // 🔴 SAVE TO LOCALSTORAGE WHENEVER FAVOURITES CHANGE
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // 🟢 ADD TO FAVOURITES
  const addFavourite = (item) => {
    const alreadyExists = favourites.find((fav) => fav.id === item.id);
    if (alreadyExists) return;

    setFavourites((prev) => [...prev, item]);
  };

  // 🔴 REMOVE FROM FAVOURITES
  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔴 CHECK IF ITEM IS FAVOURITE
  const isFavourite = (id) => {
    return favourites.some((item) => item.id === id);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

// CUSTOM HOOK
export function useFavourites() {
  return useContext(FavouritesContext);
}
