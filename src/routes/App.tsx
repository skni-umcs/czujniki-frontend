import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

import classNames from "./App.module.css";
import Sensor from "../types/Sensor";
import AppHeader from "../components/AppHeader/AppHeader";

const ClickDetector: React.FC = () => {
    const navigate = useNavigate();
    useMapEvent("click", () => {
        console.log("Map clicked");
        navigate("/");
    });
    return null;
};

const App: React.FC = () => {
    const sensors = useLoaderData() as Sensor[];
    const navigate = useNavigate();

    return (
        <>
            <AppHeader />
            <div className={classNames.leftRight}>
                <div className={classNames.sidebar}>
                    <Outlet />
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
                                eventHandlers={{
                                    click: () => {
                                        navigate(`/sensors/${sensor.sensorId.toString()}`);
                                    },
                                }}
                            >
                                <Popup>
                                    {sensor.location.facultyName} {sensor.location.id}
                                </Popup>
                            </Marker>
                        ))}
                        <ClickDetector />
                    </MapContainer>
                </div>
            </div>
        </>
    );
};

export default App;
