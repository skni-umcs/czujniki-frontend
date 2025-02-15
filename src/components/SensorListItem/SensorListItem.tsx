import { Link } from "react-router-dom";

import Sensor from "../../types/Sensor";
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
            <div className={styles.heading}>Czujnik {sensor.id}</div>
            <div>{sensor.location.facultyName}</div>
            {sensor.temperature && <div>Temperatura: {sensor.temperature}° C</div>}
            {sensor.status !== "ONLINE" && <div>Status: {sensor.status}</div>}
        </Link>
    );
};

export default SensorListItem;
