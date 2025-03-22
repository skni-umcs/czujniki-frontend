import styles from "./MapAppTemplate.module.css";
import Navbar from "../Navbar/Navbar";
import AppHeader from "../AppHeader/AppHeader";
import MniswBar from "../MniswBar/MniswBar";

const MainAppTemplate: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <AppHeader className={styles.appHeader} />
            <MniswBar />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.leftRight}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default MainAppTemplate;
