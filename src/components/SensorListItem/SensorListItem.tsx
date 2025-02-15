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
            <div>Wydział: {sensor.location.facultyName}</div>
            <div>Temperatura: {sensor.temperature}° C</div>
        </Link>
    );
};

export default SensorListItem;
