import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";

import classNames from "./MapWrapper.module.css";
import Sensor from "../../types/Sensor";

interface IProps {
    sensors: Sensor[];
}

const MapWrapper: React.FC<IProps> = ({ sensors }) => {
    const navigate = useNavigate();

    return (
        <div className={classNames.root}>
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
            </MapContainer>
        </div>
    );
};

export default MapWrapper;
