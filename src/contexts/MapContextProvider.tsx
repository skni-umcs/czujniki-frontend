import { RMapContextProvider } from "maplibre-react-components";

const MapContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <RMapContextProvider>
            {children}
        </RMapContextProvider>
    );
};

export default MapContextProvider;
