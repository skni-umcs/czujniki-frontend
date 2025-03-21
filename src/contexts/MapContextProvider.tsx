import { RMapContextProvider } from "maplibre-react-components";

import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";

const MapContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <RMapContextProvider>
            {children}
        </RMapContextProvider>
    );
};

export default MapContextProvider;
