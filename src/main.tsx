import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RMapContextProvider } from "maplibre-react-components";

import "./index.css";

import ThemeProvider from "./contexts/ThemeProvider.tsx";
import FontSizeProvider from "./contexts/FontSizeProvider.tsx";
import FavoritesProvider from "./contexts/FavoritesProvider.tsx";
import router from "./router.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FontSizeProvider>
            <ThemeProvider>
                <FavoritesProvider>
                    <RMapContextProvider>
                        <RouterProvider router={router} />
                    </RMapContextProvider>
                </FavoritesProvider>
            </ThemeProvider>
        </FontSizeProvider>
    </React.StrictMode>,
);
