import styles from "./MapAppTemplate.module.css";
import Navbar from "../Navbar/Navbar";
import MniswBar from "../MniswBar/MniswBar";

const MainAppTemplate: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
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
