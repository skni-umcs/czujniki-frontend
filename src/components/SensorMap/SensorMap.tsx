import { StyleSpecification } from "maplibre-gl";
import { RMap, RAttributionControl, RNavigationControl } from "maplibre-react-components";

import { useTheme } from "../../contexts/ThemeProvider";

import osmLib from "./osm_liberty.json";
import "./SensorMap.css";

export const mapID = "mapA";

const locale = {
    "Map.Title": "Mapa",
    "NavigationControl.ZoomIn": "Powiększ",
    "NavigationControl.ZoomOut": "Pomniejsz",
    "AttributionControl.ToggleAttribution": "Przełącz atrybucję",
};

const center = [22.542066, 51.245487] as [number, number];
const padding = 1.5;

const SensorMap: React.FC = () => {
    const { actualTheme } = useTheme();

    return (
        <RMap
            id={mapID}
            className={actualTheme === "light" ? "" : "dark"}
            initialAttributionControl={false}
            initialCenter={center}
            initialLocale={locale}
            initialZoom={17}
            minZoom={15}
            maxZoom={21}
            maxBounds={[
                [center[0] - padding * 0.015967, center[1] - padding * 0.01],
                [center[0] + padding * 0.015967, center[1] + padding * 0.01],
            ]}
            mapStyle={osmLib as StyleSpecification}
            maxPitch={40}
        >
            <RAttributionControl position="top-left" />
            <RNavigationControl position="top-right" showCompass={false} />
        </RMap>
    );
};

export default SensorMap;
