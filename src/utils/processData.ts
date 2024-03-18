import { DataFrame, toJSON } from 'danfojs';

export const groupAggOpValues = ['count', 'sum', 'max', 'min', 'mean'] as const;
export type GroupAggOp = typeof groupAggOpValues[number];

export function groupData(data: DataFrame, op: GroupAggOp, groupByColumn: string, valueColumn?: string): { label: string, value: number }[] {
    valueColumn = valueColumn ?? groupByColumn;
    const df = data.groupby([groupByColumn]).col([valueColumn])[op]();
    const colNameMapping = Object.fromEntries([[df.columns[0], 'label'], [df.columns[1], 'value']]);
    df.rename(colNameMapping, { inplace: true });
    df.asType('label', 'string', { inplace: true });
    return toJSON(df) as { label: string, value: number }[];
}
