import { useLoaderData, useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";

import classNames from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";

const SensorSideView: React.FC = () => {
    const sensor = useLoaderData() as Sensor;
    const navigate = useNavigate();

    return (
        <div className={classNames.root}>
            <div className={classNames.firstRow}>
                <button
                    className={classNames.backButton}
                    onClick={() => { navigate("/sensors"); }}
                >
                    <IoArrowBack size={24} />
                </button>
                <div className={classNames.heading}>
                    Czujnik {sensor.sensorId}
                </div>
                <button
                    className={classNames.closeBtn}
                    onClick={() => { navigate("/"); }}
                >
                    <IoClose size={24} />
                </button>
            </div>
            <div className={classNames.content}>
                <div>Wydział: {sensor.location.facultyName}</div>
                <div>Status: {sensor.status}</div>
                <div className={classNames.heading2}>Obecne warunki</div>
                <div>Temperatura: {sensor.currentTemperature}° C</div>
                <div>Ciśnienie: {sensor.currentPressure} hPa</div>
                <div>Wilgotność: {sensor.currentHumidity}%</div>
                <div>Rezystancja gazu: {sensor.currentGasResistance}</div>
                <div>Data aktualizacji: {sensor.latestDataUpdate.toString()}</div>
                <div className={classNames.heading2}>Dane historyczne</div>
                <div>Wykresy???</div>
            </div>
        </div>
    );
};

export default SensorSideView;
