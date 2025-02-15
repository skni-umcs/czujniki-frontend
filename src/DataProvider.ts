import ApiError from "./types/ApiError";
import Sensor from "./types/Sensor";

class DataProvider {
    #sensorList: Sensor[] | null = null;

    async fetcher<T extends object>(endpoint: string) {
        const res = await fetch(endpoint, {});
        const data = await res.json() as T | ApiError;

        if ("errorMessage" in data) {
            throw new Error(data.errorMessage);
        }
        return data;
    }

    async getAllSensors() {
        if (this.#sensorList) return this.#sensorList;

        this.#sensorList = await this.fetcher<Sensor[]>("/api/sensor/all");
        return this.#sensorList;
    }

    async getSensor(id: Sensor["id"]) {
        const cached = this.#sensorList?.find(s => s.id === id);
        if (cached) return cached;

        return this.fetcher<Sensor>(`/api/sensor/${id.toString()}`);
    }
}

export default DataProvider;
