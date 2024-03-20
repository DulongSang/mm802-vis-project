import { FilterValue } from '../types/FilterValue';
import { FireResponseDataRow, GroupByColumnName, GroupByValueColumnName } from '../types/DataSetInfo';

export const groupAggOpValues = ['count', 'sum', 'max', 'min', 'mean'] as const;
export type GroupAggOp = typeof groupAggOpValues[number];

function groupBy<T extends Object>(rows: T[], groupByKey: keyof T): { [category: string]: T[] } {
    return rows.reduce((group, item) => {
        let category: any = item[groupByKey];
        if (typeof category !== 'string') {
            category = category.toString();
        }
        if (!group[category]) {
            group[category] = [];
        }
        group[category].push(item);
        return group;
    }, {} as { [category: string | number]: T[] });
}

export function groupData(
    rows: FireResponseDataRow[],
    op: GroupAggOp,
    groupByColumn: GroupByColumnName,
    valueColumn?: GroupByValueColumnName
): { label: string, value: number }[] {
    if (op !== 'count' && !valueColumn) {
        throw new Error('valueColumn is required for operations other than count');
    }
    
    const groups = groupBy(rows, groupByColumn);

    switch (op) {
        case 'count':
            return Object.entries(groups).map(([label, group]) => ({ label, value: group.length }));
        case 'sum':
            return Object.entries(groups).map(([label, group]) => ({ label, value: group.reduce((sum, item) => sum + item[valueColumn!], 0) }));
        case 'max':
            return Object.entries(groups).map(([label, group]) => ({ label, value: Math.max(...group.map(item => item[valueColumn!])) }));
        case 'min':
            return Object.entries(groups).map(([label, group]) => ({ label, value: Math.min(...group.map(item => item[valueColumn!])) }));
        case 'mean':
            return Object.entries(groups).map(([label, group]) => ({ label, value: group.reduce((sum, item) => sum + item[valueColumn!], 0) / group.length }));
        default:
            throw new Error(`Unsupported operation ${op}`);
    }
}

export function barChartGroupData(
    rows: FireResponseDataRow[],
    op: GroupAggOp,
    groupByColumn: GroupByColumnName,
    stackByColumn: GroupByColumnName | 'None',
    valueColumn?: GroupByValueColumnName,
): {
    series: { data: number[], label?: string, stack?: 'total' }[],
    xAxis: { data: string[], scaleType: 'band' }[],
} {
    if (op !== 'count' && !valueColumn) {
        throw new Error('valueColumn is required for operations other than count');
    }

    if (stackByColumn === 'None') {
        const grouped = groupData(rows, op, groupByColumn, valueColumn);
        grouped.sort((a, b) => b.value - a.value);  // Sort in descending order
        return {
            series: [{ data: grouped.map(group => group.value) }],
            xAxis: [{ data: grouped.map(group => group.label), scaleType: 'band' }],
        };
    }

    const groups = Object.entries(groupBy(rows, groupByColumn)).map(
        ([label, group]) => ({ label, subGroups: groupData(group, op, stackByColumn, valueColumn) })
    );
    const labels = Array.from(new Set(groups.flatMap(group => group.subGroups.map(subGroup => subGroup.label))));
    labels.sort();
    const datas: number[][] = Array.from(labels, () => []);    // Create an array of empty arrays
    for (const { subGroups } of groups) {
        for (let i = 0; i < labels.length; i++) {
            const index = subGroups.findIndex(subGroup => subGroup.label === labels[i]);
            datas[i].push(index === -1 ? 0 : subGroups[index].value);
        }
    }

    return {
        series: datas.map((data, index) => ({ data, label: labels[index], stack: 'total' })),
        xAxis: [{ data: groups.map(group => group.label), scaleType: 'band' }],
    };
}

export function filterData(rows: FireResponseDataRow[], filters: FilterValue[]): FireResponseDataRow[] {
    let indices = rows.map((_, index) => index);
    for (const filter of filters) {
        switch (filter.type) {
            case 'Date Range':
                if (!filter.fromDate || !filter.toDate) {
                    continue;
                }
                const fromDate = filter.fromDate.toDate();
                const toDate = filter.toDate.endOf('day').toDate();
                indices = indices.filter(index => rows[index].datetime >= fromDate && rows[index].datetime <= toDate);
                break;
            case 'Day of Week':
                indices = indices.filter(index => filter.days.includes(rows[index].dayofweek));
                break;
            case 'Event Description':
                indices = indices.filter(index => filter.eventDescriptions.includes(rows[index].event_description));
                break;
            case 'Response Code':
                indices = indices.filter(index => filter.responseCodes.includes(rows[index].response_code));
                break;
            default:
                break;
        }
    }

    console.log(`DEBUG: filtered rows ${rows.length} -> ${indices.length}`);
    return indices.map(index => rows[index]);
}
