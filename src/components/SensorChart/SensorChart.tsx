import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AxisDomain } from "recharts/types/util/types";
import clsx from "clsx/lite";

import styles from "./SensorChart.module.css";

interface IProps {
    className?: string;
    height: number;
    data: unknown[];
    dataKey: string;
    unit?: string;
    domain?: AxisDomain;
}

const SensorChart: React.FC<IProps> = ({ className, height, data, dataKey, unit, domain }) => {
    return (
        <ResponsiveContainer width="105%" height={height}>
            <LineChart data={data} className={clsx(styles.chart, className)}>
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke="var(--primary-btn-color)"
                    dot={true}
                    connectNulls={true}
                />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value: string) => new Date(value).toLocaleString().slice(0, -3).split(", ")[1]}
                    tickMargin={4}
                    fontSize="0.8em"
                    style={{ fill: "currentColor" }}
                />
                <YAxis
                    unit={unit}
                    fontSize="0.8em"
                    scale="linear"
                    width={70}
                    domain={domain}
                    style={{ fill: "currentColor" }}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "var(--bg-primary)", lineHeight: "1.5" }}
                    formatter={value => [`${value.toString()}${unit ?? ""}`]}
                    labelFormatter={(value: string) => new Date(value).toLocaleString().slice(0, -3)}
                    allowEscapeViewBox={{ x: false, y: true }}
                    itemStyle={{ padding: 0 }}
                />
                <CartesianGrid stroke="var(--border-color)" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SensorChart;
