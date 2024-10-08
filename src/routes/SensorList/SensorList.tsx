import { useLoaderData, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import styles from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../../components/SensorListItem/SensorListItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";

export interface ISensorListLoaderData {
    sensorList: Sensor[];
};

const SensorList: React.FC = () => {
    const { sensorList } = useLoaderData() as ISensorListLoaderData;
    const navigate = useNavigate();

    return (
        <Sidebar>
            <MapPortal>
                {sensorList.map(s => (
                    <SensorMarker key={s.sensorId} sensor={s} />
                ))}
            </MapPortal>
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
                {sensorList.map(sensor => (
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
