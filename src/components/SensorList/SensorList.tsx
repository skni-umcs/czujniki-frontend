import { useLoaderData, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import classNames from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../SensorListItem/SensorListItem";

const SensorList: React.FC = () => {
    const sensors = useLoaderData() as Sensor[];
    const navigate = useNavigate();

    return (
        <div className={classNames.root}>
            <div className={classNames.firstRow}>
                <div className={classNames.backButtonPlaceholder} />
                <div className={classNames.heading}>
                    Lista czujników
                </div>
                <button
                    onClick={() => { navigate("/"); }}
                    className={classNames.closeBtn}
                >
                    <IoClose size={24} />
                </button>
            </div>
            <div className={classNames.searchBarContainer}>
                <input
                    placeholder="Szukaj..."
                    className={classNames.searchBar}
                />
            </div>
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
