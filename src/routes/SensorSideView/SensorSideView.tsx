import { Suspense, use, useMemo } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { IoBugOutline, IoHeart, IoHeartOutline, IoRefreshOutline } from "react-icons/io5";
import { RiErrorWarningLine, RiRestTimeFill, RiSpeedUpFill, RiTempHotLine, RiWaterPercentFill, RiWindyFill } from "react-icons/ri";

import styles from "./SensorSideView.module.css";
import Pageable from "../../types/Pageable.ts";
import Sensor from "../../types/Sensor";
import SensorData from "../../types/SensorData.ts";
import SideView from "../../components/SideView/SideView.tsx";
import MapPortal from "../../components/MapPortal/MapPortal.tsx";
import SensorMarker from "../../components/SensorMarker/SensorMarker.tsx";
import IconButton from "../../components/IconButton/IconButton.tsx";
import CurrentCondition from "../../components/CurrentCondition/CurrentCondition.tsx";
import useFlyToOnRender from "./useFlyToOnRender.ts";
import { useFavorites } from "../../contexts/FavoritesProvider.tsx";
import Charts from "./Charts.tsx";

export interface ISensorSideViewLoaderData {
    sensorList: Sensor[];
    sensorPromise: Promise<Sensor>;
    historicalDataPromise: Promise<Pageable<SensorData>>;
};

const SensorSideView: React.FC = () => {
    const { sensorPromise, sensorList, historicalDataPromise } = useLoaderData<ISensorSideViewLoaderData>();
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const revalidator = useRevalidator();
    const s = use(sensorPromise);

    useFlyToOnRender(s.location.latitude, s.location.longitude);

    const isFavorite = useMemo(() => favorites.includes(s.id), [favorites, s.id]);

    const toggleFavorite = () => {
        if (!favorites.includes(s.id)) addFavorite(s.id);
        else removeFavorite(s.id);
    };

    return (
        <SideView title={s.location.facultyAbbreviation} showBackButton>
            <MapPortal>
                {sensorList.map(it => (
                    <SensorMarker key={it.id} sensor={it} isActive={it.id === s.id} />
                ))}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.iconBtnBar}>
                    <IconButton
                        className={styles.iconBtn}
                        onClick={toggleFavorite}
                        title="Dodaj do ulubionych"
                    >
                        {isFavorite ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
                    </IconButton>
                    <IconButton
                        className={styles.iconBtn}
                        onClick={() => { void revalidator.revalidate(); }}
                        title="Odśwież dane"
                    >
                        <IoRefreshOutline size={24} />
                    </IconButton>
                    <IconButton className={styles.iconBtn} title="Zgłoś błąd">
                        <IoBugOutline size={24} />
                    </IconButton>
                </div>
                <div className={styles.content}>
                    <div className={styles.heading}>Obecne warunki</div>
                    <div className={styles.currentConditions}>
                        <CurrentCondition
                            label="Temperatura"
                            value={s.temperature ? `${s.temperature.toString()}° C` : "-"}
                            icon={RiTempHotLine}

                        />
                        <CurrentCondition
                            label="Wilgotność"
                            value={s.humidity ? `${s.humidity.toString()}%` : "-"}
                            icon={RiWaterPercentFill}

                        />
                        <CurrentCondition
                            label="Ciśnienie"
                            value={s.pressure ? `${Math.round(s.pressure).toString()} hPa` : "-"}
                            icon={RiSpeedUpFill}

                        />
                        {s.gasResistance && (
                            <CurrentCondition
                                label="Jakość pow."
                                value={s.gasResistance ? s.gasResistance.toString() : "-"}
                                icon={RiWindyFill}
                            />
                        )}
                        {s.status !== "ONLINE" && (
                            <CurrentCondition
                                label="Status"
                                value={s.status}
                                icon={s.status === "OFFLINE" ? RiRestTimeFill : RiErrorWarningLine}
                            />
                        )}
                    </div>
                    <Suspense fallback={<div className={styles.loading}>Wczytywanie wykresów...</div>}>
                        <Charts sensor={s} historicalDataPromise={historicalDataPromise} />
                    </Suspense>
                </div>
            </div>
        </SideView>
    );
};

export default SensorSideView;
