interface ITickProps {
    x: string | number;
    y: string | number;
    payload: {
        value: number;
    };
}

const relativeDayFormatter = new Intl.RelativeTimeFormat("pl", { numeric: "auto" });
const timeFormatter = new Intl.DateTimeFormat("pl", { timeStyle: "medium" });
const dateFormatter = new Intl.DateTimeFormat("pl");

const CustomizedAxisTick = ({ x, y, payload }: ITickProps) => {
    const payloadDate = new Date(payload.value);
    const now = new Date();

    const todaysDayMs = new Date(now.toDateString()).getTime();
    const payloadDayMs = new Date(payloadDate.toDateString()).getTime();

    const diffDays = Math.trunc((payloadDayMs - todaysDayMs) / (1000 * 60 * 60 * 24));
    const secondRow = diffDays >= -2
        ? relativeDayFormatter.format(diffDays, "day")
        : dateFormatter.format(payloadDate);

    return (
        <g transform={`translate(${x.toString()},${y.toString()})`} fontSize="0.8em">
            <text dy={16} textAnchor="end" fill="currentColor" transform="rotate(-35)">
                {timeFormatter.format(payloadDate)}
            </text>
            <text dy={32} textAnchor="end" fill="currentColor" transform="rotate(-35)">
                {secondRow}
            </text>
        </g>
    );
};

export default CustomizedAxisTick;
