import { useRouteError, useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { VscRefresh, VscArrowLeft } from "react-icons/vsc";

import styles from "./ErrorSideView.module.css";
import SideView from "../../components/SideView/SideView.tsx";
import { DataProviderError, FetchError } from "../../DataProvider.ts";
import Button from "../../components/Button/Button.tsx";

function getErrorMessage(error: FetchError) {
    switch (error.code) {
        case DataProviderError.NETWORK_ERROR:
            return "Błąd połączenia z serwerem";
        case DataProviderError.FETCH_ERROR:
            return "Błąd pobierania danych";
        case DataProviderError.API_ERROR:
            return "Błąd API";
        case DataProviderError.INVALID_RESPONSE:
            return "Błąd parsowania danych";
        default:
            return "Nieznany błąd";
    }
}

const ErrorSideView: React.FC = () => {
    const navigate = useNavigate();
    const error = useRouteError() as FetchError;
    const errorMessage = getErrorMessage(error);
    console.error(error);

    const reloadPage = () => {
        window.location.reload();
    };

    const goBack = () => {
        void navigate(-1);
    };

    return (
        <SideView title="Błąd">
            <div className={styles.root}>
                <div className={styles.message}>
                    <MdErrorOutline className={styles.icon} size={48} />
                    {errorMessage}
                </div>
                <div className={styles.buttons}>
                    <Button
                        onClick={goBack}
                    >
                        <VscArrowLeft size={19} />
                        Powrót
                    </Button>
                    <Button
                        onClick={reloadPage}
                    >
                        <VscRefresh size={19} />
                        Odśwież stronę
                    </Button>
                </div>
            </div>
        </SideView>
    );
};

export default ErrorSideView;
