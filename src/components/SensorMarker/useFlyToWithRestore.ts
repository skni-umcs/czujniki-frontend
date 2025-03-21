import { useMap } from "maplibre-react-components";
import { useEffect, useRef } from "react";

const useFlyToWithRestore = (isActive: boolean, lat: number, lng: number) => {
    const isCameraStateValid = useRef(true);

    const map = useMap();

    useEffect(() => {
        if (!isActive) return;

        const prevCenter = map.getCenter();
        const prevZoom = map.getZoom();

        map.flyTo({ center: { lat, lng }, zoom: 18 });
        void map.once("moveend", () => {
            isCameraStateValid.current = true;

            const invalidate = () => isCameraStateValid.current = false;
            void map.once("move", invalidate);
        });

        return () => {
            if (isCameraStateValid.current)
                map.flyTo({ center: prevCenter, zoom: prevZoom });
        };
    }, [isActive, map, lat, lng]);
};

export default useFlyToWithRestore;
