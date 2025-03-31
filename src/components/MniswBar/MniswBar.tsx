import { useState } from "react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx/lite";

import styles from "./MniswBar.module.css";
import IconButton from "../IconButton/IconButton";
import MniswLogo from "../MniswLogo/MniswLogo";

const getMniswState = () => {
    const mniswHidden = localStorage.getItem("mniswHidden");
    return mniswHidden === "true" ? true : false;
};

interface IProps {
    className?: string;
}

const MniswBar: React.FC<IProps> = ({ className }) => {
    const [mniswHidden, setMniswHidden] = useState(getMniswState);

    if (mniswHidden) return null;

    const hideMnisw = () => {
        setMniswHidden(true);
        localStorage.setItem("mniswHidden", "true");
    };

    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.firstRowMobile}>
                <div className={styles.logoContainer}>
                    <MniswLogo className={styles.logo} height={51} width={163} />
                </div>
                <IconButton title="Zamknij" onClick={hideMnisw}>
                    <IoClose size={24} />
                </IconButton>
            </div>
            <div className={styles.text}>
                Projekt finansowany ze środków budżetu państwa, przyznanych przez Ministra Nauki w ramach Programu „Studenckie koła naukowe tworzą innowacje”.
            </div>
        </div>
    );
};

export default MniswBar;
