import { useState, useLayoutEffect, PropsWithChildren, useMemo } from "react";

import { ThemeContext, TTheme } from "./themeContext";

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

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<TTheme>(getPersistedTheme);

    const actualTheme = useMemo(() => {
        return theme === "system" ? getSystemPreferedTheme() : theme;
    }, [theme]);

    useLayoutEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.className = actualTheme + "Theme";
    }, [theme, actualTheme]);

    return (
        <ThemeContext value={{ theme, actualTheme, setTheme }}>
            {children}
        </ThemeContext>
    );
};

export default ThemeProvider;
