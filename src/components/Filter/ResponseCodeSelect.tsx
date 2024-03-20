import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { ResponseCodeFilter } from "../../types/FilterValue";
import { ResponseCode, responseCodeValues } from "../../types/DataSetInfo";

export function ResponseCodeSelect(props: ResponseCodeProps) {
  const { filterValue, setFilterValue } = props;
  const { responseCodes } = filterValue;

  const handleChange = (event: SelectChangeEvent<ResponseCode[]>) => {
    const value = event.target.value as ResponseCode[];
    setFilterValue({ type: "Response Code", responseCodes: value });
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>Response Code</InputLabel>
        <Select
          multiple
          label="Response Code"
          value={responseCodes}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {responseCodeValues.map((responseCode) => (
            <MenuItem
              key={responseCode}
              value={responseCode}
            >
              {responseCode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export type ResponseCodeProps = {
  filterValue: ResponseCodeFilter,
  setFilterValue: (filterValue: ResponseCodeFilter) => void,
}
