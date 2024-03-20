import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select"

import { GraphTab, PieChartTab, BarChartTab, graphTabTypes } from "../../types/GraphTab";
import { groupByColumnNames, groupByValueColumnNames } from "../../types/DataSetInfo";
import { groupAggOpValues } from "../../utils/processData";

export function GraphSelection(props: GraphSelectionProps) {
  const { graphTab, setGraphTab } = props;

  const getSelectComponent = (label: string, values: readonly string[], value: string, onChange: (event: SelectChangeEvent<string>) => void) => {
    return (
      <FormControl sx={{ minWidth: 180, marginRight: '12px' }}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          value={value}
          onChange={onChange}
        >
          {values.map((value) => <MenuItem value={value} key={value}>{value}</MenuItem>)}
        </Select>
      </FormControl>
    );
  };

  const graphTypeSelect = getSelectComponent("Graph Type", graphTabTypes, graphTab.type, (event) => {
    setGraphTab({ ...graphTab, type: event.target.value as GraphTab['type'], title: event.target.value });
  });

  const graphOptions = (() => {
    switch (graphTab.type) {
      case "Pie Chart":
        return (
          <>
            {getSelectComponent("Aggregation", groupAggOpValues, graphTab.groupAggOp ?? "", (event) => {
              setGraphTab({ ...graphTab, groupAggOp: event.target.value as PieChartTab['groupAggOp'] });
            })}
            {getSelectComponent("Group By", groupByColumnNames, graphTab.groupByColumn ?? "", (event) => {
              setGraphTab({ ...graphTab, groupByColumn: event.target.value as PieChartTab['groupByColumn'] });
            })}
            {graphTab.groupAggOp !== 'count'
              ? (getSelectComponent("Value", groupByValueColumnNames, graphTab.valueColumn ?? "", (event) => {
                  setGraphTab({ ...graphTab, valueColumn: event.target.value as PieChartTab['valueColumn'] });
                }))
              : <></>}
          </>
        );
      case "Bar Chart":
        return (
          <>
            {getSelectComponent("Aggregation", groupAggOpValues, graphTab.groupAggOp ?? "", (event) => {
              setGraphTab({ ...graphTab, groupAggOp: event.target.value as BarChartTab['groupAggOp'] });
            })}
            {getSelectComponent("Group By", groupByColumnNames, graphTab.groupByColumn ?? "", (event) => {
              setGraphTab({ ...graphTab, groupByColumn: event.target.value as BarChartTab['groupByColumn'] });
            })}
            {getSelectComponent("Stack By", (groupByColumnNames as readonly string[]).concat(['None']), graphTab.stackByColumn ?? "", (event) => {
              setGraphTab({ ...graphTab, stackByColumn: event.target.value as BarChartTab['stackByColumn'] });
            })}
            {graphTab.groupAggOp !== 'count'
              ? (getSelectComponent("Value", groupByValueColumnNames, graphTab.valueColumn ?? "", (event) => {
                  setGraphTab({ ...graphTab, valueColumn: event.target.value as BarChartTab['valueColumn'] });
                }))
              : <></>}
          </>
        )
      case "Map":
        return <></>;
      default:
        return <></>;
    }
  })();

  return (
    <div style={{ display: 'flex', margin: '12px' }}>
      {graphTypeSelect}
      {graphOptions}
    </div>
  );
}

export type GraphSelectionProps = {
  graphTab: GraphTab,
  setGraphTab: (graphTab: GraphTab) => void,
};
