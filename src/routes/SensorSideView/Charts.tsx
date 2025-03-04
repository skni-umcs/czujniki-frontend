import { use } from "react";

import styles from "./SensorSideView.module.css";
import Pageable from "../../types/Pageable";
import Sensor from "../../types/Sensor";
import SensorData from "../../types/SensorData";
import SensorChart from "../../components/SensorChart/SensorChart";

const chartHeight = 150;

interface IChartsProps {
    sensor: Sensor;
    historicalDataPromise: Promise<Pageable<SensorData>>;
};

const Charts: React.FC<IChartsProps> = ({ sensor, historicalDataPromise }) => {
    const { content: historicalData } = use(historicalDataPromise);

    return (
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

            <div className={styles.heading}>Wilgotność</div>
            <SensorChart
                height={chartHeight}
                data={historicalData}
                dataKey="humidity"
                className={styles.chartOffset}
                unit="%"
                domain={[0, 100]}
            />

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

            {sensor.gasResistance && (
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
            )}
            {sensor.lastUpdate && (
                <div className={styles.updateDate}>
                    Zaktualizowano:
                    <br />
                    {new Date(sensor.lastUpdate).toLocaleString()}
                </div>
            )}
        </>
    );
};

export default Charts;
