import { createContext, useState, useLayoutEffect, PropsWithChildren, useContext } from "react";

export type TTheme = "light" | "dark" | "highContrast";

interface TThemeContext {
    theme: TTheme;
    setTheme: React.Dispatch<React.SetStateAction<TTheme>>;
}

const getSystemPreferedTheme = (): TTheme => {
    // if (window.matchMedia("(prefers-contrast: more)").matches) return "highContrast";
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
};

const getTheme = () => {
    const theme = localStorage.getItem("theme") as TTheme | null;
    return theme ?? getSystemPreferedTheme();
};

export const ThemeContext = createContext<TThemeContext>({
    theme: getTheme(),
    setTheme: () => void 0,
});

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState(getTheme);

    useLayoutEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.className = theme + "Theme";
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
