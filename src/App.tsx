import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { RMap, RNavigationControl } from "maplibre-react-components";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import AppHeader from "./components/AppHeader/AppHeader";
import MniswBar from "./components/MniswBar/MniswBar";

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
                    <RMap
                        id="mapA"
                        initialCenter={[22.5415, 51.244]}
                        initialZoom={17}
                        minZoom={16}
                        mapStyle="https://tiles.openfreemap.org/styles/liberty"
                    >
                        <RNavigationControl position="top-right" showCompass={false} />
                    </RMap>
                </div>
            </div>
        </>
    );
};

export default App;
