import { Link } from "react-router-dom";

import Sensor from "../../types/Sensor";
import { Status } from "../../types/Status";
import styles from "./SensorListItem.module.css";

interface IProps {
    sensor: Sensor;
}

const SensorListItem: React.FC<IProps> = ({ sensor }) => {
    return (
        <Link
            to={`/sensors/${sensor.id.toString()}`}
            className={styles.root}
        >
            <div className={styles.heading}>{sensor.location.facultyAbbreviation} {sensor.id}</div>
            {(sensor.floor !== undefined && sensor.floor !== null) && (
                <div>Piętro: {sensor.floor}</div>
            )}
            <div>{sensor.location.facultyName}</div>
            {sensor.status === "ONLINE" && sensor.temperature !== undefined && (
                <div>Temperatura: {sensor.temperature}° C</div>
            )}
            {sensor.status === "ERROR" && (
                <div>Status: <span className={styles.statusError}>{Status[sensor.status]}</span></div>
            )}
            {sensor.status === "OFFLINE" && (
                <div>Status: <span className={styles.statusOffline}>{Status[sensor.status]}</span></div>
            )}
        </Link>
    );
};

export default SensorListItem;
