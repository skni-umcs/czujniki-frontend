import Location from "./Location";

export default interface Sensor {
    id: number;
    status: string;
    lastUpdate?: string;
    temperature?: number;
    humidity?: number;
    pressure?: number;
    gasResistance?: number | null;
    location: Location;
}
