import { Form, useLoaderData } from "react-router-dom";

import styles from "./SensorListSideView.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../../components/SensorListItem/SensorListItem";
import SideView from "../../components/SideView/SideView";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker";

export interface ISensorListSideViewLoaderData {
    sensorList: Sensor[];
    query?: string;
    title?: string;
};

const SensorListSideView: React.FC = () => {
    const { sensorList, query, title } = useLoaderData<ISensorListSideViewLoaderData>();

    return (
        <SideView title={title ?? "Lista czujników"}>
            <MapPortal>
                {sensorList.map(s => <SensorMarker key={s.id} sensor={s} />)}
            </MapPortal>
            <div className={styles.root}>
                <Form className={styles.searchBarContainer}>
                    <input
                        name="q"
                        type="search"
                        placeholder="Szukaj..."
                        defaultValue={query}
                        className={styles.searchBar}
                    />
                </Form>
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

export default SensorListSideView;
