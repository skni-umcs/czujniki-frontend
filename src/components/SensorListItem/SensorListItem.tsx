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

            {s.lastUpdate && (
                <div>Zaktualizowano: <b>{new Date(s.lastUpdate).toLocaleString()}</b></div>
            )}

            {s.status === "ONLINE" && s.temperature !== undefined && (
                <div>Temperatura: <b>{s.temperature}° C</b></div>
            )}

            {s.status === "ERROR" && (
                <div className={styles.statusError}>{Status[s.status]}</div>
            )}

            {s.status === "OFFLINE" && (
                <div className={styles.statusOffline}>{Status[s.status]}</div>
            )}
        </Link>
    );
};

export default SensorListItem;
