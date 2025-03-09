export interface SensorDataUnparsed {
    timestamp: string;
    temperature: number;
    humidity: number;
    pressure: number;
    gasResistance?: number | null;
}

export default interface SensorData {
    timestamp: number;
    temperature: number;
    humidity: number;
    pressure: number;
    gasResistance?: number | null;
}
