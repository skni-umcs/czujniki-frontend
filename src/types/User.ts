import Sensor from "./Sensor";

export default interface User {
    id: number;
    username: string;
    password: string;
    roles: string[];
    favoriteSensors: Sensor[];
}
