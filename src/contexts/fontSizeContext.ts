import { createContext, useContext } from "react";

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

export const useFontSize = () => useContext(FontSizeContext);
