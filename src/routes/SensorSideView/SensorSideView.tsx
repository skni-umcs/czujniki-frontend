import { useLoaderData } from "react-router-dom";
import { IoBugOutline, IoHeart, IoHeartOutline, IoRefreshOutline } from "react-icons/io5";

import styles from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import useFlyToOnRender from "./useFlyToOnRender.ts";
import { useFavorites } from "../../contexts/FavoritesProvider.tsx";
import { useMemo } from "react";

export interface ISensorSideViewLoaderData {
    sensor: Sensor;
    sensorList: Sensor[];
};

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
                    <button
                        className={styles.iconButton}
                        onClick={toggleFavorite}
                        title="Dodaj do ulubionych"
                    >
                        {isFavorite ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
                    </button>
                    <button className={styles.iconButton} title="Odśwież dane">
                        <IoRefreshOutline size={24} />
                    </button>
                    <button className={styles.iconButton} title="Zgłoś błąd">
                        <IoBugOutline size={24} />
                    </button>
                </div>
                <div className={styles.content}>
                    <div>
                        <b>Wydział:</b> {sensor.location.facultyName}
                    </div>
                    <div>
                        <b>Status:</b> {sensor.status}
                    </div>
                    <div>
                        <b>Data aktualizacji:</b> {sensor.latestDataUpdate.toString()}
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
                    <div className={styles.heading}>Dane historyczne</div>
                    <div>brak</div>
                </div>
            </div>
        </SideView>
    );
};

export default SensorSideView;
