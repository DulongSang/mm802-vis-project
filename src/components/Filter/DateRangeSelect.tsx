import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { DateRangeFilter } from "../../types/FilterValue";

export function DateRangeSelect(props: DateRangeSelectProps) {
  const { filterValue, setFilterValue } = props;
  const { fromDate, toDate } = filterValue;

  return (
    <div style={{ display: 'flex' }}>
      <FormControl sx={{ flex: 1 }}>
        <DatePicker
          label="From"
          value={fromDate}
          onChange={(date) => {
            setFilterValue({ ...filterValue, fromDate: date });
          }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </FormControl>
      <p style={{ margin: '0 10px' }}>-</p>
      <FormControl sx={{ flex: 1 }}>
        <DatePicker
          label="To"
          value={toDate}
          onChange={(date) => {
            setFilterValue({ ...filterValue, toDate: date });
          }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </FormControl>
    </div>
  );
}

export type DateRangeSelectProps = {
  filterValue: DateRangeFilter,
  setFilterValue: (filterValue: DateRangeFilter) => void,
}
