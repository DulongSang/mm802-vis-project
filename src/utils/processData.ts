import { FilterValue } from '../types/FilterValue';
import { FireResponseDataRow, GroupByColumnName, GroupByValueColumnName } from '../types/DataSetInfo';

export const groupAggOpValues = ['count', 'sum', 'max', 'min', 'mean'] as const;
export type GroupAggOp = typeof groupAggOpValues[number];

export function groupData(
    rows: FireResponseDataRow[],
    op: GroupAggOp,
    groupByColumn: GroupByColumnName,
    valueColumn?: GroupByValueColumnName
): { label: string, value: number }[] {
    if (op !== 'count' && !valueColumn) {
        throw new Error('valueColumn is required for operations other than count');
    }
    
    const groups: { [category: string | number]: FireResponseDataRow[] } = rows.reduce((group, item) => {
        const category = item[groupByColumn];
        if (!group[category]) {
            group[category] = [];
        }
        group[category].push(item);
        return group;
    }, {} as { [category: string | number]: FireResponseDataRow[] });

    switch (op) {
        case 'count':
            return Object.entries(groups).map(([label, group]) => ({ label, value: group.length }));
        case 'sum':
            return Object.entries(groups).map(([label, group]) => ({ label, value: group.reduce((sum, item) => sum + item[valueColumn!], 0) }));
        default:
            throw new Error('Unsupported operation');
    }
}

export function filterData(rows: FireResponseDataRow[], filters: FilterValue[]): FireResponseDataRow[] {
    let indices = rows.map((_, index) => index);
    console.log(`before: ${indices.length}`);
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
            default:
                break;
        }
    }

    console.log(`after: ${indices.length}`);
    return indices.map(index => rows[index]);
}
