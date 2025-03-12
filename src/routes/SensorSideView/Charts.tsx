import { use } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./SensorSideView.module.css";
import SensorData from "../../types/SensorData";
import SensorChart from "../../components/SensorChart/SensorChart";

const chartHeight = 225;

const getDefaultDateRange = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;

    const endDate = new Date(now.getTime() - offset);
    const startDate = new Date(now.getTime() - offset);

    startDate.setDate(startDate.getDate() - 1);
    return { startDate, endDate };
};

type TDateFilterTarget = HTMLFormElement & {
    startDate: HTMLInputElement;
    endDate: HTMLInputElement;
};

interface IChartsProps {
    historicalDataPromise: Promise<SensorData[]>;
};

const Charts: React.FC<IChartsProps> = ({ historicalDataPromise }) => {
    const historicalData = use(historicalDataPromise);
    const navigate = useNavigate();
    const params = useParams();

    const handleDateFilter: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const { startDate, endDate } = event.target as TDateFilterTarget;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        void navigate(`/sensors/${params.id!}/${startDate.value}/${endDate.value}`);
    };

    const { startDate, endDate } = getDefaultDateRange();

    return (
        <>
            <div className={styles.heading}>Dane historyczne</div>
            <form className={styles.dateFilters} onSubmit={handleDateFilter}>
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
            </form>
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
