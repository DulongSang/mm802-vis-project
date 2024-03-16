import { Select, MenuItem, InputLabel, FormControl, IconButton, SelectChangeEvent } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { DateRangeSelect } from "./DateRangeSelect";
import { DayOfWeekSelect } from "./DayOfWeekSelect";
import { FilterValue, newFilterValue, filterTypes } from "../../types/FilterValue";

export function FilterItem(props: FilterItemProps) {
  const { setFilterValues, filterValues, index } = props;
  const filterValue = filterValues[index];
  const setFilterValue = (filterValue: FilterValue) => {
    setFilterValues([...filterValues.slice(0, index), filterValue, ...filterValues.slice(index + 1)]);
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    const filterType = event.target.value as FilterValue["type"];
    if (filterType === filterValue.type) {
      return;
    }
    setFilterValue(newFilterValue(filterType));
  };

  const getFilterComponent = (filterValue: FilterValue) => {
    switch (filterValue.type) {
      case "Date Range":
        return <DateRangeSelect setFilterValue={setFilterValue} filterValue={filterValue} />;
      case "Day of Week":
        return <DayOfWeekSelect setFilterValue={setFilterValue} filterValue={filterValue} />;
      default:
        return <div>Error: Unknown Filter Type</div>;
    }
  };

  const handleRemoveFilter = () => {
    setFilterValues(filterValues.filter((_, i) => i !== index));
    console.log(filterValues);
  };

  return (
    <li style={{ marginBottom: '30px' }}>
      <div style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '12px' }}>Filter {index}</div>
      <div style={{ display: 'flex'}}>
        <div style={{ flex: 1, marginRight: '6px' }}>
          <div>
            <FormControl fullWidth>
              <InputLabel>Filter Type</InputLabel>
              <Select
                label="Filter Type"
                value={filterValue.type}
                onChange={handleConditionChange}
              >
                <MenuItem value=""><em>Select ...</em></MenuItem>
                {filterTypes.map((filterType) => <MenuItem value={filterType} key={filterType}>{filterType}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          {filterValue.type !== "" ? (<div style={{marginTop: '10px' }}>{getFilterComponent(filterValue)}</div>) : <></>}
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <IconButton aria-label="delete" onClick={handleRemoveFilter}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
}

export type FilterItemProps = {
  setFilterValues: (filterValues: FilterValue[]) => void,
  filterValues: FilterValue[],
  index: number,
};
