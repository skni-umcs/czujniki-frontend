import { createContext, useContext, useEffect, useState } from "react";
import { LatLngExpression, Map as LeafletMap, maplibreGL, tileLayer } from "leaflet";
import { createLeafletContext, LeafletContextInterface, LeafletContext } from "@react-leaflet/core";

import "@maplibre/maplibre-gl-leaflet";
import "maplibre-gl/dist/maplibre-gl.css";

function isWebGLSupported() {
    try {
        const canvas = document.createElement("canvas");
        return !!(
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            window.WebGLRenderingContext
            && (canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"))
        );
    } catch {
        return false;
    }
}

interface IMapContext {
    leafletContext: LeafletContextInterface | null;
    mapElement: HTMLElement | null;
    setMapElement: (el: HTMLElement | null) => void;
}

const MapContext = createContext<IMapContext>({
    leafletContext: null,
    mapElement: null,
    setMapElement: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});
export const useMapContext = () => useContext(MapContext);

const MapContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [leafletContext, setLeafletContext] = useState<LeafletContextInterface | null>(null);
    const [mapElement, setMapElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!mapElement) return;

        const center: LatLngExpression = [51.244, 22.5415];
        const padding = 1;

        const map = new LeafletMap(mapElement, {
            center,
            zoom: 17,
            minZoom: 16,
            zoomControl: false,
            maxBounds: [
                [center[0] - padding * 0.01, center[1] - padding * 0.015967],
                [center[0] + padding * 0.01, center[1] + padding * 0.015967],
            ],
        });
        if (isWebGLSupported()) {
            maplibreGL({
                style: "/osm_library.json",

            }).addTo(map);
            map.attributionControl.addAttribution(
                "&copy; <a href=\"https://openfreemap.org\">OpenFreeMap</a> &copy; <a href=\"https://openmaptiles.org\">OpenMapTiles</a> Data from <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
            );
        } else {
            tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
            }).addTo(map);
        }

        const ctx = createLeafletContext(map);

        setLeafletContext(ctx);

        return () => {
            map.remove();
            setLeafletContext(null);
        };
    }, [mapElement]);

    // const location = useLocation();
    // useEffect(() => {
    //     leafletContext?.map.invalidateSize();
    // }, [location.pathname]);

    return (
        <LeafletContext value={leafletContext}>
            <MapContext value={{ leafletContext, mapElement, setMapElement }}>
                {children}
            </MapContext>
        </LeafletContext>
    );
};

export default MapContextProvider;
