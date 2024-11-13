import { createContext, useMemo, useCallback, useState, useLayoutEffect, PropsWithChildren } from "react";

interface TSettings {
    theme: "light" | "dark" | "highContrast";
}

interface TSettingsContext {
    settings: TSettings;
    setSettings: (newValue: Partial<TSettings>) => void;
}

const defaultState: TSettingsContext = {
    settings: {
        theme: "light",
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSettings: () => { },
};

export const SettingsContext = createContext<TSettingsContext>(defaultState);

const saveSettings = (settings: TSettings) => {
    localStorage.setItem("settings", JSON.stringify(settings));
};

const getSettings = () => {
    const data = localStorage.getItem("settings");
    if (!data) return defaultState.settings;

    return JSON.parse(data) as TSettings;
};

const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [settings, setSettingsState] = useState(getSettings);

    const setSettings: TSettingsContext["setSettings"] = useCallback((newValue) => {
        const newSettings = { ...settings, ...newValue };

        saveSettings(newSettings);
        setSettingsState(newSettings);
    }, [settings]);

    const settingsCtxValue = useMemo(() => ({
        settings,
        setSettings,
    }), [settings, setSettings]);

    const { theme } = settings;
    useLayoutEffect(() => {
        const htmlRoot = document.documentElement;
        console.log(htmlRoot);

        htmlRoot.className = theme + "Theme";
    }, [theme]);

    return (
        <SettingsContext.Provider value={settingsCtxValue}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
