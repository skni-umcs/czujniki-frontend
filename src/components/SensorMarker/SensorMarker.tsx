import { useNavigate } from "react-router-dom";
import clsx from "clsx/lite";

import Sensor from "../../types/Sensor";
import styles from "./SensorMarker.module.css";
import { RMarker } from "maplibre-react-components";

interface IPropsMarker extends React.PropsWithChildren {
    sensor: Sensor;
    isActive?: boolean;
}

const SensorMarker: React.FC<IPropsMarker> = ({ sensor, isActive }) => {
    const navigate = useNavigate();

    // handleBlur
    // useMapEvent("click", () => {
    //     if (!isActive) return;
    //     void navigate("/sensors");
    // });

    const handleClick = () => {
        void navigate(`/sensors/${sensor.id.toString()}`);
    };

    return (
        <RMarker
            // icon={!isActive ? myIcon : myIconActive}
            className={clsx(isActive && styles.active)}
            latitude={sensor.location.latitude}
            longitude={sensor.location.longitude}
            onClick={handleClick}
            // title={`${sensor.location.facultyName} ${sensor.location.id.toString()}`}
        />
    );
};

export default SensorMarker;
