import { IoHelpOutline, IoHeartOutline, IoList, IoAccessibilityOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import skniLogo from "../../assets/skni_logo.svg";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <img
                className={styles.logo}
                src={skniLogo}
                alt="Logo SKNI"
                height={51}
                width={76}
            />
            <button
                className={styles.item}
                onClick={() => { void navigate("/sensors"); }}
                title="Lista czujników"
            >
                <IoList size={24} />
                <div>
                    Czujniki
                </div>
            </button>
            <button
                className={styles.item}
                onClick={() => { void navigate("/favorites"); }}
                title="Ulubione czujniki"
            >
                <IoHeartOutline size={24} />
                <div>
                    Ulubione
                </div>
            </button>
            <button className={styles.item} title="O projekcie">
                <IoHelpOutline size={24} />
                <div>
                    O projekcie
                </div>
            </button>
            <button
                className={styles.item}
                onClick={() => { void navigate("/accessibility"); }}
                title="Ustawienia dostępności"
            >
                <IoAccessibilityOutline size={24} />
                <div>
                    Dostępność
                </div>
            </button>
        </div>
    );
};

export default Navbar;
