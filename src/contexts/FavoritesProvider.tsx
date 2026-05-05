import { useState, useLayoutEffect, PropsWithChildren } from "react";

import { FavoritesContext, getFavorites } from "./favoritesContext";

const FavoritesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [favorites, setFavorites] = useState(getFavorites);

    const addFavorite = (id: number) => {
        setFavorites(favs => [...favs, id]);
    };

    const removeFavorite = (id: number) => {
        setFavorites(favs => favs.filter(val => val !== id));
    };

    useLayoutEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext>
    );
};

export default FavoritesProvider;
