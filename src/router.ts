import { createBrowserRouter } from "react-router-dom";

import { getFavorites } from "./contexts/FavoritesProvider.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import MainRoute, { IMainRouteLoaderData } from "./routes/MainRoute/MainRoute.tsx";
import SensorList, { ISensorListLoaderData } from "./routes/SensorList/SensorList.tsx";
import SensorSideView, { ISensorSideViewLoaderData } from "./routes/SensorSideView/SensorSideView.tsx";
import AccessibilitySideView, { IAccessibilitySideViewLoaderData } from "./routes/AccessibilitySideView/AccessibilitySideView.tsx";
import Login from "./routes/Login/Login.tsx";
import Register from "./routes/Register/Register.tsx";
import Sensor from "./types/Sensor.ts";
import App from "./App.tsx";
import fetcher from "./fetcher.ts";

const router = createBrowserRouter([
    {
        Component: App,
        ErrorBoundary: ErrorPage,
        children: [
            {
                path: "/",
                Component: MainRoute,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<IMainRouteLoaderData> => {
                    const sensorList = await fetcher<Sensor[]>("/api/sensor/all");
                    return { sensorList };
                },
            },
            {
                path: "/accessibility",
                Component: AccessibilitySideView,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<IAccessibilitySideViewLoaderData> => {
                    const sensorList = await fetcher<Sensor[]>("/api/sensor/all");
                    return { sensorList };
                },
            },
            {
                path: "/sensors",
                Component: SensorList,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<ISensorListLoaderData> => {
                    const sensorList = await fetcher<Sensor[]>("/api/sensor/all");
                    return { sensorList };
                },
            },
            {
                path: "/sensors/:id",
                Component: SensorSideView,
                ErrorBoundary: ErrorPage,
                loader: async ({ params }): Promise<ISensorSideViewLoaderData> => {
                    if (!params.id) throw new Error("404 sensor id");

                    const sensor = await fetcher<Sensor>(`/api/sensor/${params.id}`);
                    const sensorList = await fetcher<Sensor[]>("/api/sensor/all");

                    return { sensor, sensorList };
                },
            },
            {
                path: "/favorites",
                Component: SensorList,
                ErrorBoundary: ErrorPage,
                loader: async (): Promise<ISensorListLoaderData> => {
                    const favIds = getFavorites();
                    const sensorList = await fetcher<Sensor[]>("/api/sensor/all");

                    const favorites = sensorList.filter(el => favIds.includes(el.id));

                    return { sensorList: favorites, title: "Ulubione czujniki" };
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
