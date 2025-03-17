import styles from "./MapPortal.module.css";
import { createPortal } from "react-dom";
import { useMap } from "maplibre-react-components";

const MapPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
    const map = useMap("mapA");
    if (!map) return null;

    return createPortal(
        <div className={styles.root}>
            {/* <ZoomControl /> */}
            {/* TESTTTTTTTT */}
            {children}
        </div>,
        map.getContainer(),
    );
};

export default MapPortal;
