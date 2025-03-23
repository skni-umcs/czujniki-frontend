import { StyleSpecification } from "maplibre-gl";
import { RMap, RNavigationControl } from "maplibre-react-components";

import { useTheme } from "../../contexts/ThemeProvider";

import osmLib from "./osm_liberty.json";
import "./SensorMap.css";

export const mapID = "mapA";

const SensorMap: React.FC = () => {
    const { theme } = useTheme();

    return (
        <RMap
            id={mapID}
            className={theme === "light" ? "" : "dark"}
            initialCenter={[22.542066, 51.245487]}
            initialZoom={16}
            minZoom={14}
            mapStyle={osmLib as StyleSpecification}
        >
            <RNavigationControl position="top-right" showCompass={false} />
        </RMap>
    );
};

export default SensorMap;
