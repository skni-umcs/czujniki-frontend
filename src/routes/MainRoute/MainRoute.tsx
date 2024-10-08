import { useLoaderData } from "react-router-dom";

import Sensor from "../../types/Sensor.ts";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";

export interface IMainRouteLoaderData {
    sensorList: Sensor[];
}

const MainRoute: React.FC = () => {
    const { sensorList } = useLoaderData() as IMainRouteLoaderData;

    return (
        <MapPortal>
            {sensorList.map(s => (
                <SensorMarker key={s.sensorId} sensor={s} />
            ))}
        </MapPortal>
    );
};

export default MainRoute;
