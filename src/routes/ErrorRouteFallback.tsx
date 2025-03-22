import { useRouteError } from "react-router-dom";

export default function ErrorRouteFallback() {
    const error = useRouteError() as Error;
    console.error(error);

    return (
        <div id="error-page">
            <h1>Ups!</h1>
            <p>Wystąpił nieoczekiwany błąd.</p>
            <p>
                <i>{error.message}</i>
            </p>
        </div>
    );
}
