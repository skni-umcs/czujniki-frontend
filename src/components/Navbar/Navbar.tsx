import { IoHelpOutline, IoHeartOutline, IoList, IoAccessibilityOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import skniLogo from "../../assets/skni_logo.svg";

const Navbar: React.FC = () => {
    return (
        <div className={styles.root}>
            <img
                className={styles.logo}
                src={skniLogo}
                alt="Logo SKNI"
                height={51}
                width={76}
            />
            <Link
                className={styles.item}
                to="/sensors"
                title="Lista czujników"
            >
                <IoList size={24} />
                <div>
                    Czujniki
                </div>
            </Link>
            <Link
                className={styles.item}
                to="/favorites"
                title="Ulubione czujniki"
            >
                <IoHeartOutline size={24} />
                <div>
                    Ulubione
                </div>
            </Link>
            <Link
                className={styles.item}
                to="/about"
                title="O projekcie"
            >
                <IoHelpOutline size={24} />
                <div>
                    O projekcie
                </div>
            </Link>
            <Link
                className={styles.item}
                to="/accessibility"
                title="Ustawienia dostępności"
            >
                <IoAccessibilityOutline size={24} />
                <div>
                    Dostępność
                </div>
            </Link>
        </div>
    );
};

export default Navbar;
