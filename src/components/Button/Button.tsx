import styles from "./Button.module.css";

const Button: React.FC<React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>> = (
    { children, ...props },
) => {
    return (
        <button className={styles.root} {...props}>
            {children}
        </button>
    );
};

export default Button;
