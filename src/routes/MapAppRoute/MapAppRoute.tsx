import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import SensorMap from "../../components/SensorMap/SensorMap";
import MainAppTemplate from "../../components/MapAppTemplate/MapAppTemplate";

const MapAppRoute: React.FC = () => {
    return (
        <MainAppTemplate>
            <Suspense>
                <Outlet />
            </Suspense>
            <SensorMap />
        </MainAppTemplate>
    );
};

export default MapAppRoute;
