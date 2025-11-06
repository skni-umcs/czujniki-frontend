import { Link } from "react-router-dom";
import { MdErrorOutline, MdOutlineDoNotDisturbOn } from "react-icons/md";

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
            <div className={styles.heading}>
                {s.location.facultyAbbreviation} {s.id}
                {s.status === "ERROR" && (
                    <MdErrorOutline
                        size={20}
                        title="Wystąpił błąd"
                    />
                )}
                {s.status === "OFFLINE" && (
                    <MdOutlineDoNotDisturbOn
                        size={20}
                        title={Status[s.status]}
                    />
                )}
            </div>

            <div>
                <i>{s.location.facultyName}</i>
                {s.floor !== null && (
                    <i> – Piętro {s.floor}</i>
                )}
            </div>

            <div>Zaktualizowano: <b>{lastUpdate ?? "brak danych"}</b></div>

            {s.status !== "OFFLINE" && (
                <div>
                    <span>Temperatura: </span>
                    <b>{s.temperature ? `${s.temperature}° C` : "brak danych"}</b>
                </div>
            )}
        </Link>
    );
};

export default SensorListItem;
