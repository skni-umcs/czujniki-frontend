import { Control, Map as LeafletMap } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";

import styles from "./MapWrapper.module.css";
import Sensor from "../../types/Sensor";

interface IProps {
    sensors: Sensor[];
    leafletMapRef: React.RefObject<LeafletMap>;
}

export const ZoomControl = createControlComponent(
    () => new Control.Zoom({
        position: "topright",
        zoomInTitle: "Powiększ",
        zoomOutTitle: "Pomniejsz",
    }),
);

const MapWrapper: React.FC<IProps> = ({ sensors, leafletMapRef }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <MapContainer
                ref={leafletMapRef}
                center={[51.244, 22.5415]}
                zoom={17}
                minZoom={17}
                zoomControl={false}
                scrollWheelZoom={true}
                maxBounds={[
                    [51.24, 22.53],
                    [51.248, 22.55],
                ]}
                className={styles.mapContainer}
            >
                <ZoomControl />
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
