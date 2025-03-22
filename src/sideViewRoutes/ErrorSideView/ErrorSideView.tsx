import { useRouteError } from "react-router-dom";

import styles from "./ErrorSideView.module.css";
import SideView from "../../components/SideView/SideView.tsx";

const ErrorSideView: React.FC = () => {
    const error = useRouteError() as Error;
    console.error(error);

    return (
        <SideView title="Błąd">
            <div className={styles.root}>
                <div>
                    <div className={styles.message}>{error.message}</div>
                </div>
            </div>
        </SideView>
    );
};

export default ErrorSideView;
