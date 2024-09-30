/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./routes/App.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import SensorSideView from "./components/SensorSideView/SensorSideView.tsx";
import json from "./sensors.json";
import Sensor from "./types/Sensor.ts";
import SensorList from "./components/SensorList/SensorList.tsx";

const sensors: Sensor[] = json;

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: async () => sensors,
        children: [
            {
                path: "/",
                element: <SensorList />,
                loader: async () => sensors,
            },
            {
                path: "sensors/:id",
                element: <SensorSideView />,
                loader: async ({ params }) => {
                    const sensor = sensors.find(s => s.sensorId === Number(params.id));
                    if (!sensor) throw new Error("404 sensorId");
                    return sensor;
                },
            },
        ],
    },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
