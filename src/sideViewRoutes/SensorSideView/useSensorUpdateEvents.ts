import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

const useSensorUpdateEvents = (sensorID: string) => {
    const { submit } = useFetcher();

    useEffect(() => {
        const evtSource = new EventSource(`/live-api/sensors/${sensorID}`);
        evtSource.addEventListener("sensor-update", (event: MessageEvent<string>) => {
            try {
                void submit(event.data, {
                    method: "post",
                    encType: "application/json",
                    action: `/sensors/${sensorID}`,
                });
            } catch {
                // Ignore malformed events
            }
        });
        return () => {
            evtSource.close();
        };
    }, [sensorID, submit]);
};

export default useSensorUpdateEvents;
