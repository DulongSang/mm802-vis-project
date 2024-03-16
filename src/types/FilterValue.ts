import { Dayjs } from "dayjs";

export type DateRangeFilter = {
    type: "Date Range",
    fromDate: Dayjs | null,
    toDate: Dayjs | null,
};

export type DayOfWeekFilter = {
    type: "Day of Week",
    days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[],
};

export type EmptyFilter = {
    type: "",
};

export type FilterValue = DateRangeFilter | DayOfWeekFilter | EmptyFilter;
export type FilterType = FilterValue["type"];

export const filterTypes: FilterType[] = ["Date Range", "Day of Week", ""];

export function newFilterValue(type: FilterType): FilterValue {
    switch (type) {
        case "Date Range":
            return { type, fromDate: null, toDate: null };
        case "Day of Week":
            return { type, days: [] };
        default:
            return { type };
    }
}
