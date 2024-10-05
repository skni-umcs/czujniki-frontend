/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "leaflet/dist/leaflet.css";
import json from "./sensors.json";
import Sensor from "./types/Sensor.ts";
import App from "./routes/App.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import SensorSideView from "./components/SensorSideView/SensorSideView.tsx";
import SensorList from "./components/SensorList/SensorList.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";

const sensors: Sensor[] = json;

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: async () => sensors,
        children: [
            {
                path: "sensors/",
                element: <Sidebar><SensorList /></Sidebar>,
                loader: async () => sensors,
            },
            {
                path: "sensors/:id",
                element: <Sidebar><SensorSideView /></Sidebar>,
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
