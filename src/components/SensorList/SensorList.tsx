import { useLoaderData } from "react-router-dom";

import classNames from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../SensorListItem/SensorListItem";

const SensorList: React.FC = () => {
    const sensors = useLoaderData() as Sensor[];

    return (
        <div className={classNames.root}>
            {sensors.map(sensor => (
                <SensorListItem
                    sensor={sensor}
                    key={sensor.sensorId}
                />
            ))}
        </div>
    );
};

export default SensorList;
