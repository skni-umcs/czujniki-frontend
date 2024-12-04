import { useState } from "react";
import { IoClose } from "react-icons/io5";

import styles from "./MniswBar.module.css";
import IconButton from "../IconButton/IconButton";
import { useTheme } from "../../contexts/ThemeProvider";
import mniswLogoLight from "../../assets/mnisw_light.png";
import mniswLogoDark from "../../assets/mnisw_dark.png";
import mniswLogoMono from "../../assets/mnisw_mono.png";

const getMniswState = () => {
    const mniswHidden = localStorage.getItem("mniswHidden");
    return mniswHidden === "true" ? true : false;
};

const MniswBar: React.FC = () => {
    const { actualTheme } = useTheme();
    const [mniswHidden, setMniswHidden] = useState(getMniswState);

    if (mniswHidden) return null;

    let logo = mniswLogoLight;
    if (actualTheme === "dark") logo = mniswLogoDark;
    if (actualTheme === "highContrast") logo = mniswLogoMono;

    const hideMnisw = () => {
        setMniswHidden(true);
        localStorage.setItem("mniswHidden", "true");
    };

    return (
        <div className={styles.root}>
            <img className={styles.logo} src={logo} alt="Logo MNISW" height={51} width={163} />
            <div className={styles.text}>
                Projekt finansowany ze środków budżetu państwa, przyznanych przez Ministra Nauki w ramach Programu „Studenckie koła naukowe tworzą innowacje”.
            </div>
            <IconButton title="Zamknij" onClick={hideMnisw}>
                <IoClose size={24} />
            </IconButton>
        </div>
    );
};

export default MniswBar;
