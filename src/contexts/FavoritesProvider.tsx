import { createContext, useState, useLayoutEffect, PropsWithChildren, useContext } from "react";

interface TFavoritesContext {
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
}

const getFavorites = () => {
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

const FavoritesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [favorites, setFavorites] = useState(getFavorites);

    const addFavorite: TFavoritesContext["addFavorite"] = (id) => {
        setFavorites(favs => [...favs, id]);
    };

    const removeFavorite: TFavoritesContext["removeFavorite"] = (id) => {
        setFavorites(favs => favs.filter(val => val !== id));
    };

    useLayoutEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);

export default FavoritesProvider;
