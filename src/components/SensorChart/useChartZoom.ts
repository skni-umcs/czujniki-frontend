import { useState } from "react";
import { AxisDomainItem } from "recharts/types/util/types";

interface ViewportState {
    left: AxisDomainItem;
    right: AxisDomainItem;
    top: AxisDomainItem;
    bottom: AxisDomainItem;
};

interface SelectionState {
    left: AxisDomainItem | null;
    right: AxisDomainItem | null;
    leftIndex: number | null;
    rightIndex: number | null;
}

const initialViewportState = {
    left: "dataMin",
    right: "dataMax",
    top: "dataMax+1",
    bottom: "dataMin-1",
} as const;

const initialSelectionState = {
    left: null,
    right: null,
    leftIndex: null,
    rightIndex: null,
};

const asc = (a: number, b: number) => a - b;

function calculateDomain<T extends object>(data: T[], key: keyof T) {
    if (!data.length) return { top: 0, bottom: 0 };

    const values = data.map(d => d[key]).filter(d => Number.isFinite(d)) as number[];
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
        bottom: Math.floor(min) - 1,
        top: Math.ceil(max) + 1,
    };
};

const useChartZoom = () => {
    const [viewport, setViewportState] = useState<ViewportState>(initialViewportState);
    const [selection, setSelectionState] = useState<SelectionState>(initialSelectionState);

    function handleZoom<T extends object>(data: T[], dataKey: keyof T) {
        if (selection.left === null
            || selection.right === null
            || selection.leftIndex === null
            || selection.rightIndex === null
            || selection.left === selection.right
        ) {
            setSelectionState(initialSelectionState);
            return;
        }

        const [start, end] = [selection.leftIndex, selection.rightIndex].sort(asc);
        const [left, right] = [Number(selection.left), Number(selection.right)].sort(asc);

        const { top, bottom } = calculateDomain(
            data.slice(start, end < data.length ? end + 1 : end),
            dataKey,
        );

        setViewportState({ left, right, top, bottom });
        setSelectionState(initialSelectionState);
    };

    const resetZoom = () => {
        setViewportState(initialViewportState);
        setSelectionState(initialSelectionState);
    };

    return {
        selection,
        viewport,
        setSelectionState,
        setViewportState,
        handleZoom,
        resetZoom,
        calculateDomain,
    };
};
export default useChartZoom;
