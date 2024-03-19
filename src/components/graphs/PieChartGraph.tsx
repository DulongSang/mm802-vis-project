import { PieChart } from '@mui/x-charts';
import { DataFrame } from 'danfojs';

import { PieChartTab } from '../../types/GraphTab';
import { groupData } from '../../utils/processData';

export function PieChartGraph(props: PieChartGraphProps) {
  const { dataRef, graphTab } = props;

  if (!graphTab.groupAggOp || !graphTab.groupByColumn || (graphTab.groupAggOp !== 'count' && !graphTab.valueColumn)) {
    return (<></>);
  }

  const series = groupData(dataRef.current, graphTab.groupAggOp, graphTab.groupByColumn, graphTab.valueColumn);

  return (
    <div style={{ flex: 1, padding: '12px' }}>
      <PieChart
        height={600}
        series={[{
          data: series as any[],
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { additionalRadius: -10, color: 'gray' },
        }]}
      />
    </div>
  
  );
}

export type PieChartGraphProps = {
  dataRef: React.MutableRefObject<DataFrame>,
  graphTab: PieChartTab,
}
