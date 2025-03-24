import ApiError from "./types/ApiError";
import Pageable from "./types/Pageable";
import Sensor from "./types/Sensor";
import SensorData, { SensorDataUnparsed } from "./types/SensorData";

class DataProvider {
    #sensorList: Sensor[] | null = null;
    #historicalData = new Map<number, {
        startDate: string | null;
        endDate: string | null;
        data: SensorData[];
    }>();

    async fetcher<T extends object>(endpoint: RequestInfo | URL) {
        try {
            const res = await fetch(endpoint, {
                signal: AbortSignal.timeout(30000),
            });

            let data: T | ApiError;
            try {
                data = await res.json() as T | ApiError;
            } catch (err) {
                throw new Error("Invalid response", { cause: err });
            }

            if ("errorMessage" in data) {
                throw new Error(data.errorMessage);
            }

            return data;
        } catch (err) {
            const msg = `Fetch error: ${err instanceof Error ? err.message : String(err)}`;
            throw new Error(msg, { cause: err });
        }
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

    async getHistoricalData(
        id: Sensor["id"],
        startDate: string | null,
        endDate: string | null,
        forceUpdate = false,
    ) {
        const cached = this.#historicalData.get(id);

        if (!forceUpdate && startDate === cached?.startDate && endDate === cached.endDate) {
            return cached.data;
        }

        const fallbackDate = new Date();
        fallbackDate.setDate(fallbackDate.getDate() - 1);

        const fixedStartDate = startDate ? new Date(startDate) : fallbackDate;

        const url = new URL(`/api/sensor/${id.toString()}/data`, window.location.origin);
        url.searchParams.set("startDate", fixedStartDate.toISOString());
        if (endDate) url.searchParams.set("endDate", new Date(endDate).toISOString());
        url.searchParams.set("page", "0");
        url.searchParams.set("size", "300");
        url.searchParams.set("sort", "timestamp,desc");

        const data = await this.fetcher<Pageable<SensorDataUnparsed>>(url);
        const historicalData = data.content
            .map(el => ({ ...el, timestamp: new Date(el.timestamp).getTime() } as SensorData))
            .sort((a, b) => a.timestamp - b.timestamp);

        this.#historicalData.set(id, {
            startDate,
            endDate,
            data: historicalData,
        });

        return historicalData;
    }

    updateCachedSensor(data: Sensor) {
        if (!this.#sensorList) return;

        const index = this.#sensorList.findIndex(sensor => sensor.id === data.id);
        if (index < 0) throw new Error("Sensor not found");

        this.#sensorList = this.#sensorList.toSpliced(index, 1, data);
    }
}

export default DataProvider;
