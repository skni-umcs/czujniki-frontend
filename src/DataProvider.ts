import ApiError from "./types/ApiError";
import Sensor from "./types/Sensor";
import SensorData from "./types/SensorData";

class DataProvider {
    #sensorList: Sensor[] | null = null;

    async fetcher<T extends object>(endpoint: RequestInfo | URL) {
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
        // const cached = this.#sensorList?.find(s => s.id === id);
        // if (cached) return cached;

        return this.fetcher<Sensor>(`/api/sensor/${id.toString()}`);
    }

    async getHistoricalData(id: Sensor["id"], startDate: Date, endDate: Date) {
        const url = new URL(`/api/sensor/${id.toString()}/data`, window.location.origin);
        url.searchParams.set("startDate", startDate.toISOString().split(".")[0]);
        url.searchParams.set("endDate", endDate.toISOString().split(".")[0]);
        url.searchParams.set("page", "0");
        url.searchParams.set("size", "40");

        return this.fetcher<SensorData[]>(url);
    }
}

export default DataProvider;
