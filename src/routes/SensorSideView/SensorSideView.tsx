import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { IoBugOutline, IoHeart, IoHeartOutline, IoRefreshOutline } from "react-icons/io5";

import json from "../../sensorsData.json";

const sensorDataList: SensorData[] = json;

import styles from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";
import SensorData from "../../types/SensorData.ts";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import IconButton from "../../components/IconButton/IconButton.tsx";
import SensorChart from "../../components/SensorChart/SensorChart.tsx";
import useFlyToOnRender from "./useFlyToOnRender.ts";
import { useFavorites } from "../../contexts/FavoritesProvider.tsx";

export interface ISensorSideViewLoaderData {
    sensor: Sensor;
    sensorList: Sensor[];
};

const data = sensorDataList.map(s => ({
    datetime: new Date(s.timestamp).toLocaleString().slice(0, -3),
    temperature: s.temperature,
    humidity: s.humidity,
    pressure: s.pressure,
    gasResistance: s.gasResistance,
}));

const chartWidth = 320;
const chartHeight = 150;

const SensorSideView: React.FC = () => {
    const { sensor, sensorList } = useLoaderData() as ISensorSideViewLoaderData;
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useFlyToOnRender(sensor.location.latitude, sensor.location.longitude);

    const isFavorite = useMemo(() => favorites.includes(sensor.sensorId), [favorites, sensor.sensorId]);

    const toggleFavorite = () => {
        if (!favorites.includes(sensor.sensorId)) addFavorite(sensor.sensorId);
        else removeFavorite(sensor.sensorId);
    };

    return (
        <SideView title={`Czujnik ${sensor.sensorId.toString()}`} showBackButton>
            <MapPortal>
                {sensorList.map(s => (
                    <SensorMarker key={s.sensorId} sensor={s} isActive={s.sensorId === sensor.sensorId} />
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
                    <div>
                        <b>Wydział:</b> {sensor.location.facultyName}
                    </div>
                    <div>
                        <b>Status:</b> {sensor.status}
                    </div>
                    <div>
                        <b>Data aktualizacji:</b> {new Date(sensor.latestDataUpdate).toLocaleString()}
                    </div>
                    <div className={styles.heading}>Obecne warunki</div>
                    <div>
                        <b>Temperatura:</b> {sensor.currentTemperature}° C
                    </div>
                    <div>
                        <b>Ciśnienie:</b> {sensor.currentPressure} hPa
                    </div>
                    <div>
                        <b>Wilgotność:</b> {sensor.currentHumidity}%
                    </div>
                    <div>
                        <b>Jakość powietrza:</b> {sensor.currentGasResistance}
                    </div>

                    <div className={styles.heading2}>Temperatura</div>
                    <SensorChart
                        width={chartWidth}
                        height={chartHeight}
                        data={data}
                        dataKey="temperature"
                        className={styles.chartOffset}
                        label="Temperatura"
                        unit="° C"
                        domain={[
                            (dataMin: number) => dataMin - 2,
                            (dataMax: number) => dataMax + 2,
                        ]}
                    />

                    <div className={styles.heading2}>Ciśnienie</div>
                    <SensorChart
                        width={chartWidth}
                        height={chartHeight}
                        data={data}
                        dataKey="pressure"
                        className={styles.chartOffset}
                        label="Ciśnienie"
                        unit=" hPa"
                        domain={[
                            (dataMin: number) => (Math.ceil((dataMin - 10) / 10) * 10),
                            (dataMax: number) => (Math.floor((dataMax + 10) / 10) * 10),
                        ]}
                    />

                    <div className={styles.heading2}>Wilgotność</div>
                    <SensorChart
                        width={chartWidth}
                        height={chartHeight}
                        data={data}
                        dataKey="humidity"
                        className={styles.chartOffset}
                        label="Wilgotność"
                        unit="%"
                        domain={[0, 100]}
                    />

                    <div className={styles.heading2}>Jakość powietrza</div>
                    <SensorChart
                        width={chartWidth}
                        height={chartHeight}
                        data={data}
                        dataKey="gasResistance"
                        className={styles.chartOffset}
                        label="Jakość powietrza"
                        unit=" ppm"
                        domain={[
                            (dataMin: number) => (Math.ceil((dataMin - 10) / 10) * 10),
                            (dataMax: number) => (Math.floor((dataMax + 10) / 10) * 10),
                        ]}
                    />
                </div>
            </div>
        </SideView>
    );
};

export default SensorSideView;
