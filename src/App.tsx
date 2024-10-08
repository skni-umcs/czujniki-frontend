import { Suspense, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import AppHeader from "./components/AppHeader/AppHeader";
import { useMapContext } from "./contexts/MapContextProvider";

const App: React.FC = () => {
    const { leafletContext, setMapElement } = useMapContext();
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMapElement(elRef.current);
        return () => {
            setMapElement(null);
        };
    }, []);

    return (
        <>
            <AppHeader className={styles.appHeader} />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.leftRight}>
                    <Suspense>
                        {leafletContext && <Outlet />}
                    </Suspense>
                    <div className={styles.mapContainer} ref={elRef}>
                        {leafletContext && (
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
