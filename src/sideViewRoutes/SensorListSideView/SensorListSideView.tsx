import { useLoaderData, useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";

import styles from "./SensorListSideView.module.css";
import Sensor from "../../types/Sensor";
import SensorListItem from "../../components/SensorListItem/SensorListItem";
import SideView from "../../components/SideView/SideView";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker";
import SearchInput from "../../components/SearchInput/SearchInput";

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
    const lastQueryRef = useRef<string>("");
    const intervalIdRef = useRef<number>(undefined);

    useEffect(() => {
        if (lastQueryRef.current !== query) {
            lastQueryRef.current = query ?? "";
            window.clearInterval(intervalIdRef.current);

            intervalIdRef.current = window.setInterval(() => {
                void submit(
                    { forceUpdate: "1", q: query ?? "" },
                    { method: "get" },
                );
            }, 3 * 60 * 1000); // 3 minutes
        }
        return () => {
            window.clearInterval(intervalIdRef.current);
        };
    }, [query, submit]);

    const effectiveSensorList = fetcherData?.sensorList ?? sensorList;

    return (
        <SideView title={title ?? "Lista czujników"}>
            <MapPortal>
                {effectiveSensorList.map(s => <SensorMarker key={s.id} sensor={s} />)}
            </MapPortal>
            <div className={styles.root}>
                <SearchInput currentValue={query} />
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
