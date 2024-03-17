import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select"

import { GraphTab, PieChartTab, graphTabTypes } from "../../types/GraphTab";
import { columnNames } from "../../types/DataSetInfo";

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
    setGraphTab({ ...graphTab, type: event.target.value as GraphTab['type'] });
  });

  const graphOptions = (() => {
    switch (graphTab.type) {
      case "Pie Chart":
        return (
          <>
            {getSelectComponent("Group By", columnNames, graphTab.groupByColumn ?? "", (event) => {
              setGraphTab({ ...graphTab, groupByColumn: event.target.value as PieChartTab['groupByColumn'] });
            })}
            {getSelectComponent("Value", columnNames, graphTab.valueColumn ?? "", (event) => {
              setGraphTab({ ...graphTab, valueColumn: event.target.value as PieChartTab['valueColumn'] });
            })}
          </>
        );
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
