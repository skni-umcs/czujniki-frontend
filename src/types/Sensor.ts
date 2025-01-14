import Location from "./Location";

export default interface Sensor {
    sensorId: number;
    status: string;
    latestDataUpdate: string;
    currentTemperature: number;
    currentHumidity: number;
    currentPressure: number;
    currentGasResistance: number;
    location: Location;
}
