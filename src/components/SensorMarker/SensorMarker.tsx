import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RMarker } from "maplibre-react-components";
import clsx from "clsx/lite";

import Sensor from "../../types/Sensor";
import styles from "./SensorMarker.module.css";
import useActiveMarkerBlur from "./useActiveMarkerBlur";
import useFlyToWithRestore from "./useFlyToWithRestore";

interface IPropsMarker extends React.PropsWithChildren {
    sensor: Sensor;
    isActive?: boolean;
}

const SensorMarker: React.FC<IPropsMarker> = ({ sensor, isActive = false }) => {
    const navigate = useNavigate();
    const markerRef = useRef<maplibregl.Marker>(null);

    useEffect(() => {
        if (markerRef.current) {
            const title = `${sensor.location.facultyName} ${sensor.location.id.toString()}`;
            markerRef.current.getElement().title = title;
        }
    }, [sensor.location.facultyName, sensor.location.id]);

    useActiveMarkerBlur(isActive);
    useFlyToWithRestore(isActive, sensor.location.latitude, sensor.location.longitude);

    const handleClick = () => {
        void navigate(`/sensors/${sensor.id.toString()}`);
    };

    return (
        <RMarker
            ref={markerRef}
            className={clsx(styles.root, isActive && styles.active)}
            latitude={sensor.location.latitude}
            longitude={sensor.location.longitude}
            onClick={handleClick}
            subpixelPositioning
            initialColor="currentColor"
        />
    );
};

export default SensorMarker;
