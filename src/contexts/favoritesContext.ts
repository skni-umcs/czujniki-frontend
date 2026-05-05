import { createContext, useContext } from "react";

interface TFavoritesContext {
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
}

export const getFavorites = () => {
    const json = localStorage.getItem("favorites");
    if (!json) return [];

    const favorites = JSON.parse(json) as number[] | null;
    return favorites ?? [];
};

export const FavoritesContext = createContext<TFavoritesContext>({
    favorites: getFavorites(),
    addFavorite: () => void 0,
    removeFavorite: () => void 0,
});

export const useFavorites = () => useContext(FavoritesContext);
