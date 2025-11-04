import { createBrowserRouter, redirect } from "react-router-dom";

import { getFavorites } from "./contexts/FavoritesProvider.tsx";
import ErrorRouteFallback from "./routes/ErrorRouteFallback/ErrorRouteFallback.tsx";
import MapAppRoute from "./routes/MapAppRoute/MapAppRoute.tsx";
import MapAppRouteSkeleton from "./routes/MapAppRouteSkeleton/MapAppRouteSkeleton.tsx";

import HiddenSideView, { IHiddenSideViewLoaderData } from "./sideViewRoutes/HiddenSideView/HiddenSideView.tsx";
import SensorListSideView, { ISensorListSideViewLoaderData } from "./sideViewRoutes/SensorListSideView/SensorListSideView.tsx";
import SensorSideView, { ISensorSideViewLoaderData } from "./sideViewRoutes/SensorSideView/SensorSideView.tsx";
import AccessibilitySideView, { IAccessibilitySideViewLoaderData } from "./sideViewRoutes/AccessibilitySideView/AccessibilitySideView.tsx";
import AboutSideView from "./sideViewRoutes/AboutSideView/AboutSideView.tsx";
import ErrorSideView from "./sideViewRoutes/ErrorSideView/ErrorSideView.tsx";

import DataProvider from "./DataProvider.ts";
import Sensor from "./types/Sensor.ts";

const repo = new DataProvider();

const router = createBrowserRouter([
    {
        Component: MapAppRoute,
        HydrateFallback: MapAppRouteSkeleton,
        ErrorBoundary: ErrorRouteFallback,
        children: [
            {
                path: "/",
                Component: HiddenSideView,
                ErrorBoundary: ErrorSideView,
                loader: async (): Promise<IHiddenSideViewLoaderData> => {
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
                path: "/sensor/:id",
                // eslint-disable-next-line @typescript-eslint/require-await
                loader: async ({ params }) => {
                    if (!params.id) return redirect("/") as never;
                    return redirect(`/sensors/${params.id}`);
                },
            },
            {
                path: "/sensors/:id",
                Component: SensorSideView,
                ErrorBoundary: ErrorSideView,
                action: async ({ request }) => {
                    const updatedSensor = await request.json() as Sensor;
                    repo.updateCachedSensor(updatedSensor);

                    return updatedSensor;
                },
                loader: async ({ request, params }): Promise<ISensorSideViewLoaderData> => {
                    if (!params.id) return redirect("/") as never;
                    const url = new URL(request.url);
                    const startDate = url.searchParams.get("startDate");
                    const endDate = url.searchParams.get("endDate");
                    const forceUpdate = url.searchParams.get("forceUpdate") === "1";

                    try {
                        const sensorList = await repo.getAllSensors();
                        const sensor = await repo.getSensor(Number(params.id));

                        const historicalDataPromise = repo.getHistoricalData(
                            Number(params.id),
                            startDate,
                            endDate,
                            forceUpdate,
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
                path: "/sensors",
                Component: SensorListSideView,
                ErrorBoundary: ErrorSideView,
                loader: async ({ request }): Promise<ISensorListSideViewLoaderData> => {
                    const url = new URL(request.url);
                    const query = url.searchParams.get("q") ?? "";
                    const forceUpdate = url.searchParams.get("forceUpdate") === "1";

                    const sensorList = query
                        ? (await repo.findSensors(query)).content
                        : await repo.getAllSensors(forceUpdate);

                    return { sensorList, query };
                },
            },
            {
                path: "/favorites",
                element: <SensorListSideView title="Ulubione czujniki" />,
                ErrorBoundary: ErrorSideView,
                loader: async ({ request }): Promise<ISensorListSideViewLoaderData> => {
                    const url = new URL(request.url);
                    const query = url.searchParams.get("q") ?? "";
                    const forceUpdate = url.searchParams.get("forceUpdate") === "1";

                    const sensorList = query
                        ? (await repo.findSensors(query)).content
                        : forceUpdate
                            ? (await repo.findSensors("")).content
                            : await repo.getAllSensors(forceUpdate);

                    const favIds = getFavorites();
                    const favorites = sensorList.filter(el => favIds.includes(el.id));

                    return { sensorList: favorites, query };
                },
            },
        ],
    },
]);

export default router;
