import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceArea } from "recharts";
import { AxisDomain } from "recharts/types/util/types";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { RiDeleteBack2Fill } from "react-icons/ri";
import clsx from "clsx/lite";

import styles from "./SensorChart.module.css";
import { useChartZoom } from "./useChartZoom";
import CustomizedAxisTick from "./CustomizedAxisTick";
import IconButton from "../IconButton/IconButton";

interface IProps<T extends object = object> {
    className?: string;
    height: number;
    data: T[];
    dataKey: keyof T;
    unit?: string;
    domain?: AxisDomain;
}

function SensorChart<T extends object = object>({ className, height, data, dataKey, unit, domain }: IProps<T>) {
    const { viewport, selection, setSelectionState, handleZoom, resetZoom } = useChartZoom();

    const onMouseDownHandler: CategoricalChartFunc = (e) => {
        if (e.activeLabel && e.activeTooltipIndex) {
            setSelectionState({
                left: e.activeLabel,
                leftIndex: e.activeTooltipIndex,
                right: null,
                rightIndex: null,
            });
        }
    };

    const onMouseMoveHandler: CategoricalChartFunc = (e) => {
        if (selection.left && e.activeLabel && e.activeTooltipIndex) {
            setSelectionState({
                left: selection.left,
                leftIndex: selection.leftIndex,
                right: e.activeLabel,
                rightIndex: e.activeTooltipIndex,
            });
        }
    };

    return (
        <div className={styles.root}>
            {viewport.left !== "dataMin" && (
                <IconButton className={styles.resetButton} title="Reset" onClick={resetZoom}>
                    <RiDeleteBack2Fill size={20} />
                </IconButton>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart
                    margin={{ bottom: 50, top: 0, left: 4, right: 32 }}
                    data={data}
                    className={clsx(styles.chart, className)}
                    onMouseDown={onMouseDownHandler}
                    onMouseMove={onMouseMoveHandler}
                    onMouseUp={() => { handleZoom(data, dataKey); }}
                >
                    <Line
                        type="linear"
                        dataKey={dataKey as string | number}
                        stroke="var(--primary-btn-color)"
                        dot={false}
                    />
                    <XAxis
                        dataKey="timestamp"
                        minTickGap={-60}
                        tick={CustomizedAxisTick}
                        allowDataOverflow={true}
                        type="number"
                        domain={[viewport.left, viewport.right]}
                    />
                    <YAxis
                        unit={unit}
                        fontSize="0.8em"
                        scale="linear"
                        width={70}
                        style={{ fill: "currentColor" }}
                        allowDataOverflow
                        type="number"
                        domain={domain ?? [viewport.bottom, viewport.top]}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "var(--bg-primary)", lineHeight: "1.5" }}
                        formatter={value => [`${value.toString()}${unit ?? ""}`]}
                        labelFormatter={(value: number) => new Date(value).toLocaleString()}
                        allowEscapeViewBox={{ x: false, y: true }}
                        itemStyle={{ padding: 0 }}
                    />
                    <CartesianGrid strokeDasharray="1 3" stroke="var(--border-color)" />
                    {selection.left && selection.right && (
                        <ReferenceArea
                            x1={selection.left as string | number}
                            x2={selection.right as string | number}
                            strokeOpacity={0.3}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SensorChart;
