import { StyleSpecification } from "maplibre-gl";
import { RMap, RNavigationControl } from "maplibre-react-components";

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
    const { theme } = useTheme();

    return (
        <RMap
            id={mapID}
            className={theme === "light" ? "" : "dark"}
            initialCenter={center}
            initialLocale={locale}
            initialZoom={16}
            minZoom={15}
            maxBounds={[
                [center[0] - padding * 0.015967, center[1] - padding * 0.01],
                [center[0] + padding * 0.015967, center[1] + padding * 0.01],
            ]}
            mapStyle={osmLib as StyleSpecification}
            maxPitch={40}
        >
            <RNavigationControl position="top-right" showCompass={false} />
        </RMap>
    );
};

export default SensorMap;
