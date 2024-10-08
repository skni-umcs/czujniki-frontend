import { Link } from "react-router-dom";

import styles from "./Register.module.css";
import AppHeader from "../../components/AppHeader/AppHeader";

const Register: React.FC = () => {
    return (
        <>
            <AppHeader className={styles.appHeader} />
            <div className={styles.root}>
                <form className={styles.container}>
                    <div className={styles.heading}>Rejestracja</div>
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
                    <input
                        required
                        type="password"
                        placeholder="Powtórz hasło"
                        className={styles.textInput}
                    />
                    <input
                        type="submit"
                        value="Załóż konto"
                        className={styles.btn}
                    />
                    <div className={styles.suggestion}>
                        Masz już konto? <Link className={styles.loginLink} to="/login">Zaloguj się!</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
