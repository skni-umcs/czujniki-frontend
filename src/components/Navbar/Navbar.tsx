import {
    IoHelpOutline,
    IoHelp,
    IoHeartOutline,
    IoHeart,
    IoList,
    IoAccessibilityOutline,
    IoAccessibility,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import clsx from "clsx/lite";

import styles from "./Navbar.module.css";
import skniLogo from "../../assets/skni_logo.svg";

interface IProps {
    className?: string;
}

const Navbar: React.FC<IProps> = ({ className }) => {
    return (
        <div className={clsx(styles.root, className)}>
            <img
                className={styles.logo}
                src={skniLogo}
                alt="Logo SKNI"
                height={51}
                width={76}
            />

            <NavLink
                to="/sensors"
                className={({ isActive }) => clsx(styles.item, isActive && styles.active)}
                title="Lista czujników"
            >
                <IoList size={24} />
                <div>Czujniki</div>
            </NavLink>

            <NavLink
                to="/favorites"
                className={({ isActive }) => clsx(styles.item, isActive && styles.active)}
                title="Ulubione czujniki"
            >
                {({ isActive }) => (
                    <>
                        {isActive ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
                        <div>Ulubione</div>
                    </>
                )}
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) => clsx(styles.item, isActive && styles.active)}
                title="O projekcie"
            >
                {({ isActive }) => (
                    <>
                        {isActive ? <IoHelp size={24} /> : <IoHelpOutline size={24} />}
                        <div>O projekcie</div>
                    </>
                )}
            </NavLink>

            <NavLink
                to="/accessibility"
                className={({ isActive }) => clsx(styles.item, isActive && styles.active)}
                title="Ustawienia dostępności"
            >
                {({ isActive }) => (
                    <>
                        {isActive
                            ? (
                                    <IoAccessibility size={24} />
                                )
                            : (
                                    <IoAccessibilityOutline size={24} />
                                )}
                        <div>Dostępność</div>
                    </>
                )}
            </NavLink>
        </div>
    );
};

export default Navbar;
