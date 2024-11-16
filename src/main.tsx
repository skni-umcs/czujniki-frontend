import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import MapContextProvider from "./contexts/MapContextProvider.tsx";
import SettingsProvider from "./contexts/ThemeProvider.tsx";
import router from "./router.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <SettingsProvider>
            <MapContextProvider>
                <RouterProvider router={router} />
            </MapContextProvider>
        </SettingsProvider>
    </React.StrictMode>,
);
