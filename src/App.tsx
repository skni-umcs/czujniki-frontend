import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import SensorMap from "./components/SensorMap/SensorMap";
import MainAppTemplate from "./MainAppTemplate";

const App: React.FC = () => {
    return (
        <MainAppTemplate>
            <Suspense>
                <Outlet />
            </Suspense>
            <SensorMap />
        </MainAppTemplate>
    );
};

export default App;
