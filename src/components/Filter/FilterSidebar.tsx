import { Button } from '@mui/material';

import { FilterItem } from './FilterItem';

export function FilterSidebar() {
  return (
    <div style={{ flex: 1, backgroundColor: '#cfcfcf', borderRadius: '10px 0 0 10px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left', padding: '10px 0 0 20px' }}>Filters</div>
      <div>
        <FilterItem />
      </div>
      <div>
        <Button variant="contained">
          Add condition
        </Button>
      </div>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <Button variant="contained" style={{ backgroundColor: '#ced4da', color: 'black' }}>
          Clear filters
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" style={{ backgroundColor: '#52c400' }}>
          Apply filters
        </Button>
      </div>
    </div>
  );
}
