import { Suspense, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import "./leaflet.css";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import AppHeader from "./components/AppHeader/AppHeader";
import MniswBar from "./components/MniswBar/MniswBar";
import { useMapContext } from "./contexts/MapContextProvider";

const App: React.FC = () => {
    const { leafletContext, setMapElement } = useMapContext();
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMapElement(elRef.current);
        return () => {
            setMapElement(null);
        };
    }, [setMapElement]);

    return (
        <>
            <AppHeader className={styles.appHeader} />
            <MniswBar />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.leftRight}>
                    <Suspense>
                        {leafletContext && <Outlet />}
                    </Suspense>
                    <div className={styles.mapContainer} ref={elRef} />
                </div>
            </div>
        </>
    );
};

export default App;
