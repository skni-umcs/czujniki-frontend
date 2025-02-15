import { useLoaderData } from "react-router-dom";

import styles from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../../components/SensorListItem/SensorListItem";
import SideView from "../../components/SideView/SideView";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker";

export interface ISensorListLoaderData {
    sensorList: Sensor[];
    title?: string;
};

const SensorList: React.FC = () => {
    const { sensorList, title } = useLoaderData<ISensorListLoaderData>();

    return (
        <SideView title={title ?? "Lista czujników"}>
            <MapPortal>
                {sensorList.map(s => <SensorMarker key={s.id} sensor={s} />)}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.searchBarContainer}>
                    <input
                        placeholder="Szukaj..."
                        className={styles.searchBar}
                    />
                </div>
                {sensorList.map(sensor => (
                    <SensorListItem
                        sensor={sensor}
                        key={sensor.id}
                    />
                ))}
                {sensorList.length === 0 && <div className={styles.emptyList}>Lista jest pusta</div>}
            </div>
        </SideView>
    );
};

export default SensorList;
