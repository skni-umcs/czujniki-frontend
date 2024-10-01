import { Link } from "react-router-dom";

import classNames from "./AppHeader.module.css";
import skniLogo from "../../assets/skni_logo.svg";

const AppHeader = () => {
    return (
        <header className={classNames.root}>
            <img className={classNames.logo} src={skniLogo} alt="Logo SKNI" height={51} width={76} />
            <h1>Czujniki UMCS</h1>
            <nav className={classNames.nav}>
                <Link to="/">
                    Strona główna
                </Link>
                <Link to="/about">
                    O projekcie
                </Link>
                <Link to="https://skni.umcs.pl/">
                    SKNI
                </Link>
            </nav>
        </header>
    );
};

export default AppHeader;
