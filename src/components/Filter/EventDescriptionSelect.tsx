import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { EventDescriptionFilter } from "../../types/FilterValue";
import { EventDescription, eventDescriptionValues } from "../../types/DataSetInfo";

export function EventDescriptionSelect(props: EventDescriptionProps) {
  const { filterValue, setFilterValue } = props;
  const { eventDescriptions } = filterValue;

  const handleChange = (event: SelectChangeEvent<EventDescription[]>) => {
    const value = event.target.value as EventDescription[];
    setFilterValue({ type: "Event Description", eventDescriptions: value });
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel>Event Type</InputLabel>
        <Select
          multiple
          label="Event Type"
          value={eventDescriptions}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {eventDescriptionValues.map((eventDescription) => (
            <MenuItem
              key={eventDescription}
              value={eventDescription}
            >
              {eventDescription}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export type EventDescriptionProps = {
  filterValue: EventDescriptionFilter,
  setFilterValue: (filterValue: EventDescriptionFilter) => void,
}
