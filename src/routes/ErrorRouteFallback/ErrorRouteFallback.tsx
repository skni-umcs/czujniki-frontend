import { useRouteError, useNavigate } from "react-router-dom";

import styles from "./ErrorRouteFallback.module.css";
import Button from "../../components/Button/Button";
import { VscArrowLeft, VscRefresh } from "react-icons/vsc";

const getErrorMessage = (error: Error & { data?: string; status?: number; statusText?: string }) => {
    if (error.status === 404) {
        return "Nie znaleziono strony";
    }

    return "Wystąpił nieoczekiwany błąd";
};

export default function ErrorRouteFallback() {
    const navigate = useNavigate();
    const error = useRouteError() as Error & { data?: string; status?: number; statusText?: string };
    console.error(error);

    const reloadPage = () => {
        window.location.reload();
    };

    const goBack = () => {
        void navigate(-1);
    };

    const errorMessage = getErrorMessage(error);
    const errorDetails = error.status
        ? `Błąd ${error.status}`
        : error.data ?? "Nieznany błąd";

    return (
        <div id="error-page" className={styles.root}>
            <div className={styles.heading}>{errorDetails}</div>
            <div>{errorMessage}</div>
            <div>
                <i>{error.data}</i>
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
    );
}
