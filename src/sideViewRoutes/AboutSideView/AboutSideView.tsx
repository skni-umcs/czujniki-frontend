import { Link, useLoaderData } from "react-router-dom";

import MapPortal from "../../components/MapPortal/MapPortal";
import SensorMarker from "../../components/SensorMarker/SensorMarker";
import SideView from "../../components/SideView/SideView";
import MniswLogo from "../../components/MniswLogo/MniswLogo";
import Sensor from "../../types/Sensor";
import styles from "./AboutSideView.module.css";

export interface IAccessibilitySideViewLoaderData {
    sensorList: Sensor[];
};

const AboutSideView: React.FC = () => {
    const { sensorList } = useLoaderData<IAccessibilitySideViewLoaderData>();

    return (
        <SideView title="O projekcie">
            <MapPortal>
                {sensorList.map(s => <SensorMarker key={s.id} sensor={s} />)}
            </MapPortal>
            <div className={styles.root}>
                <div className={styles.content}>
                    <span>Aplikacja została stworzona w ramach projektu </span>
                    <i>
                        &quot;Badanie wydajności protokołów LoRa i MQTT w oparciu o wielkopowierzchniową sieć czujników klimatycznych&quot;.
                        <br />
                    </i>
                    <p>
                        <Link to="https://www.umcs.pl/pl/badanie-wydajnosci-protokolow-lora-i-mqtt-w-oparciu-o-wielkopowierzchniowa-siec-czujnikow-klimatycznych,30496.htm">Strona projektu</Link>
                        <br />
                        <Link to="https://skni.umcs.pl">Studenckie Koło Naukowe Informatyki</Link>
                    </p>
                    <p className={styles.mnisw}>
                        <MniswLogo className={styles.logo} height={59} width={190} />
                        <br />
                        Projekt finansowany ze środków budżetu państwa, przyznanych przez Ministra Nauki w ramach Programu „Studenckie koła naukowe tworzą innowacje”.
                    </p>
                </div>

            </div>
        </SideView>
    );
};

export default AboutSideView;
