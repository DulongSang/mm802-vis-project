import { PieChart } from '@mui/x-charts';

import { PieChartTab } from '../../types/GraphTab';
import { groupData } from '../../utils/processData';
import { FireResponseDataRow } from '../../types/DataSetInfo';

export function PieChartGraph(props: PieChartGraphProps) {
  const { data, graphTab } = props;

  if (!graphTab.groupAggOp || !graphTab.groupByColumn || (graphTab.groupAggOp !== 'count' && !graphTab.valueColumn)) {
    return (<></>);
  }

  const grouped = groupData(data, graphTab.groupAggOp, graphTab.groupByColumn, graphTab.valueColumn);

  return (
    <div style={{ flex: 1, padding: '12px' }}>
      <PieChart
        height={600}
        series={[{
          data: grouped,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { additionalRadius: -10, color: 'gray' },
        }]}
      />
    </div>
  
  );
}

export type PieChartGraphProps = {
  data: FireResponseDataRow[],
  graphTab: PieChartTab,
}
