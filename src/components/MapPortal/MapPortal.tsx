import { Control } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";

import styles from "./MapPortal.module.css";
import { createPortal } from "react-dom";
import { useMapContext } from "../../contexts/MapContextProvider.tsx";

export const ZoomControl = createControlComponent(
    () => new Control.Zoom({
        position: "topright",
        zoomInTitle: "Powiększ",
        zoomOutTitle: "Pomniejsz",
    }),
);

const MapPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { mapElement } = useMapContext();

    if (!mapElement) return null;

    return createPortal(
        <div className={styles.root}>
            <ZoomControl />
            {children}
        </div>,
        mapElement,
    );
};

export default MapPortal;
