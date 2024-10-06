import { useLoaderData, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import styles from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../SensorListItem/SensorListItem";
import Sidebar from "../Sidebar/Sidebar";

const SensorList: React.FC = () => {
    const sensors = useLoaderData() as Sensor[];
    const navigate = useNavigate();

    return (
        <Sidebar>
            <div className={styles.root}>
                <div className={styles.firstRow}>
                    <div className={styles.backButtonPlaceholder} />
                    <div className={styles.heading}>
                        Lista czujników
                    </div>
                    <button
                        onClick={() => { navigate("/"); }}
                        className={styles.closeBtn}
                    >
                        <IoClose size={24} />
                    </button>
                </div>
                <div className={styles.searchBarContainer}>
                    <input
                        placeholder="Szukaj..."
                        className={styles.searchBar}
                    />
                </div>
                {sensors.map(sensor => (
                    <SensorListItem
                        sensor={sensor}
                        key={sensor.sensorId}
                    />
                ))}
            </div>
        </Sidebar>
    );
};

export default SensorList;
