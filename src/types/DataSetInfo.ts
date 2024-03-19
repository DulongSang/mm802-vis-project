export const responseCodeValues = ['A', 'B', 'C', 'D', 'E', 'unknown'] as const;
export const dayOfWeekValues = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export const eventDescriptionValues = [
    'MEDICAL',
    'ALARMS',
    'OUTSIDE FIRE',
    'MOTOR VEHICLE INCIDENT',
    'CITIZEN ASSIST',
    'FIRE',
    'TRAINING/MAINTENANCE',
    'HAZARDOUS MATERIALS',
    'RESCUE',
    'OTHER',
    'VEHICLE FIRE',
    'COMMUNITY EVENT',
    'MESS',
] as const;

export type ResponseCode = typeof responseCodeValues[number];
export type DayOfWeek = typeof dayOfWeekValues[number];
export type EventDescription = typeof eventDescriptionValues[number];

export type FireResponseDataRow = {
    year: number,
    month: number,
    dayofweek: DayOfWeek,
    datetime: Date,
    event_duration_mins: number,
    event_description: EventDescription,
    latitude: number,
    longitude: number,
    response_code: ResponseCode,
};
export type ColumnName = keyof FireResponseDataRow;

export const columnNames: ColumnName[] = [
    'year',
    'month',
    'dayofweek',
    'datetime',
    'event_duration_mins',
    'event_description',
    'latitude',
    'longitude',
    'response_code',
];

export const groupByColumnNames = [
    'year',
    'month',
    'dayofweek',
    'event_description',
    'response_code',
] as const;
export type GroupByColumnName = typeof groupByColumnNames[number];

export const groupByValueColumnNames = [
    'event_duration_mins',
] as const;
export type GroupByValueColumnName = typeof groupByValueColumnNames[number];
