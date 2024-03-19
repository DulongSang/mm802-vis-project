import React, { useState } from 'react';
import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { GraphContainer } from './components/graphs/GraphContainer';
import { FilterSidebar } from './components/Filter/FilterSidebar';
import { UploadFileBox } from './components/UploadFileBox';
import { FireResponseDataRow } from './types/DataSetInfo';


function App() {
  const [data, setData] = useState<FireResponseDataRow[]>([]);
  const [filteredData, setFilteredData] = useState<FireResponseDataRow[]>([]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1>Visualization of Fire Response in Edmonton</h1>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 4 }}>
          <GraphContainer data={filteredData} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, height: '100%' }}>
              <FilterSidebar data={data} setFilteredData={setFilteredData} />
            </div>
            <div>
              <UploadFileBox setData={setData} setFilteredData={setFilteredData} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
