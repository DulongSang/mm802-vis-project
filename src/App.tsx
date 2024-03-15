import React from 'react';
import './App.css';

import { GraphContainer } from './components/GraphContainer';
import { FilterSidebar } from './components/Filter/FilterSidebar';

function App() {
  return (
    <div className="App">
      <h1>Visualization of Fire Response in Edmonton</h1>
      <div style={{ display: 'flex', height: '90vh' }}>
        <GraphContainer />
        <FilterSidebar />
      </div>
    </div>
  );
}

export default App;
