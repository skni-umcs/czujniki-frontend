import { createContext, useContext, useEffect, useState } from "react";
import { LatLngExpression, Map as LeafletMap } from "leaflet";
import { createLeafletContext, LeafletContextInterface, LeafletProvider } from "@react-leaflet/core";

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
        <LeafletProvider value={leafletContext}>
            <MapContext.Provider value={{ leafletContext, mapElement, setMapElement }}>
                {children}
            </MapContext.Provider>
        </LeafletProvider>
    );
};

export default MapContextProvider;
