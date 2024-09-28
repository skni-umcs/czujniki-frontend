import classNames from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../SensorListItem/SensorListItem";

interface IProps {
    sensors: Sensor[];
    setActiveSensor: (value: Sensor | null) => void;
}

const SensorList: React.FC<IProps> = ({ sensors, setActiveSensor }) => {
    return (
        <div className={classNames.root}>
            {sensors.map(sensor => (
                <SensorListItem
                    sensor={sensor}
                    key={sensor.sensorId}
                    onClick={() => { setActiveSensor(sensor); }}
                />
            ))}
        </div>
    );
};

export default SensorList;
