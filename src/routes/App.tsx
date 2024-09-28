import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import classNames from "./App.module.css";
import json from "../sensors.json";
import Sensor from "../types/Sensor";
import { Dispatch, SetStateAction, useState } from "react";
import SensorSideView from "../components/SensorSideView/SensorSideView";
import SensorList from "../components/SensorList/SensorList";
import AppHeader from "../components/AppHeader/AppHeader";

const sensors: Sensor[] = json;

const LocationMarker: React.FC<{
    setActiveSensor: Dispatch<SetStateAction<Sensor | null>>;
}> = ({ setActiveSensor }) => {
    const map = useMapEvents({
        click() {
            console.log("Map clicked");
            setActiveSensor(null);
        },
    });

    return null;
};

function App() {
    const [activeSensor, setActiveSensor] = useState<Sensor | null>(null);

    return (
        <div className={classNames.appRoot}>
            <AppHeader />
            <div className={classNames.leftRight}>
                <div className={classNames.sidebar}>
                    <button onClick={() => { setActiveSensor(null); }}>Cofnij</button>
                    {activeSensor
                        ? <SensorSideView sensor={activeSensor} />
                        : <SensorList sensors={sensors} setActiveSensor={setActiveSensor} />}
                </div>
                <div className={classNames.mapWrapper}>
                    <MapContainer
                        center={[51.244, 22.5415]}
                        zoom={17}
                        minZoom={17}
                        scrollWheelZoom={true}
                        maxBounds={[
                            [51.24, 22.53],
                            [51.248, 22.55],
                        ]}
                        className={classNames.mapContainer}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.245248, 22.542889]}>
                            <Popup>D327</Popup>
                        </Marker>
                        {sensors.map(sensor => (
                            <Marker
                                position={[sensor.location.latitude, sensor.location.longitude]}
                                key={sensor.sensorId}
                                eventHandlers={{ click: () => { setActiveSensor(sensor); } }}
                            >
                                <Popup>
                                    {sensor.location.facultyName}
                                    {" "}
                                    {sensor.location.id}
                                </Popup>
                            </Marker>
                        ))}
                        <LocationMarker setActiveSensor={setActiveSensor} />
                    </MapContainer>
                </div>
            </div>

        </div>
    );
}

export default App;
