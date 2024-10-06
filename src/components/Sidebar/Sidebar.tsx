import styles from "./Sidebar.module.css";

interface IProps {
    children: React.ReactElement;
}

const Sidebar: React.FC<IProps> = ({ children }) => {
    return (
        <div className={styles.root}>
            {children}
        </div>
    );
};

export default Sidebar;
