import { Icon } from "leaflet";
import { Marker, useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import clsx from "clsx/lite";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconPngX2 from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import Sensor from "../../types/Sensor";
import styles from "./SensorMarker.module.css";

const MyIconProps: Icon.DefaultIconOptions = {
    className: styles.root,
    iconSize: [25, 41],
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIconPngX2,
    shadowUrl: markerShadowPng,
};

const MyIcon = new Icon.Default(MyIconProps);
const MyIconActive = new Icon.Default({
    ...MyIconProps,
    className: clsx(MyIconProps.className, styles.active),
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
        navigate(`/sensors/${sensor.sensorId.toString()}`);
    };

    return (
        <Marker
            icon={!isActive ? MyIcon : MyIconActive}
            position={[sensor.location.latitude, sensor.location.longitude]}
            eventHandlers={{ click: handleClick }}
            title={`${sensor.location.facultyName} ${sensor.location.id.toString()}`}
        />
    );
};

export default SensorMarker;
