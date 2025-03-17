import { RMapContextProvider } from "maplibre-react-components";

import "maplibre-gl/dist/maplibre-gl.css";

const MapContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <RMapContextProvider>
            {children}
        </RMapContextProvider>
    );
};

export default MapContextProvider;
