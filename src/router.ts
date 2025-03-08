import { createBrowserRouter, redirect } from "react-router-dom";

import { getFavorites } from "./contexts/FavoritesProvider.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import MainRoute, { IMainRouteLoaderData } from "./routes/MainRoute/MainRoute.tsx";
import SensorList, { ISensorListLoaderData } from "./routes/SensorList/SensorList.tsx";
import SensorSideView, { ISensorSideViewLoaderData } from "./routes/SensorSideView/SensorSideView.tsx";
import AccessibilitySideView, { IAccessibilitySideViewLoaderData } from "./routes/AccessibilitySideView/AccessibilitySideView.tsx";
import AboutSideView from "./routes/AboutSideView/AboutSideView.tsx";
import ErrorSideView from "./routes/ErrorSideView/ErrorSideView.tsx";
import Login from "./routes/Login/Login.tsx";
import Register from "./routes/Register/Register.tsx";
import App from "./App.tsx";
import DataProvider from "./DataProvider.ts";

const repo = new DataProvider();

const router = createBrowserRouter([
    {
        Component: App,
        HydrateFallback: App,
        ErrorBoundary: ErrorPage,
        children: [
            {
                path: "/",
                Component: MainRoute,
                ErrorBoundary: ErrorSideView,
                loader: async (): Promise<IMainRouteLoaderData> => {
                    const sensorList = await repo.getAllSensors();
                    return { sensorList };
                },
            },
            {
                path: "/about",
                Component: AboutSideView,
                ErrorBoundary: ErrorSideView,
                loader: async (): Promise<IAccessibilitySideViewLoaderData> => {
                    const sensorList = await repo.getAllSensors();
                    return { sensorList };
                },
            },
            {
                path: "/accessibility",
                Component: AccessibilitySideView,
                ErrorBoundary: ErrorSideView,
                loader: async (): Promise<IAccessibilitySideViewLoaderData> => {
                    const sensorList = await repo.getAllSensors();
                    return { sensorList };
                },
            },
            {
                path: "/sensors",
                Component: SensorList,
                ErrorBoundary: ErrorSideView,
                loader: async (): Promise<ISensorListLoaderData> => {
                    const sensorList = await repo.getAllSensors();
                    return { sensorList };
                },
            },
            {
                path: "/sensors/:id",
                Component: SensorSideView,
                ErrorBoundary: ErrorSideView,
                loader: async ({ params }): Promise<ISensorSideViewLoaderData> => {
                    if (!params.id) return redirect("/") as never;

                    try {
                        const sensorList = await repo.getAllSensors();
                        const sensor = await repo.getSensor(Number(params.id));

                        const endDate = new Date();
                        const startDate = new Date();
                        startDate.setHours(endDate.getHours() - 1);

                        const historicalDataPromise = repo.getHistoricalData(
                            Number(params.id),
                            startDate,
                            endDate,
                        );

                        return { sensorList, sensor, historicalDataPromise };
                    } catch (error) {
                        if ((error as Error).message.includes("Sensor not found")) {
                            console.error(error);
                            return redirect("/") as never;
                        }
                        throw error;
                    }
                },
            },
            {
                path: "/favorites",
                Component: SensorList,
                ErrorBoundary: ErrorSideView,
                loader: async (): Promise<ISensorListLoaderData> => {
                    const favIds = getFavorites();
                    const sensorList = await repo.getAllSensors();

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
