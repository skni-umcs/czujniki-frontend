import Sensor from "../../types/Sensor";
import classNames from "./SensorListItem.module.css";

interface IProps {
    sensor: Sensor;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SensorListItem: React.FC<IProps> = ({ sensor, onClick }) => {
    return (
        <button className={classNames.root} onClick={onClick}>
            <h2>Czujnik numer {sensor.sensorId}</h2>
            <p>Wydział: {sensor.location.facultyName}</p>
            <p>Temperatura: {sensor.currentTemperature}° C</p>
        </button>
    );
};

export default SensorListItem;
