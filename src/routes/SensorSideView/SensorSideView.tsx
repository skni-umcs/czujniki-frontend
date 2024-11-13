import { useLoaderData, useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";

import styles from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";
import Sidebar from "../../components/Sidebar/Sidebar";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import useFlyToOnRender from "./useFlyToOnRender.ts";

export interface ISensorSideViewLoaderData {
    sensor: Sensor;
    sensorList: Sensor[];
};

const SensorSideView: React.FC = () => {
    const { sensorList, sensor } = useLoaderData() as ISensorSideViewLoaderData;
    const navigate = useNavigate();
    useFlyToOnRender(sensor.location.latitude, sensor.location.longitude);

    return (
        <Sidebar>
            <MapPortal>
                {sensorList.map(s => (
                    <SensorMarker key={s.sensorId} sensor={s} isActive={s.sensorId === sensor.sensorId} />
                ))}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.firstRow}>
                    <button
                        className={styles.backButton}
                        onClick={() => { navigate("/sensors"); }}
                    >
                        <IoArrowBack size={24} />
                    </button>
                    <div className={styles.heading}>
                        Czujnik {sensor.sensorId}
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={() => { navigate("/"); }}
                    >
                        <IoClose size={24} />
                    </button>
                </div>
                <div className={styles.content}>
                    <div>Wydział: {sensor.location.facultyName}</div>
                    <div>Status: {sensor.status}</div>
                    <div className={styles.heading2}>Obecne warunki</div>
                    <div>Temperatura: {sensor.currentTemperature}° C</div>
                    <div>Ciśnienie: {sensor.currentPressure} hPa</div>
                    <div>Wilgotność: {sensor.currentHumidity}%</div>
                    <div>Jakość powietrza: {sensor.currentGasResistance}</div>
                    <div>Data aktualizacji: {sensor.latestDataUpdate.toString()}</div>
                    <div className={styles.heading2}>Dane historyczne</div>
                    <div>Wykresy???</div>
                </div>
            </div>
        </Sidebar>
    );
};

export default SensorSideView;
