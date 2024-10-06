import { useEffect, useRef } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Map as LeafletMap } from "leaflet";

import styles from "./App.module.css";
import Sensor from "../types/Sensor";
import Navbar from "../components/Navbar/Navbar";
import AppHeader from "../components/AppHeader/AppHeader";
import MapWrapper from "../components/MapWrapper/MapWrapper";

const App: React.FC = () => {
    const sensors = useLoaderData() as Sensor[];
    const leafletMapRef = useRef<LeafletMap>(null);
    const location = useLocation();

    useEffect(() => {
        leafletMapRef.current?.invalidateSize();
    }, [location.pathname]);

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.leftRight}>
                    <Outlet />
                    <MapWrapper sensors={sensors} leafletMapRef={leafletMapRef} />
                </div>
            </div>
        </>
    );
};

export default App;
