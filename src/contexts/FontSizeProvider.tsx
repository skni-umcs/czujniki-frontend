import { createContext, useState, useLayoutEffect, PropsWithChildren, useContext } from "react";

export type TFontSize = "normal" | "large" | "larger";

interface TFontSizeContext {
    fontSize: TFontSize;
    setFontSize: React.Dispatch<React.SetStateAction<TFontSize>>;
}

const getFontSize = () => {
    const fontSize = localStorage.getItem("fontSize") as TFontSize | null;
    return fontSize ?? "normal";
};

export const FontSizeContext = createContext<TFontSizeContext>({
    fontSize: getFontSize(),
    setFontSize: () => void 0,
});

const FontSizeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [fontSize, setFontSize] = useState(getFontSize);

    useLayoutEffect(() => {
        localStorage.setItem("fontSize", fontSize);

        switch (fontSize) {
            case "larger":
                document.documentElement.style.fontSize = "20px";
                break;
            case "large":
                document.documentElement.style.fontSize = "18px";
                break;
            default:
                document.documentElement.style.fontSize = "16px";
                break;
        }
    }, [fontSize]);

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => useContext(FontSizeContext);

export default FontSizeProvider;
