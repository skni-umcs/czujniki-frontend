import { useState, useLayoutEffect, PropsWithChildren } from "react";

import { FontSizeContext, TFontSize } from "./fontSizeContext";

const FontSizeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [fontSize, setFontSize] = useState<TFontSize>("normal");

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
        <FontSizeContext value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext>
    );
};

export default FontSizeProvider;
