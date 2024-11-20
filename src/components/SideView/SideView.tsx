import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";

import styles from "./SideView.module.css";
import IconButton from "../IconButton/IconButton";

interface IProps extends React.PropsWithChildren {
    title: string;
    showBackButton?: boolean;
}

const SideView: React.FC<IProps> = ({ children, title, showBackButton }) => {
    const navigate = useNavigate();

    const backButton = (
        <IconButton
            title="Cofnij"
            onClick={() => { navigate(-1); }}
        >
            <IoArrowBack size={24} />
        </IconButton>
    );

    return (
        <div className={styles.root}>
            <div className={styles.firstRow}>
                {showBackButton ? backButton : <div className={styles.backButtonPlaceholder} />}
                <div className={styles.heading}>{title}</div>
                <IconButton
                    title="Zamknij"
                    onClick={() => { navigate("/"); }}
                >
                    <IoClose size={24} />
                </IconButton>
            </div>
            {children}
        </div>
    );
};

export default SideView;
