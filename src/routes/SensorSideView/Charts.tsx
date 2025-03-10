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
            {historicalData[0].temperature
                ? (
                <>
                    <div className={styles.heading}>Temperatura</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="temperature"
                        unit="° C"
                    />
                </>
                    )
                : null}

            {historicalData[0].humidity
                ? (
                <>
                    <div className={styles.heading}>Wilgotność</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="humidity"
                        unit="%"
                        domain={[0, 100]}
                    />
                </>
                    )
                : null}

            {historicalData[0].pressure
                ? (
                <>
                    <div className={styles.heading}>Ciśnienie</div>
                    <SensorChart
                        height={chartHeight}
                        data={historicalData}
                        dataKey="pressure"
                        unit=" hPa"
                    />
                </>
                    )
                : null}
        </>
    );
};

export default Charts;
