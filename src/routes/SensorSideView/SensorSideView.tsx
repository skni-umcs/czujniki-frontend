import { useLoaderData } from "react-router-dom";

import styles from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import useFlyToOnRender from "./useFlyToOnRender.ts";

export interface ISensorSideViewLoaderData {
    sensor: Sensor;
    sensorList: Sensor[];
};

const SensorSideView: React.FC = () => {
    const { sensor, sensorList } = useLoaderData() as ISensorSideViewLoaderData;
    useFlyToOnRender(sensor.location.latitude, sensor.location.longitude);

    return (
        <SideView
            title={`Czujnik ${sensor.sensorId.toString()}`}
            backLocation="/sensors"
        >
            <MapPortal>
                {sensorList.map(s => (
                    <SensorMarker key={s.sensorId} sensor={s} isActive={s.sensorId === sensor.sensorId} />
                ))}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.content}>
                    <div>Wydział: {sensor.location.facultyName}</div>
                    <div>Status: {sensor.status}</div>
                    <div className={styles.heading}>Obecne warunki</div>
                    <div>Temperatura: {sensor.currentTemperature}° C</div>
                    <div>Ciśnienie: {sensor.currentPressure} hPa</div>
                    <div>Wilgotność: {sensor.currentHumidity}%</div>
                    <div>Jakość powietrza: {sensor.currentGasResistance}</div>
                    <div>Data aktualizacji: {sensor.latestDataUpdate.toString()}</div>
                    <div className={styles.heading}>Dane historyczne</div>
                    <div>Wykresy???</div>
                </div>
            </div>
        </SideView>
    );
};

export default SensorSideView;
