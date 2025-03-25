import { Suspense, useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { RiCheckLine, RiErrorWarningLine, RiRestTimeFill, RiSpeedUpFill, RiTempHotLine, RiWaterPercentFill } from "react-icons/ri";
import { VscRefresh } from "react-icons/vsc";
import clsx from "clsx/lite";

import styles from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor.ts";
import SensorData from "../../types/SensorData.ts";
import { Status } from "../../types/Status.ts";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import IconButton from "../../components/IconButton/IconButton.tsx";
import CurrentCondition from "../../components/CurrentCondition/CurrentCondition.tsx";
import { useFavorites } from "../../contexts/FavoritesProvider.tsx";
import Charts from "./Charts.tsx";

export interface ISensorSideViewLoaderData {
    sensorList: Sensor[];
    sensor: Sensor;
    historicalDataPromise: Promise<SensorData[]>;
};

const SensorSideView: React.FC = () => {
    const {
        sensorList,
        sensor: s,
        historicalDataPromise,
    } = useLoaderData<ISensorSideViewLoaderData>();
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const { submit } = useFetcher();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const evtSource = new EventSource(`/api/sensor/${s.id.toString()}/live`);
        evtSource.onmessage = (event: MessageEvent<string>) => {
            void submit(event.data, {
                method: "post",
                encType: "application/json",
            });
        };

        return () => {
            evtSource.close();
        };
    }, [s.id, submit]);

    const isFavorite = useMemo(() => favorites.includes(s.id), [favorites, s.id]);

    const toggleFavorite = () => {
        if (!favorites.includes(s.id)) addFavorite(s.id);
        else removeFavorite(s.id);
    };

    const forceRefresh = () => {
        if (isRefreshing) return;
        void (async () => {
            setIsRefreshing(true);
            await submit("forceUpdate=1", { method: "get" });
            await new Promise(resolve => setTimeout(resolve, 1700));
            setIsRefreshing(false);
        })();
    };

    return (
        <SideView title={`${s.location.facultyAbbreviation} ${s.id.toString()}`} showBackButton>
            <MapPortal>
                {sensorList.map(it => (
                    <SensorMarker key={it.id} sensor={it} isActive={it.id === s.id} />
                ))}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.iconBtnBar}>
                    <IconButton
                        className={styles.iconBtn}
                        onClick={toggleFavorite}
                        title="Dodaj do ulubionych"
                    >
                        {isFavorite ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
                    </IconButton>
                    <IconButton
                        className={clsx(styles.iconBtn, isRefreshing && styles.rotate)}
                        onClick={forceRefresh}
                        title="Odśwież dane"
                    >
                        <VscRefresh size={24} />
                    </IconButton>
                </div>
                <div className={styles.content}>
                    <div className={styles.heading}>Obecne warunki</div>
                    <div className={styles.currentConditions}>
                        <CurrentCondition
                            label="Temperatura"
                            value={s.temperature ? `${s.temperature.toString()}° C` : "Brak danych"}
                            icon={RiTempHotLine}

                        />
                        <CurrentCondition
                            label="Wilgotność"
                            value={s.humidity ? `${s.humidity.toString()}%` : "Brak danych"}
                            icon={RiWaterPercentFill}

                        />
                        <CurrentCondition
                            label="Ciśnienie"
                            value={s.pressure ? `${s.pressure.toString()} hPa` : "Brak danych"}
                            icon={RiSpeedUpFill}

                        />
                        <CurrentCondition
                            label="Status"
                            value={Status[s.status]}
                            icon={s.status === "ONLINE"
                                ? RiCheckLine
                                : (s.status === "OFFLINE"
                                        ? RiRestTimeFill
                                        : RiErrorWarningLine)}
                        />
                    </div>
                    <Suspense key={s.id} fallback={<div className={styles.loading}>Wczytywanie wykresów...</div>}>
                        <Charts historicalDataPromise={historicalDataPromise} />
                        {s.lastUpdate !== undefined && (
                            <p className={styles.updateDate}>
                                Zaktualizowano:
                                <br />
                                {new Date(s.lastUpdate).toLocaleString()}
                            </p>
                        )}
                    </Suspense>
                </div>
            </div>
        </SideView>
    );
};

export default SensorSideView;
