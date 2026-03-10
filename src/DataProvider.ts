import ApiError from "./types/ApiError";
import Pageable from "./types/Pageable";
import Sensor from "./types/Sensor";
import SensorData, { SensorDataUnparsed } from "./types/SensorData";

export enum DataProviderError {
    INVALID_RESPONSE = "1000",
    FETCH_ERROR = "1001",
    API_ERROR = "1002",
    NETWORK_ERROR = "1003",
}

export class FetchError extends Error {
    code: DataProviderError;
    constructor(
        message: string,
        options: { cause: unknown; code: DataProviderError },
    ) {
        super(message, { cause: options.cause });
        this.code = options.code;
    }
}

class DataProvider {
    #sensorList: Sensor[] | null = null;
    #historicalData = new Map<number, {
        startDate: string | null;
        endDate: string | null;
        data: SensorData[];
    }>();

    async fetcher<T extends object>(endpoint: RequestInfo | URL) {
        let res: Response;
        try {
            res = await fetch(endpoint, {
                signal: AbortSignal.timeout(30000),
            });
        } catch (err) {
            if (err instanceof Error && err.message.startsWith("NetworkError")) {
                throw new FetchError(
                    "Network error",
                    { cause: err, code: DataProviderError.NETWORK_ERROR },
                );
            }

            throw new FetchError(
                `Fetch error: ${err instanceof Error ? err.message : String(err)}`,
                { cause: err, code: DataProviderError.FETCH_ERROR },
            );
        }

        let data: T | ApiError;
        try {
            data = await res.json() as T | ApiError;
        } catch (err) {
            throw new FetchError(
                "Invalid response",
                { cause: err, code: DataProviderError.INVALID_RESPONSE },
            );
        }

        if ("errorMessage" in data) {
            throw new FetchError(
                data.errorMessage,
                { cause: data, code: DataProviderError.API_ERROR },
            );
        }

        return data;
    }

    async getAllSensors(forceUpdate = false) {
        if (!forceUpdate && this.#sensorList) return this.#sensorList;

        const url = new URL("/api/sensors", window.location.origin);
        url.searchParams.set("size", "80");

        const pageableData = await this.fetcher<Pageable<Sensor>>(url);
        this.#sensorList = pageableData.content;
        return this.#sensorList;
    }

    async getSensor(id: Sensor["id"], forceUpdate = false) {
        const cached = this.#sensorList?.find(s => s.id === id);
        if (!forceUpdate && cached) return cached;

        return this.fetcher<Sensor>(`/api/sensors/${id.toString()}`);
    }

    async findSensors(query: string) {
        const url = new URL(`/api/sensors`, window.location.origin);
        url.searchParams.set("size", "80");
        url.searchParams.set("searchTerm", query);

        return this.fetcher<Pageable<Sensor>>(url);
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

        const url = new URL(`/api/sensors/${id.toString()}/data`, window.location.origin);
        url.searchParams.set("startDate", fixedStartDate.toISOString());
        if (endDate) url.searchParams.set("endDate", new Date(endDate).toISOString());
        url.searchParams.set("page", "0");
        url.searchParams.set("size", "2000");
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
