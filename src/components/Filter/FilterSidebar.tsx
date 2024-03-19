import { useState } from 'react';

import { Button, Divider } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { FilterItem } from './FilterItem';

import { FilterValue } from '../../types/FilterValue';

export function FilterSidebar() {
  const [filterValues, setFilterValues] = useState<FilterValue[]>([]);

  const addFilter = () => {
    setFilterValues([...filterValues, { type: "" }]);
  };

  const clearFilters = () => setFilterValues([]);

  return (
    <div style={{ height: '100%', backgroundColor: '#cfcfcf', borderRadius: '10px', margin: '0 10px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>Filters</div>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {filterValues.map((filterValue, index) => (<FilterItem key={index} setFilterValues={setFilterValues} filterValues={filterValues} index={index} />))}
      </ul>
      <div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addFilter}>
          Add condition
        </Button>
      </div>
      <Divider style={{ margin: '10px 0'}} />
      <div style={{ textAlign: 'right', marginRight: '10px' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#ced4da', color: 'black', marginRight: '10px' }}
          onClick={clearFilters}
        >
          Clear filters
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#52c400' }}>
          Apply filters
        </Button>
      </div>
    </div>
  );
}
