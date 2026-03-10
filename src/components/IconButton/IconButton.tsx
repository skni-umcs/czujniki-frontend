import clsx from "clsx/lite";

import styles from "./IconButton.module.css";

interface IProps {
    children: React.ReactNode;
    title: string;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    className?: string;
    onClick?: () => void;
}

const IconButton: React.FC<IProps> = ({ children, title, type, className, onClick }) => {
    return (
        <button
            type={type}
            className={clsx(styles.root, className)}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default IconButton;
