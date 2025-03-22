import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CurrentMapIdContext } from "maplibre-react-components";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import AppHeader from "./components/AppHeader/AppHeader";
import MniswBar from "./components/MniswBar/MniswBar";
import SensorMap from "./components/SensorMap/SensorMap";

const mapID = "mapA";

const App: React.FC = () => {
    return (
        <>
            <AppHeader className={styles.appHeader} />
            <MniswBar />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.leftRight}>
                    <CurrentMapIdContext value={mapID}>
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </CurrentMapIdContext>
                    <SensorMap />
                </div>
            </div>
        </>
    );
};

export default App;
