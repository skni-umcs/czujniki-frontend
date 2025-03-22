import MainAppTemplate from "./MainAppTemplate";

import styles from "./AppSkeleton.module.css";

const AppSkeleton: React.FC = () => {
    return (
        <MainAppTemplate>
            <div className={styles.root}>
                Ładowanie...
            </div>
        </MainAppTemplate>
    );
};

export default AppSkeleton;
