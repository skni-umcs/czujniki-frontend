import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { IoBugOutline, IoHeart, IoHeartOutline, IoRefreshOutline } from "react-icons/io5";
import { RiErrorWarningLine, RiRestTimeFill, RiSpeedUpFill, RiTempHotLine, RiWaterPercentFill, RiWindyFill } from "react-icons/ri";

import styles from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";
import SensorData from "../../types/SensorData.ts";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import IconButton from "../../components/IconButton/IconButton.tsx";
import SensorChart from "../../components/SensorChart/SensorChart.tsx";
import CurrentCondition from "../../components/CurrentCondition/CurrentCondition.tsx";
import useFlyToOnRender from "./useFlyToOnRender.ts";
import { useFavorites } from "../../contexts/FavoritesProvider.tsx";

export interface ISensorSideViewLoaderData {
    sensor: Sensor;
    sensorList: Sensor[];
    historicalData: SensorData[];
};

const chartHeight = 150;

const SensorSideView: React.FC = () => {
    const { sensor: s, sensorList, historicalData } = useLoaderData<ISensorSideViewLoaderData>();
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useFlyToOnRender(s.location.latitude, s.location.longitude);

    const isFavorite = useMemo(() => favorites.includes(s.id), [favorites, s.id]);

    const toggleFavorite = () => {
        if (!favorites.includes(s.id)) addFavorite(s.id);
        else removeFavorite(s.id);
    };

    return (
        <SideView title={s.location.facultyAbbreviation} showBackButton>
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
                    <IconButton className={styles.iconBtn} title="Odśwież dane">
                        <IoRefreshOutline size={24} />
                    </IconButton>
                    <IconButton className={styles.iconBtn} title="Zgłoś błąd">
                        <IoBugOutline size={24} />
                    </IconButton>
                </div>
                <div className={styles.content}>
                    <div className={styles.heading}>Obecne warunki</div>
                    <div className={styles.currentConditions}>
                        <CurrentCondition
                            label="Temperatura"
                            value={s.temperature ? `${s.temperature.toString()}° C` : "-"}
                            icon={RiTempHotLine}

                        />
                        <CurrentCondition
                            label="Wilgotność"
                            value={s.humidity ? `${s.humidity.toString()}%` : "-"}
                            icon={RiWaterPercentFill}

                        />
                        <CurrentCondition
                            label="Ciśnienie"
                            value={s.pressure ? `${Math.round(s.pressure).toString()} hPa` : "-"}
                            icon={RiSpeedUpFill}

                        />
                        {s.gasResistance && (
                            <CurrentCondition
                                label="Jakość pow."
                                value={s.gasResistance ? s.gasResistance.toString() : "-"}
                                icon={RiWindyFill}
                            />
                        )}
                        {s.status !== "ONLINE" && (
                            <CurrentCondition
                                label="Status"
                                value={s.status}
                                icon={s.status === "OFFLINE" ? RiRestTimeFill : RiErrorWarningLine}
                            />
                        )}
                    </div>

                    <div className={styles.heading}>Temperatura</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="temperature"
                        className={styles.chartOffset}
                        unit="° C"
                        domain={[
                            (dataMin: number) => dataMin - 2,
                            (dataMax: number) => dataMax + 2,
                        ]}
                    />

                    <div className={styles.heading}>Wilgotność</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="humidity"
                        className={styles.chartOffset}
                        unit="%"
                        domain={[0, 100]}
                    />

                    <div className={styles.heading}>Ciśnienie</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="pressure"
                        className={styles.chartOffset}
                        unit=" hPa"
                        domain={[
                            (dataMin: number) => (Math.ceil((dataMin - 10) / 10) * 10),
                            (dataMax: number) => (Math.floor((dataMax + 10) / 10) * 10),
                        ]}
                    />

                    {s.gasResistance && (
                        <>
                            <div className={styles.heading}>Jakość powietrza</div>
                            <SensorChart
                                height={chartHeight}
                                data={historicalData}
                                dataKey="gasResistance"
                                className={styles.chartOffset}
                                // unit=" ppm"
                                domain={[
                                    (dataMin: number) => (Math.ceil((dataMin - 10) / 10) * 10),
                                    (dataMax: number) => (Math.floor((dataMax + 10) / 10) * 10),
                                ]}
                            />
                        </>
                    )}
                    {s.lastUpdate && (
                        <div className={styles.updateDate}>
                            Zaktualizowano:
                            <br />
                            {new Date(s.lastUpdate).toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </SideView>
    );
};

export default SensorSideView;
