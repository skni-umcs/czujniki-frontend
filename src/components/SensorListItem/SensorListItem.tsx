import { Link } from "react-router-dom";

import Sensor from "../../types/Sensor";
import { Status } from "../../types/Status";
import styles from "./SensorListItem.module.css";

interface IProps {
    sensor: Sensor;
}

const SensorListItem: React.FC<IProps> = ({ sensor: s }) => {
    return (
        <Link
            to={`/sensors/${s.id.toString()}`}
            className={styles.root}
        >
            <div className={styles.heading}>{s.location.facultyAbbreviation} {s.id}</div>

            {(s.floor !== undefined && s.floor !== null) && (
                <div>Piętro: {s.floor}</div>
            )}

            <div>{s.location.facultyName}</div>

            {s.status === "ONLINE" && s.temperature !== undefined && (
                <div>Temperatura: {s.temperature}° C</div>
            )}

            {s.status === "ERROR" && (
                <div>Status: <span className={styles.statusError}>{Status[s.status]}</span></div>
            )}

            {s.status === "OFFLINE" && (
                <div>Status: <span className={styles.statusOffline}>{Status[s.status]}</span></div>
            )}
        </Link>
    );
};

export default SensorListItem;
