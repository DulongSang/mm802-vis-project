import { Dayjs } from "dayjs";

import { EventDescription, ResponseCode } from "./DataSetInfo";

export type DateRangeFilter = {
    type: "Date Range",
    fromDate: Dayjs | null,
    toDate: Dayjs | null,
};

export type DayOfWeekFilter = {
    type: "Day of Week",
    days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[],
};

export type EventDescriptionFilter = {
    type: "Event Description",
    eventDescriptions: EventDescription[],
};

export type ResponseCodeFilter = {
    type: "Response Code",
    responseCodes: ResponseCode[],
};

export type EmptyFilter = {
    type: "",
};

export type FilterValue = 
    | DateRangeFilter
    | DayOfWeekFilter
    | EventDescriptionFilter
    | ResponseCodeFilter
    | EmptyFilter;
export type FilterType = FilterValue["type"];

export const filterTypes: FilterType[] = ["Date Range", "Day of Week", "Event Description", "Response Code"];

export function newFilterValue(type: FilterType): FilterValue {
    switch (type) {
        case "Date Range":
            return { type, fromDate: null, toDate: null };
        case "Day of Week":
            return { type, days: [] };
        case "Event Description":
            return { type, eventDescriptions: [] };
        case "Response Code":
            return { type, responseCodes: [] };
        default:
            return { type };
    }
}
