import { icon, IconOptions } from "leaflet";
import { Marker, useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import clsx from "clsx/lite";

import Sensor from "../../types/Sensor";
import styles from "./SensorMarker.module.css";

const myIconProps: IconOptions = {
    className: styles.root,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    iconUrl: "/marker-icon.png",
    iconRetinaUrl: "/marker-icon-2x.png",
    shadowUrl: "/marker-shadow.png",
};

const myIcon = icon(myIconProps);
const myIconActive = icon({
    ...myIconProps,
    className: clsx(myIconProps.className, styles.active),
});

interface IPropsMarker extends React.PropsWithChildren {
    sensor: Sensor;
    isActive?: boolean;
}

const SensorMarker: React.FC<IPropsMarker> = ({ sensor, isActive }) => {
    const navigate = useNavigate();

    // handleBlur
    useMapEvent("click", () => {
        if (!isActive) return;
        navigate("/sensors");
    });

    const handleClick = () => {
        navigate(`/sensors/${sensor.id.toString()}`);
    };

    return (
        <Marker
            icon={!isActive ? myIcon : myIconActive}
            position={[sensor.location.latitude, sensor.location.longitude]}
            eventHandlers={{ click: handleClick }}
            title={`${sensor.location.facultyName} ${sensor.location.id.toString()}`}
        />
    );
};

export default SensorMarker;
