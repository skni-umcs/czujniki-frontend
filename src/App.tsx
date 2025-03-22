import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import AppHeader from "./components/AppHeader/AppHeader";
import MniswBar from "./components/MniswBar/MniswBar";
import SensorMap from "./components/SensorMap/SensorMap";

const App: React.FC = () => {
    return (
        <>
            <AppHeader className={styles.appHeader} />
            <MniswBar />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.leftRight}>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                    <SensorMap />
                </div>
            </div>
        </>
    );
};

export default App;
