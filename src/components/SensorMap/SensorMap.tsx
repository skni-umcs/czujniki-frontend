import { RMap, RNavigationControl } from "maplibre-react-components";

import "./SensorMap.css";
import { useTheme } from "../../contexts/ThemeProvider";

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
            mapStyle="/osm_library.json"
        >
            <RNavigationControl position="top-right" showCompass={false} />
        </RMap>
    );
};

export default SensorMap;
