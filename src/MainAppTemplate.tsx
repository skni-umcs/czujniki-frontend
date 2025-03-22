import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import AppHeader from "./components/AppHeader/AppHeader";
import MniswBar from "./components/MniswBar/MniswBar";

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
