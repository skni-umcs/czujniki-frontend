import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMap } from "maplibre-react-components";

const useActiveMarkerBlur = (isActive: boolean) => {
    const map = useMap();
    const navigate = useNavigate();

    useEffect(() => {
        const sub = map.on("click", (e) => {
            if (isActive && e.originalEvent.target instanceof HTMLCanvasElement) {
                void navigate("/sensors");
            }
        });

        return () => {
            sub.unsubscribe();
        };
    }, [isActive, navigate, map]);
};

export default useActiveMarkerBlur;
