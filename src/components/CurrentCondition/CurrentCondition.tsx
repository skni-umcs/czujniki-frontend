import { IconType } from "react-icons";
import clsx from "clsx/lite";

import styles from "./CurrentCondition.module.css";

interface ICurrentConditionProps {
    label: string;
    value: string;
    icon?: IconType;
    iconSize?: number;
    multilineValue?: boolean;
}

const CurrentCondition: React.FC<ICurrentConditionProps> = ({
    label,
    value,
    icon,
    iconSize,
    multilineValue,
}) => {
    return (
        <div className={styles.root}>
            {icon?.({
                size: iconSize,
                className: styles.icon,
            })}
            <div className={clsx(styles.content)}>
                <b>{label}</b>
                <div className={clsx(multilineValue && styles.multilineValue)}>{value}</div>
            </div>
        </div>
    );
};

export default CurrentCondition;
