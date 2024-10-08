import { Icon, LatLngExpression, LeafletMouseEventHandlerFn } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Sensor from "../../types/Sensor";
import styles from "./SensorMarker.module.css";

const MyIconProps: Icon.DefaultIconOptions = {
    className: styles.root,
    iconSize: [25, 41],
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

    const position: LatLngExpression = [sensor.location.latitude, sensor.location.longitude];

    const handleClick: LeafletMouseEventHandlerFn = () => {
        navigate(`/sensors/${sensor.sensorId.toString()}`);
    };

    return (
        <Marker
            icon={!isActive ? MyIcon : MyIconActive}
            position={position}
            eventHandlers={{ click: handleClick }}
        >
            <Popup>
                {sensor.location.facultyName} {sensor.location.id}
            </Popup>
        </Marker>
    );
};

export default SensorMarker;
