import Location from "./Location";
import { TStatus } from "./Status";

export default interface Sensor {
    id: number;
    status: TStatus;
    lastUpdate?: string;
    temperature?: number;
    humidity?: number;
    pressure?: number;
    location: Location;
}
