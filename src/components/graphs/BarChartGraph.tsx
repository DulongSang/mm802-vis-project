import { BarChart } from '@mui/x-charts'

import { BarChartTab } from '../../types/GraphTab';
import { FireResponseDataRow } from '../../types/DataSetInfo';
import { barChartGroupData } from '../../utils/processData';

export function BarChartGraph(props: BarChartGraphProps) {
  const { data, graphTab } = props;

  if (!graphTab.groupAggOp || !graphTab.groupByColumn || !graphTab.stackByColumn ||
    (graphTab.groupAggOp !== 'count' && !graphTab.valueColumn)) {
    return (<></>);
  }

  const { series, xAxis } = barChartGroupData(data, graphTab.groupAggOp, graphTab.groupByColumn, graphTab.stackByColumn, graphTab.valueColumn);

  return (
    <BarChart
      height={800}
      series={series}
      xAxis={xAxis}
    />
  );
}

export type BarChartGraphProps = {
  data: FireResponseDataRow[],
  graphTab: BarChartTab,
};
