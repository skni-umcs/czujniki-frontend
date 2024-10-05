import { Outlet, useLoaderData } from "react-router-dom";

import classNames from "./App.module.css";
import Sensor from "../types/Sensor";
import Navbar from "../components/Navbar/Navbar";
import AppHeader from "../components/AppHeader/AppHeader";
import MapWrapper from "../components/MapWrapper/MapWrapper";

const App: React.FC = () => {
    const sensors = useLoaderData() as Sensor[];

    return (
        <>
            <AppHeader />
            <div className={classNames.wrapper}>
                <Navbar />
                <div className={classNames.leftRight}>
                    <Outlet />
                    <MapWrapper sensors={sensors} />
                </div>
            </div>
        </>
    );
};

export default App;
