import Location from "./Location";
// import SensorData from "./SensorData";

export default interface Sensor {
    sensorId: number;
    status: string;
    latestDataUpdate: string;
    // latestDataUpdate: Date;
    currentTemperature: number;
    currentHumidity: number;
    currentPressure: number;
    currentGasResistance: number;
    location: Location;
    // sensorData: SensorData;
}
