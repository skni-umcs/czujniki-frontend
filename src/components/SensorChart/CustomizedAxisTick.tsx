interface ITickProps {
    x: number;
    y: number;
    payload: {
        value: number;
    };
}

const CustomizedAxisTick = ({ x, y, payload }: ITickProps) => {
    const correctedDate = new Date(payload.value);
    const now = new Date();

    let secondRow = correctedDate.toLocaleString().split(", ")[0];

    if (correctedDate.getDate() === now.getDate() - 1) secondRow = "wczoraj";
    else if (correctedDate.getDate() === now.getDate()) secondRow = "dzisiaj";

    return (
        <g transform={`translate(${x.toString()},${y.toString()})`} fontSize="0.8em">
            <text dy={16} textAnchor="end" fill="currentColor" transform="rotate(-35)">
                {correctedDate.toLocaleString().split(", ")[1]}
            </text>
            <text dy={32} textAnchor="end" fill="currentColor" transform="rotate(-35)">
                {secondRow}
            </text>
        </g>
    );
};

export default CustomizedAxisTick;
