import { PieChart } from '@mui/x-charts';

import { PieChartTab } from '../../types/GraphTab';
import { FireResponseDataRow } from '../../types/DataSetInfo';
import { groupData } from '../../utils/processData';

export function PieChartGraph(props: PieChartGraphProps) {
  const { data, graphTab } = props;

  if (!graphTab.groupAggOp || !graphTab.groupByColumn || (graphTab.groupAggOp !== 'count' && !graphTab.valueColumn)) {
    return (<></>);
  }

  const grouped = groupData(data, graphTab.groupAggOp, graphTab.groupByColumn, graphTab.valueColumn);

  return (
    <PieChart
      height={800}
      series={[{
        data: grouped,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { additionalRadius: -10, color: 'gray' },
      }]}
    />
  );
}

export type PieChartGraphProps = {
  data: FireResponseDataRow[],
  graphTab: PieChartTab,
}
