import { Link } from "react-router-dom";

import Sensor from "../../types/Sensor";
import classNames from "./SensorListItem.module.css";

interface IProps {
    sensor: Sensor;
}

const SensorListItem: React.FC<IProps> = ({ sensor }) => {
    return (
        <Link
            to={`/sensors/${sensor.sensorId.toString()}`}
            className={classNames.root}
        >
            <div className={classNames.heading}>Czujnik {sensor.sensorId}</div>
            <div>Wydział: {sensor.location.facultyName}</div>
            <div>Temperatura: {sensor.currentTemperature}° C</div>
        </Link>
    );
};

export default SensorListItem;
