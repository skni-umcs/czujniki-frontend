export default interface SensorData {
    timestamp: string;
    temperature: number;
    humidity: number;
    pressure: number;
    gasResistance?: number | null;
}
