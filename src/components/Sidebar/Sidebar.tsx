import styles from "./Sidebar.module.css";

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.root}>
            {children}
        </div>
    );
};

export default Sidebar;
