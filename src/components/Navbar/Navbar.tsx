import { IoHelpOutline, IoHeartOutline, IoList, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import skniLogo from "../../assets/skni_logo.svg";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.sideMenu}>
            <img
                className={styles.logo}
                src={skniLogo}
                alt="Logo SKNI"
                height={51}
                width={76}
            />
            <button
                className={styles.sideMenuItem}
                onClick={() => { navigate("/sensors"); }}
                title="Lista czujników"
            >
                <IoList size={24} />
                <div>
                    Czujniki
                </div>
            </button>
            <button className={styles.sideMenuItem} title="Ulubione czujniki">
                <IoHeartOutline size={24} />
                <div>
                    Ulubione
                </div>
            </button>
            <button className={styles.sideMenuItem} title="O projekcie">
                <IoHelpOutline size={24} />
                <div>
                    O projekcie
                </div>
            </button>
            <button className={styles.sideMenuItem} title="Ustawienia">
                <IoSettingsOutline size={24} />
                <div>
                    Ustawienia
                </div>
            </button>
        </div>
    );
};

export default Navbar;
