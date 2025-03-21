import styles from "./MapPortal.module.css";
import { createPortal } from "react-dom";
import { useMap } from "maplibre-react-components";

const MapPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
    const mapContainerEl = useMap().getContainer();

    return createPortal(
        <div className={styles.root}>
            {children}
        </div>,
        mapContainerEl,
    );
};

export default MapPortal;
