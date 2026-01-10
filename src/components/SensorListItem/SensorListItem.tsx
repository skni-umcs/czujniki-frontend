import { Link } from "react-router-dom";
import { MdErrorOutline, MdOutlineDoNotDisturbOn, MdOutlineLocationOn, MdOutlineThermostat, MdOutlineWaterDrop, MdAccessTime } from "react-icons/md";
import Sensor from "../../types/Sensor";
import { Status } from "../../types/Status";
import styles from "./SensorListItem.module.css";

interface IProps {
    sensor: Sensor;
}

const SensorListItem: React.FC<IProps> = ({ sensor: s }) => {
    const lastUpdate = s.lastUpdate && new Date(s.lastUpdate).toLocaleString();

    return (
        <Link
            to={`/sensors/${s.id.toString()}`}
            className={styles.root}
        >
            <div>
                <div className={styles.col1}>
                    <div className={styles.heading}>
                        {s.location.facultyAbbreviation} {s.id}
                        {s.status === "ERROR" && (
                            <MdErrorOutline
                                size={17}
                                title="Wystąpił błąd"
                            />
                        )}
                        {s.status === "OFFLINE" && (
                            <MdOutlineDoNotDisturbOn
                                size={17}
                                title={Status[s.status]}
                            />
                        )}
                    </div>

                    <div className={styles.locationLine}>
                        <MdOutlineLocationOn size={17} />
                        <div>
                            <span>{s.location.facultyName}</span>
                            {s.floor !== null && (
                                <span> – Piętro {s.floor}</span>
                            )}
                        </div>
                    </div>
                    <div className={styles.timeLine}>
                        <MdAccessTime size={17} />
                        {lastUpdate ?? "brak danych"}
                    </div>
                </div>
                <div className={styles.col2}>

                    {s.status !== "OFFLINE" && (
                        <>
                            <div className={styles.iconValue}>
                                <MdOutlineThermostat size={20} />
                                <b>{s.temperature ? `${s.temperature.toFixed(1)}°C` : "brak danych"}</b>
                            </div>
                            <div className={styles.iconValue}>
                                <MdOutlineWaterDrop size={20} />
                                <b>{s.temperature ? `${s.humidity}%` : "brak danych"}</b>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default SensorListItem;
