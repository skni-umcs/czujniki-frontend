import { Link } from "react-router-dom";

import styles from "./LoginRoute.module.css";
import AppHeader from "../../components/AppHeader/AppHeader";

const LoginRoute: React.FC = () => {
    return (
        <>
            <AppHeader className={styles.appHeader} />
            <div className={styles.root}>
                <form className={styles.container}>
                    <div className={styles.heading}>Logowanie</div>
                    <input
                        required
                        type="text"
                        placeholder="Nazwa użytkownika"
                        className={styles.textInput}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Hasło"
                        className={styles.textInput}
                    />
                    <label className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            placeholder="Hasło"
                            className={styles.checkbox}
                        />
                        Nie wylogowywuj mnie
                    </label>
                    <input
                        type="submit"
                        value="Zaloguj się"
                        className={styles.btn}
                    />
                    <div className={styles.suggestion}>
                        Nie masz konta? <Link className={styles.link} to="/register">Zarejestruj się!</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginRoute;
