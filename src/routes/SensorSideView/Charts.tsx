import { use } from "react";

import styles from "./SensorSideView.module.css";
import SensorData from "../../types/SensorData";
import SensorChart from "../../components/SensorChart/SensorChart";

const chartHeight = 170;

interface IChartsProps {
    historicalDataPromise: Promise<SensorData[]>;
};

const Charts: React.FC<IChartsProps> = ({ historicalDataPromise }) => {
    const historicalData = use(historicalDataPromise);

    if (!historicalData[0]) return null;

    return (
        <>
            {historicalData[0].temperature && (
                <>
                    <div className={styles.heading}>Temperatura</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="temperature"
                        className={styles.chartOffset}
                        unit="° C"
                    />
                </>
            )}

            {historicalData[0].humidity && (
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
            )}

            {historicalData[0].pressure && (
                <>
                    <div className={styles.heading}>Ciśnienie</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="pressure"
                        className={styles.chartOffset}
                        unit=" hPa"
                    />
                </>
            )}
        </>
    );
};

export default Charts;
