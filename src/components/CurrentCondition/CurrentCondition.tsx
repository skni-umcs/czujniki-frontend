import { IconType } from "react-icons";
import styles from "./CurrentCondition.module.css";

interface ICurrentConditionProps {
    label: string;
    value: string;
    icon: IconType;
    iconSize: number;
    iconLeftMargin?: number;
    multilineValue?: boolean;
}

const CurrentCondition: React.FC<ICurrentConditionProps> = ({
    label,
    value,
    icon,
    iconSize,
    iconLeftMargin,
    multilineValue,
}) => {
    return (
        <div className={styles.root}>
            {label}
            <div className={styles.content} style={multilineValue ? { fontSize: "0.95em" } : undefined}>
                <div className={styles.iconWrapper}>
                    {icon({
                        size: iconSize,
                        style: { marginLeft: iconLeftMargin },
                        className: styles.icon,
                    })}
                </div>
                {value}
            </div>
        </div>
    );
};

export default CurrentCondition;
