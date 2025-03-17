import { useMap } from "maplibre-react-components";
import { useEffect, useRef } from "react";

const useFlyToOnRender = (lat: number, lng: number) => {
    const map = useMap("mapA");
    if (!map) throw Error("no map");
    const container = map.getContainer();

    const isInitAnimEnded = useRef(false);
    const isSameState = useRef(true);

    useEffect(() => {
        const prevCenter = map.getCenter();
        const prevZoom = map.getZoom();

        map.flyTo({ center: { lat, lng }, zoom: 18 });

        return () => {
            if (isSameState.current && prevZoom < map.getMaxZoom())
                map.flyTo({ center: prevCenter, zoom: prevZoom });
        };
    }, [map, lat, lng]);

    useEffect(() => {
        const fn = () => {
            isInitAnimEnded.current = true;
            container.removeEventListener("moveend", fn);
        };

        container.addEventListener("moveend", fn);

        return () => {
            container.removeEventListener("moveend", fn);
        };
    }, [container]);

    useEffect(() => {
        const fn = () => {
            if (!isInitAnimEnded.current) return;
            isSameState.current = false;
        };

        container.addEventListener("move", fn);
        container.addEventListener("zoom", fn);

        return () => {
            container.removeEventListener("move", fn);
            container.removeEventListener("zoom", fn);
        };
    }, [container]);
};

export default useFlyToOnRender;
