import { GroupByColumnName, GroupByValueColumnName, NominalColumnName } from "./DataSetInfo";
import { GroupAggOp } from "../utils/processData";

export type GraphTabBase = {
    title: string;
    type: string;
};

export type PieChartTab = GraphTabBase & {
    type: 'Pie Chart';
    groupAggOp?: GroupAggOp;
    groupByColumn?: GroupByColumnName;
    valueColumn?: GroupByValueColumnName;
};

export type BarChartTab = GraphTabBase & {
    type: 'Bar Chart';
    groupAggOp?: GroupAggOp;
    groupByColumn?: GroupByColumnName;
    stackByColumn?: GroupByColumnName | 'None';
    valueColumn?: GroupByValueColumnName;
};

export type LineChartTab = GraphTabBase & {
    type: 'Line Chart';
    period?: 'day' | 'month' | 'year';
    column?: NominalColumnName | 'None';
};

export type MapTab = GraphTabBase & {
    type: 'Map';
};

export type EmptyTab = GraphTabBase & { type: '' };

export type GraphTab = PieChartTab | BarChartTab | MapTab | LineChartTab | EmptyTab;
export type GraphTabType = GraphTab['type'];

export const graphTabTypes: GraphTabType[] = ['Pie Chart', 'Bar Chart', 'Line Chart', 'Map'];
