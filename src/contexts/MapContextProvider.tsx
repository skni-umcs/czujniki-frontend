import { createContext, useContext, useEffect, useState } from "react";
import { Map as LeafletMap } from "leaflet";
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

        const map = new LeafletMap(mapElement, {
            zoomControl: false,
            zoom: 17,
            minZoom: 17,
            maxBounds: [
                [51.24, 22.53],
                [51.248, 22.55],
            ],
            center: [51.244, 22.5415],

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
