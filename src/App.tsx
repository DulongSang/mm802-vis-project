import React from 'react';
import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { GraphContainer } from './components/GraphContainer';
import { FilterSidebar } from './components/Filter/FilterSidebar';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <h1>Visualization of Fire Response in Edmonton</h1>
      <div style={{ display: 'flex', height: '90vh' }}>
        <GraphContainer />
        <FilterSidebar />
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
