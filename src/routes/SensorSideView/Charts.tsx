import { use } from "react";
import { Form, useParams } from "react-router-dom";

import styles from "./SensorSideView.module.css";
import SensorData from "../../types/SensorData";
import SensorChart from "../../components/SensorChart/SensorChart";

const chartHeight = 235;

const getDefaultDateRange = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;

    const endDate = new Date(now.getTime() - offset);
    const startDate = new Date(now.getTime() - offset);

    startDate.setDate(startDate.getDate() - 1);
    return { startDate, endDate };
};

interface IChartsProps {
    historicalDataPromise: Promise<SensorData[]>;
};

const Charts: React.FC<IChartsProps> = ({ historicalDataPromise }) => {
    const historicalData = use(historicalDataPromise);
    const params = useParams() as { id: string };

    const { startDate, endDate } = getDefaultDateRange();

    return (
        <>
            <div className={styles.heading}>Dane historyczne</div>
            <Form
                className={styles.dateFilters}
                action={`/sensors/${params.id}`}
                method="GET"
                replace
            >
                <label>
                    <b>Data początkowa:</b>
                    <input
                        className={styles.dateTimeInput}
                        type="datetime-local"
                        name="startDate"
                        defaultValue={startDate.toISOString().slice(0, -8)}
                    />
                </label>
                <label>
                    <b>Data końcowa:</b>
                    <input
                        className={styles.dateTimeInput}
                        type="datetime-local"
                        name="endDate"
                        defaultValue={endDate.toISOString().slice(0, -8)}
                    />
                </label>
                <input className={styles.dateFilterButton} type="submit" value="Filtruj" />
            </Form>
            {!historicalData[0] && (
                <div className={styles.noChartsMessage}>Brak danych w tym zakresie dat.</div>
            )}
            {historicalData[0]?.temperature
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

            {historicalData[0]?.humidity
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

            {historicalData[0]?.pressure
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
