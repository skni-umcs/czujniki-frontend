import { useLoaderData } from "react-router-dom";

import Sensor from "../../types/Sensor.ts";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";

export interface IMainRouteLoaderData {
    sensorList: Sensor[];
}

const MainRoute: React.FC = () => {
    const { sensorList } = useLoaderData<IMainRouteLoaderData>();

    return (
        <MapPortal>
            {sensorList.map(s => (
                <SensorMarker key={s.id} sensor={s} />
            ))}
        </MapPortal>
    );
};

export default MainRoute;
