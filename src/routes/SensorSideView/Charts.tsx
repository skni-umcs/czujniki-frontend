import { use, useMemo } from "react";

import styles from "./SensorSideView.module.css";
import Pageable from "../../types/Pageable";
import SensorData from "../../types/SensorData";
import SensorChart from "../../components/SensorChart/SensorChart";

const chartHeight = 150;

interface IChartsProps {
    historicalDataPromise: Promise<Pageable<SensorData>>;
};

const Charts: React.FC<IChartsProps> = ({ historicalDataPromise }) => {
    const { content } = use(historicalDataPromise);
    const historicalData = useMemo(() => (
        content.sort((a, b) => new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf())
    ), [content]);

    return (
        <>
            {historicalData[0]?.temperature
                ? (
                        <>
                            <div className={styles.heading}>Temperatura</div>
                            <SensorChart
                                height={chartHeight}
                                data={historicalData}
                                dataKey="temperature"
                                className={styles.chartOffset}
                                unit="° C"
                                domain={[
                                    (dataMin: number) => dataMin - 2,
                                    (dataMax: number) => dataMax + 2,
                                ]}
                            />
                        </>
                    )
                : null}

            {historicalData[0]?.humidity
                ? (
                        <>
                            <div className={styles.heading}>Wilgotność</div>
                            <SensorChart
                                height={chartHeight}
                                data={historicalData}
                                dataKey="humidity"
                                className={styles.chartOffset}
                                unit="%"
                                domain={[0, 100]}
                            />
                        </>
                    )
                : null}

            {historicalData[0]?.pressure
                ? (
                        <>
                            <div className={styles.heading}>Ciśnienie</div>
                            <SensorChart
                                height={chartHeight}
                                data={historicalData}
                                dataKey="pressure"
                                className={styles.chartOffset}
                                unit=" hPa"
                                domain={[
                                    (dataMin: number) => (Math.ceil((dataMin - 10) / 10) * 10),
                                    (dataMax: number) => (Math.floor((dataMax + 10) / 10) * 10),
                                ]}
                            />
                        </>
                    )
                : null}

            {historicalData[0]?.gasResistance
                ? (
                        <>
                            <div className={styles.heading}>Jakość powietrza</div>
                            <SensorChart
                                height={chartHeight}
                                data={historicalData}
                                dataKey="gasResistance"
                                className={styles.chartOffset}
                                // unit=" ppm"
                                domain={[
                                    (dataMin: number) => (Math.ceil((dataMin - 10) / 10) * 10),
                                    (dataMax: number) => (Math.floor((dataMax + 10) / 10) * 10),
                                ]}
                            />
                        </>
                    )
                : null}
        </>
    );
};

export default Charts;
