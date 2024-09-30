import Sensor from "../../types/Sensor";
import classNames from "./SensorListItem.module.css";

interface IProps {
    sensor: Sensor;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SensorListItem: React.FC<IProps> = ({ sensor, onClick }) => {
    return (
        <button className={classNames.root} onClick={onClick}>
            <div className={classNames.heading}>Czujnik {sensor.sensorId}</div>
            <div>Wydział: {sensor.location.facultyName}</div>
            <div>Temperatura: {sensor.currentTemperature}° C</div>
        </button>
    );
};

export default SensorListItem;
