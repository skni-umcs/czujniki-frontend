import { useLoaderData } from "react-router-dom";

import styles from "./SensorList.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../../components/SensorListItem/SensorListItem";
import SideView from "../../components/SideView/SideView";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker";

export interface ISensorListLoaderData {
    sensorList: Sensor[];
};

const SensorList: React.FC = () => {
    const { sensorList } = useLoaderData() as ISensorListLoaderData;

    return (
        <SideView title="Lista czujników">
            <MapPortal>
                {sensorList.map(s => <SensorMarker key={s.sensorId} sensor={s} />)}
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
                        key={sensor.sensorId}
                    />
                ))}
            </div>
        </SideView>
    );
};

export default SensorList;
