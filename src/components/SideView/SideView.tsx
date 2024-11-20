import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";

import styles from "./SideView.module.css";

interface IProps extends React.PropsWithChildren {
    title: string;
    showBackButton?: boolean;
}

const SideView: React.FC<IProps> = ({ children, title, showBackButton }) => {
    const navigate = useNavigate();

    const backButton = (
        <button
            className={styles.backButton}
            onClick={() => { navigate(-1); }}
        >
            <IoArrowBack size={24} />
        </button>
    );

    return (
        <div className={styles.root}>
            <div className={styles.firstRow}>
                {showBackButton ? backButton : <div className={styles.backButtonPlaceholder} />}
                <div className={styles.heading}>{title}</div>
                <button
                    className={styles.closeBtn}
                    onClick={() => { navigate("/"); }}
                >
                    <IoClose size={24} />
                </button>
            </div>
            {children}
        </div>
    );
};

export default SideView;
