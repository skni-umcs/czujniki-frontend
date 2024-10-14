import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

const useFlyToOnRender = (lat: number, lon: number) => {
    const map = useMap();
    const isInitAnimEnded = useRef(false);
    const isSameState = useRef(true);

    useEffect(() => {
        const prevCenter = map.getCenter();
        const prevZoom = map.getZoom();

        map.flyTo([lat, lon], 18);

        return () => {
            if (isSameState.current && prevZoom < map.getMaxZoom()) map.flyTo(prevCenter, prevZoom);
        };
    }, [map, lat, lon]);

    useEffect(() => {
        const fn = () => {
            isInitAnimEnded.current = true;
            map.removeEventListener("moveend", fn);
        };

        map.addEventListener("moveend", fn);

        return () => {
            map.removeEventListener("moveend", fn);
        };
    }, [map]);

    useEffect(() => {
        const fn = () => {
            if (!isInitAnimEnded.current) return;
            isSameState.current = false;
        };

        map.addEventListener("move", fn);
        map.addEventListener("zoom", fn);

        return () => {
            map.removeEventListener("move", fn);
            map.removeEventListener("zoom", fn);
        };
    }, [map]);
};

export default useFlyToOnRender;
