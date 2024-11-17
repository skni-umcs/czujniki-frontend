import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import MapContextProvider from "./contexts/MapContextProvider.tsx";
import ThemeProvider from "./contexts/ThemeProvider.tsx";
import FontSizeProvider from "./contexts/FontSizeProvider.tsx";
import router from "./router.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FontSizeProvider>
            <ThemeProvider>
                <MapContextProvider>
                    <RouterProvider router={router} />
                </MapContextProvider>
            </ThemeProvider>
        </FontSizeProvider>
    </React.StrictMode>,
);
