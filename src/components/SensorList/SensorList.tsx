import { Dispatch, SetStateAction } from "react";

import classNames from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../SensorListItem/SensorListItem";

interface IProps {
    sensors: Sensor[];
    setActiveSensor: Dispatch<SetStateAction<Sensor | null>>;
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
