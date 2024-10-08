import { Link } from "react-router-dom";
import clsx from "clsx/lite";

import styles from "./AppHeader.module.css";
import skniLogo from "../../assets/skni_logo.svg";

interface IProps {
    className?: string;
}

const AppHeader: React.FC<IProps> = ({ className }) => {
    return (
        <header className={clsx(styles.root, className)}>
            <Link className={styles.link} to="/">
                <img className={styles.logo} src={skniLogo} alt="Logo SKNI" height={51} width={76} />
                <div className={styles.heading}>Czujniki UMCS</div>
            </Link>
        </header>
    );
};

export default AppHeader;
