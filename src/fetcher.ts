import ApiError from "./types/ApiError";

async function fetcher<T extends object>(endpoint: string) {
    const res = await fetch(endpoint, {});
    const data = await res.json() as T | ApiError;

    if ("errorMessage" in data) {
        throw new Error(data.errorMessage);
    }
    return data;
};

export default fetcher;
