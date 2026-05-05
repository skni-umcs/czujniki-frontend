import { createPortal } from "react-dom";
import { CurrentMapIdContext, useMap } from "maplibre-react-components";

import styles from "./MapPortal.module.css";
import { mapID } from "../SensorMap/mapConstants";

const MapPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
    const mapContainerEl = useMap(mapID)?.getContainer();
    if (!mapContainerEl) return null;

    return createPortal(
        <CurrentMapIdContext value={mapID}>
            <div className={styles.root}>
                {children}
            </div>
        </CurrentMapIdContext>,
        mapContainerEl,
    );
};

export default MapPortal;
