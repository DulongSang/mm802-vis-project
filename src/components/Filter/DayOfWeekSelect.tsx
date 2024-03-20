import { Button, ButtonGroup } from "@mui/material";

import { DayOfWeekFilter } from "../../types/FilterValue";
import { dayOfWeekValues } from "../../types/DataSetInfo";

const DAY_ABBRS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DayOfWeekSelect(props: DayOfWeekSelectProps) {
  const { filterValue, setFilterValue } = props;
  const { days } = filterValue;

  return (
    <ButtonGroup fullWidth>
      {dayOfWeekValues.map((day, index) => (
        <Button
          key={day}
          variant={days.includes(day) ? "contained" : "outlined"}
          onClick={() => {
            if (days.includes(day)) {
              setFilterValue({ ...filterValue, days: days.filter((d) => d !== day) });
            } else {
              setFilterValue({ ...filterValue, days: [...days, day] });
            }
          }}
        >
          {DAY_ABBRS[index]}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export type DayOfWeekSelectProps = {
  filterValue: DayOfWeekFilter,
  setFilterValue: (filterValue: DayOfWeekFilter) => void,
}
