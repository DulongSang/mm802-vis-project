import React, { useState } from 'react';
import './App.css';

import { Grid } from '@mui/material';
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
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'linear-gradient(#f2e3f8, #dcebfd, #def5ee)' }}>
      <h1 style={{ fontSize: '56px' }}>📈Visualization of Fire Response in Edmonton🔥</h1>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 4 }}>
          <GraphContainer data={filteredData} />
        </div>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <UploadFileBox setData={setData} setFilteredData={setFilteredData} />
            </Grid>
            <Grid item style={{ overflow: 'auto' }}>
              <FilterSidebar data={data} setFilteredData={setFilteredData} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
