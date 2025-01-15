import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AxisDomain } from "recharts/types/util/types";

interface IProps {
    className?: string;
    height: number;
    data: unknown[];
    dataKey: string;
    label: string;
    unit?: string;
    domain?: AxisDomain;
}

const SensorChart: React.FC<IProps> = ({ className, height, data, dataKey, label, unit, domain }) => {
    return (
        <ResponsiveContainer width="110%" height={height}>
            <LineChart data={data} className={className}>
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke="var(--primary-btn-color)"
                />
                <XAxis
                    dataKey="datetime"
                    tickFormatter={(value: string) => value.split(", ")[1]}
                    tickMargin={4}
                    fontSize="0.8em"
                />
                <YAxis
                    unit={unit}
                    fontSize="0.8em"
                    scale="linear"
                    width={76}
                    domain={domain}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "var(--bg-primary)" }}
                    formatter={value => [`${value.toString()}${unit ?? ""}`, label]}
                />
                <CartesianGrid stroke="var(--border-color2)" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SensorChart;
