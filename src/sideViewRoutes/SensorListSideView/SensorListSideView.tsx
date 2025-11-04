import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { useEffect } from "react";

import styles from "./SensorListSideView.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../../components/SensorListItem/SensorListItem";
import SideView from "../../components/SideView/SideView";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker";

export interface ISensorListSideViewLoaderData {
    sensorList: Sensor[];
    query?: string;
};

interface IProps {
    title?: string;
};

const SensorListSideView: React.FC<IProps> = ({ title }) => {
    const { sensorList, query } = useLoaderData<ISensorListSideViewLoaderData>();
    const { submit, data: fetcherData } = useFetcher<ISensorListSideViewLoaderData>();

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            void submit({ forceUpdate: "1" }, { method: "get" });
        }, 3 * 60 * 1000); // 3 minutes

        return () => {
            window.clearInterval(intervalId);
        };
    }, [submit]);

    const effectiveSensorList = fetcherData?.sensorList ?? sensorList;

    return (
        <SideView title={title ?? "Lista czujników"}>
            <MapPortal>
                {effectiveSensorList.map(s => <SensorMarker key={s.id} sensor={s} />)}
            </MapPortal>
            <div className={styles.root}>
                <Form method="get" className={styles.searchBarContainer}>
                    <input
                        name="q"
                        type="search"
                        placeholder="Szukaj..."
                        defaultValue={query}
                        className={styles.searchBar}
                    />
                </Form>
                {effectiveSensorList.map(sensor => (
                    <SensorListItem
                        sensor={sensor}
                        key={sensor.id}
                    />
                ))}
                {effectiveSensorList.length === 0 && (
                    <div className={styles.emptyList}>Lista jest pusta</div>
                )}
            </div>
        </SideView>
    );
};

export default SensorListSideView;
