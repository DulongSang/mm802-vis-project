import { useState } from 'react';
import { Button, Divider } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { FilterItem } from './FilterItem';
import { filterData } from '../../utils/processData';
import { FilterValue } from '../../types/FilterValue';
import { FireResponseDataRow } from '../../types/DataSetInfo';

export function FilterSidebar(props: FilterSidebarProps) {
  const { data, setFilteredData } = props;
  const [filterValues, setFilterValues] = useState<FilterValue[]>([]);

  const addFilter = () => {
    setFilterValues([...filterValues, { type: "" }]);
  };
  const clearFilters = () => {
    setFilterValues([]);
    setFilteredData(data);
  };
  const applyFilters = () => {
    setFilteredData(filterData(data, filterValues));
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', height: '100%' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>Filters</div>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, overflowY: 'auto', maxHeight: '66vh' /* workaround */ }}>
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
        <Button
          variant="contained"
          style={{ backgroundColor: '#52c400' }}
          onClick={applyFilters}
        >
          Apply filters
        </Button>
      </div>
    </div>
  );
}

export type FilterSidebarProps = {
  data: FireResponseDataRow[],
  setFilteredData: React.Dispatch<React.SetStateAction<FireResponseDataRow[]>>,
};
