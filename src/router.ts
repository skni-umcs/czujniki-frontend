/* eslint-disable @typescript-eslint/require-await */
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./routes/ErrorPage.tsx";
import MainRoute, { IMainRouteLoaderData } from "./routes/MainRoute/MainRoute.tsx";
import SensorList, { ISensorListLoaderData } from "./routes/SensorList/SensorList.tsx";
import SensorSideView, { ISensorSideViewLoaderData } from "./routes/SensorSideView/SensorSideView.tsx";
import Login from "./routes/Login/Login.tsx";
import Register from "./routes/Register/Register.tsx";
import Sensor from "./types/Sensor.ts";
import json from "./sensors.json";
import App from "./App.tsx";
import AccessibilitySideView from "./routes/AccessibilitySideView/AccessibilitySideView.tsx";

const sensorList: Sensor[] = json;

const router = createBrowserRouter([
    {
        Component: App,
        ErrorBoundary: ErrorPage,
        children: [
            {
                path: "/",
                Component: MainRoute,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<IMainRouteLoaderData> => ({ sensorList }),
            },
            {
                path: "/accessibility",
                Component: AccessibilitySideView,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<IMainRouteLoaderData> => ({ sensorList }),
            },
            {
                path: "/sensors",
                Component: SensorList,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<ISensorListLoaderData> => ({ sensorList }),
            },
            {
                path: "/sensors/:id",
                Component: SensorSideView,
                ErrorBoundary: ErrorPage,
                loader: async ({ params }): Promise<ISensorSideViewLoaderData> => {
                    const sensor = sensorList.find(s => s.sensorId === Number(params.id));
                    if (!sensor) throw new Error("404 sensorId");
                    return { sensor, sensorList };
                },
            },
        ],
    },
    {
        path: "/login",
        Component: Login,
        ErrorBoundary: ErrorPage,
    },
    {
        path: "/register",
        Component: Register,
        ErrorBoundary: ErrorPage,
    },
]);

export default router;
