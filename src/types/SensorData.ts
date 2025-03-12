export interface SensorDataUnparsed {
    timestamp: string;
    temperature: number;
    humidity: number;
    pressure: number;
}

export default interface SensorData {
    timestamp: number;
    temperature: number;
    humidity: number;
    pressure: number;
}
