import { useLoaderData, useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";

import styles from "./AccessibilitySideView.module.css";
import Sensor from "../../types/Sensor";
import Sidebar from "../../components/Sidebar/Sidebar";
import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import { TTheme, useTheme } from "../../contexts/ThemeProvider.tsx";
import { TFontSize, useFontSize } from "../../contexts/FontSizeProvider.tsx";

export interface IAccessibilitySideViewLoaderData {
    sensorList: Sensor[];
};

const AccessibilitySideView: React.FC = () => {
    const { sensorList } = useLoaderData() as IAccessibilitySideViewLoaderData;
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const { fontSize, setFontSize } = useFontSize();

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        const e = event.target as HTMLFormElement & { value: string };
        if (e.name === "theme") setTheme(e.value as TTheme);
        if (e.name === "font-size") setFontSize(e.value as TFontSize);
    };

    return (
        <Sidebar>
            <MapPortal>
                {sensorList.map(s => (
                    <SensorMarker key={s.sensorId} sensor={s} />
                ))}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.firstRow}>
                    <button
                        className={styles.backButton}
                        onClick={() => { navigate("/sensors"); }}
                    >
                        <IoArrowBack size={24} />
                    </button>
                    <div className={styles.heading}>
                        Ustawienia dostępności
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={() => { navigate("/"); }}
                    >
                        <IoClose size={24} />
                    </button>
                </div>
                <div className={styles.content}>
                    <form onChange={handleChange}>
                        <div className={styles.heading2} style={{ marginTop: 0 }}>Motyw</div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    checked={theme === "light"}
                                />
                                Jasny
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="dark"
                                    checked={theme === "dark"}
                                />
                                Ciemny
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="highContrast"
                                    checked={theme === "highContrast"}
                                />
                                Wysoki kontrast
                            </label>
                        </div>
                        <div className={styles.heading2}>Rozmiar tekstu</div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="font-size"
                                    value="normal"
                                    checked={fontSize === "normal"}
                                />
                                Normalny
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="font-size"
                                    value="large"
                                    checked={fontSize === "large"}
                                />
                                Duży
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="font-size"
                                    value="larger"
                                    checked={fontSize === "larger"}
                                />
                                Bardzo duży
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </Sidebar>
    );
};

export default AccessibilitySideView;
