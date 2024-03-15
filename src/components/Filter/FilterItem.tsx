import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export function FilterItem() {
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel>Condition</InputLabel>
      <Select
        label="Condition"
      >
        <MenuItem value="">
          <em>Select ...</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
