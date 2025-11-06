import Location from "./Location";
import { TStatus } from "./Status";

export default interface Sensor {
    id: number;
    status: TStatus;
    lastUpdate: string | null;
    temperature: number | null;
    humidity: number | null;
    pressure: number | null;
    location: Location;
    floor: number | null;
}
