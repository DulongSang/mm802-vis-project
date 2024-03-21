import { LineChart } from '@mui/x-charts'

import { LineChartTab } from '../../types/GraphTab';
import { FireResponseDataRow } from '../../types/DataSetInfo';
import { lineChartGroupData } from '../../utils/processData';

export function LineChartGraph(props: LineChartGraphProps) {
  const { data, graphTab } = props;

  if (!graphTab.period || !graphTab.column) {
    return <></>;
  }
  const { series, xAxis } = lineChartGroupData(data, graphTab.period, graphTab.column);

  return (
    <LineChart
      height={800}
      series={series}
      xAxis={xAxis}
    />
  );
}

export type LineChartGraphProps = {
  data: FireResponseDataRow[],
  graphTab: LineChartTab,
};
