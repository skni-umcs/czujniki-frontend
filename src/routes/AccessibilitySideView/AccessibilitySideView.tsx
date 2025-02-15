import { useLoaderData } from "react-router-dom";

import styles from "./AccessibilitySideView.module.css";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import { TTheme, useTheme } from "../../contexts/ThemeProvider.tsx";
import { TFontSize, useFontSize } from "../../contexts/FontSizeProvider.tsx";
import Sensor from "../../types/Sensor.ts";

export interface IAccessibilitySideViewLoaderData {
    sensorList: Sensor[];
};

const AccessibilitySideView: React.FC = () => {
    const { sensorList } = useLoaderData() as IAccessibilitySideViewLoaderData;
    const { theme, setTheme } = useTheme();
    const { fontSize, setFontSize } = useFontSize();

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        const e = event.target as HTMLFormElement & { value: string };
        if (e.name === "theme") setTheme(e.value as TTheme);
        if (e.name === "font-size") setFontSize(e.value as TFontSize);
    };

    return (
        <SideView title="Ustawienia dostępności">
            <MapPortal>
                {sensorList.map(s => <SensorMarker key={s.id} sensor={s} />)}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.content}>
                    <form onChange={handleChange}>
                        <div className={styles.heading} style={{ marginTop: 0 }}>Motyw</div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="system"
                                    defaultChecked={theme === "system"}
                                />
                                Systemowy
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    defaultChecked={theme === "light"}
                                />
                                Jasny
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="dark"
                                    defaultChecked={theme === "dark"}
                                />
                                Ciemny
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="theme"
                                    value="highContrast"
                                    defaultChecked={theme === "highContrast"}
                                />
                                Wysoki kontrast
                            </label>
                        </div>
                        <div className={styles.heading}>Rozmiar tekstu</div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="font-size"
                                    value="normal"
                                    defaultChecked={fontSize === "normal"}
                                />
                                Normalny
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="font-size"
                                    value="large"
                                    defaultChecked={fontSize === "large"}
                                />
                                Duży
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="font-size"
                                    value="larger"
                                    defaultChecked={fontSize === "larger"}
                                />
                                Bardzo duży
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </SideView>
    );
};

export default AccessibilitySideView;
