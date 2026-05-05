import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceArea } from "recharts";
import { AxisDomain } from "recharts/types/util/types";
import { CategoricalChartFunc } from "recharts/types/chart/types";
import { RiDeleteBack2Fill } from "react-icons/ri";
import clsx from "clsx/lite";

import styles from "./SensorChart.module.css";
import useChartZoom from "./useChartZoom";
import CustomizedAxisTick from "./CustomizedAxisTick";
import IconButton from "../IconButton/IconButton";
import SensorData from "../../types/SensorData";

function getOptimalDataPoints<T extends object = object>(data: T[], containerWidth: number) {
    const maxPoints = Math.floor(containerWidth / 2);
    const factor = Math.ceil(data.length / maxPoints);

    const filtered = data.filter((_, index) => index % factor === 0);
    return [...filtered, data[data.length - 1]];
};

interface IProps<T extends object = object> {
    className?: string;
    height: number;
    data: T[];
    dataKey: keyof T;
    unit?: string;
    domain?: AxisDomain;
}

function SensorChart<T extends object = object>({ className, height, data, dataKey, unit, domain }: IProps<T>) {
    const {
        viewport,
        selection,
        setSelectionState,
        setViewportState,
        handleZoom,
        resetZoom,
        calculateDomain,
    } = useChartZoom();

    const [historicalData, setHistoricalData] = useState<T[]>(data);

    useEffect(() => {
        const isZoomed = viewport.left !== "dataMin" || viewport.right !== "dataMax";
        if (isZoomed) {
            const visibleData = (data as SensorData[]).filter(d =>
                d.timestamp >= Number(viewport.left) && d.timestamp <= Number(viewport.right));

            const optimalData = getOptimalDataPoints(visibleData as T[], 80);
            setViewportState({
                left: viewport.left,
                right: viewport.right,
                ...calculateDomain(optimalData, dataKey),
            });
            setHistoricalData(optimalData);
        } else {
            setHistoricalData(getOptimalDataPoints(data, 80));
        }
    }, [data, viewport.left, viewport.right, dataKey, setViewportState, calculateDomain]);

    const onMouseDownHandler: CategoricalChartFunc = (e) => {
        if (e.activeLabel && e.activeTooltipIndex) {
            setSelectionState({
                left: e.activeLabel,
                leftIndex: e.activeTooltipIndex as number,
                right: null,
                rightIndex: null,
            });
        }
    };

    const onMouseMoveHandler: CategoricalChartFunc = (e) => {
        if (selection.left && selection.leftIndex !== null && e.activeLabel && e.activeTooltipIndex) {
            setSelectionState({
                left: selection.left,
                leftIndex: selection.leftIndex,
                right: e.activeLabel,
                rightIndex: e.activeTooltipIndex as number,
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
                    data={historicalData}
                    className={clsx(styles.chart, className)}
                    onMouseDown={onMouseDownHandler}
                    onMouseMove={onMouseMoveHandler}
                    onMouseUp={() => { handleZoom(historicalData, dataKey); }}
                >
                    <Line
                        type="monotone"
                        dataKey={dataKey as string | number}
                        stroke="var(--chart-line-color)"
                        isAnimationActive={false}
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
                        formatter={value => [`${value?.toString()}${unit ?? ""}`]}
                        labelFormatter={value => new Date(value as number).toLocaleString()}
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
