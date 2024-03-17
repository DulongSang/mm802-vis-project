import { ColumnName } from "./DataSetInfo";

export type GraphTabBase = {
    title: string;
    type: string;
};

export type PieChartTab = GraphTabBase & {
    type: 'Pie Chart';
    groupByColumn?: ColumnName;
    valueColumn?: ColumnName;
};

export type MapTab = GraphTabBase & {
    type: 'Map';
};

export type EmptyTab = GraphTabBase & { type: '' };

export type GraphTab = PieChartTab | MapTab | EmptyTab;
export type GraphTabType = GraphTab['type'];

export const graphTabTypes: GraphTabType[] = ['Pie Chart', 'Map', ''];
