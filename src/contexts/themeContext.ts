import { createContext, useContext } from "react";

export type TTheme = "system" | "light" | "dark" | "highContrast";

interface TThemeContext {
    theme: TTheme;
    actualTheme: Omit<TTheme, "system">;
    setTheme: React.Dispatch<React.SetStateAction<TTheme>>;
}

const getSystemPreferedTheme = (): TTheme => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

    if (window.matchMedia("(prefers-contrast: forced)").matches
        || window.matchMedia("(forced-colors: active)").matches
    ) return "highContrast";

    return "light";
};

const getPersistedTheme = () => {
    const theme = localStorage.getItem("theme") as TTheme | null;
    return theme ?? getSystemPreferedTheme();
};

export const ThemeContext = createContext<TThemeContext>({
    theme: "system",
    actualTheme: getPersistedTheme(),
    setTheme: () => void 0,
});

export const useTheme = () => useContext(ThemeContext);
