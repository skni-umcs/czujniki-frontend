import { useLoaderData, useNavigate } from "react-router-dom";

import classNames from "./SensorSideView.module.css";
import Sensor from "../../types/Sensor";

const SensorSideView: React.FC = () => {
    const sensor = useLoaderData() as Sensor;
    const navigate = useNavigate();

    return (
        <div className={classNames.root}>
            <button onClick={() => { navigate("/"); }}>Cofnij</button>
            <h2>Czujnik numer {sensor.sensorId}</h2>
            <p>Wydział: {sensor.location.facultyName}</p>
            <p>Status: {sensor.status}</p>
            <br />
            <h3>Obecne warunki</h3>
            <p>Temperatura: {sensor.currentTemperature}° C</p>
            <p>Ciśnienie: {sensor.currentPressure} hPa</p>
            <p>Wilgotność: {sensor.currentHumidity}%</p>
            <p>Rezystancja gazu: {sensor.currentGasResistance}</p>
            <p>Data aktualizacji: {sensor.latestDataUpdate.toString()}</p>
            <br />
            <h3>Dane historyczne</h3>
            <p>Wykresy???</p>
        </div>
    );
};

export default SensorSideView;
