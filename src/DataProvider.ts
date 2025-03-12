import ApiError from "./types/ApiError";
import Pageable from "./types/Pageable";
import Sensor from "./types/Sensor";
import SensorData, { SensorDataUnparsed } from "./types/SensorData";

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
        const cached = this.#sensorList?.find(s => s.id === id);
        if (cached) return cached;

        return this.fetcher<Sensor>(`/api/sensor/${id.toString()}`);
    }

    async getHistoricalData(id: Sensor["id"], startDate: Date, endDate?: Date) {
        const url = new URL(`/api/sensor/${id.toString()}/data`, window.location.origin);
        url.searchParams.set("startDate", startDate.toISOString());
        if (endDate) url.searchParams.set("endDate", endDate.toISOString());
        url.searchParams.set("page", "0");
        url.searchParams.set("size", "300");
        url.searchParams.set("sort", "timestamp,desc");

        const data = await this.fetcher<Pageable<SensorDataUnparsed>>(url);
        const historicalData: SensorData[] = data.content
            .map((el) => {
                return { ...el, timestamp: new Date(el.timestamp).valueOf() };
            })
            .sort((a, b) => a.timestamp - b.timestamp);

        return historicalData;
    }

    setSensorInCache(data: Sensor) {
        if (!this.#sensorList) return;

        const index = this.#sensorList.findIndex(sensor => sensor.id === data.id);
        if (index !== -1) {
            this.#sensorList[index] = data;
        }
    }
}

export default DataProvider;
