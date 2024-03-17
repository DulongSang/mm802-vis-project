export const columnNames = [
    'dayofweek',
    'event_duration_mins',
    'event_description',
    'response_code',
] as const;

export type ColumnName = typeof columnNames[number];
