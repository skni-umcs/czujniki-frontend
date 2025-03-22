import MainAppTemplate from "../../components/MapAppTemplate/MapAppTemplate";
import styles from "./MapAppRouteSkeleton.module.css";

const MapAppRouteSkeleton: React.FC = () => {
    return (
        <MainAppTemplate>
            <div className={styles.root}>
                Ładowanie...
            </div>
        </MainAppTemplate>
    );
};

export default MapAppRouteSkeleton;
