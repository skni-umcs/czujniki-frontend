import styles from "./MapAppTemplate.module.css";
import Navbar from "../Navbar/Navbar";
import MniswBar from "../MniswBar/MniswBar";

const MainAppTemplate: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className={styles.wrapper}>
                <Navbar className={styles.navbar} />
                <div className={styles.leftRight}>
                    {children}
                </div>
            </div>
            <MniswBar className={styles.mniswBar} />
        </>
    );
};

export default MainAppTemplate;
