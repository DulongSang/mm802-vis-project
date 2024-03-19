import { useState } from "react";
import { Box, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import { Add as AddIcon, Clear as ClearIcon } from "@mui/icons-material";

import { GraphSelection } from "./GraphSelection";
import { MapGraph } from "./MapGraph";
import { PieChartGraph } from "./PieChartGraph";

import { GraphTab } from "../../types/GraphTab";
import { FireResponseDataRow } from "../../types/DataSetInfo";


export function GraphContainer(props: GraphContainerProps) {
  const { dataRef } = props;

  const [tabs, setTabs] = useState<GraphTab[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const addTab = () => {
    setTabs([...tabs, { title: "New Tab", type: "" }]);
    setActiveTab(tabs.length);
  };

  const removeTab = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();  // Prevent tab change
    setTabs(tabs.filter((tab, i) => i !== index));
    if (index === activeTab) {
      setActiveTab(activeTab === 0 ? 0 : activeTab - 1);
    } else if (index < activeTab) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const graphTab: GraphTab | undefined = tabs[activeTab];
  const setGraphTab = (graphTab: GraphTab) => {
    setTabs([...tabs.slice(0, activeTab), graphTab, ...tabs.slice(activeTab + 1)]);
  };

  const graphComponent = (() => {
    if (!graphTab) {
      return <></>;
    }
    switch (graphTab.type) {
      case "Map":
        return <MapGraph />;
      case "Pie Chart":
        return <PieChartGraph dataRef={dataRef} graphTab={graphTab} />;
      default:
        return <></>;
    }
  })();
  
  const tabsComponent = (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.title} iconPosition="end" icon={
            <Tooltip title="Remove Tab">
              <IconButton className=".icon-button" size="small" onClick={(event) => removeTab(event, index)}><ClearIcon fontSize="small" /></IconButton>
            </Tooltip>
          } />
        ))}
      </Tabs>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Add tab">
          <IconButton onClick={addTab}><AddIcon /></IconButton>
        </Tooltip>
      </div>
    </Box>
  );
  const containerComponent = (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {graphTab ? <GraphSelection graphTab={graphTab} setGraphTab={setGraphTab} /> : <></>}
      <div style={{ flex: 1, margin: '12px' }}>{graphComponent}</div>
    </div>
  );

  return (
    <div style={{ height: '100%', border: '3px solid #ccc', borderRadius: '10px', margin: '0 10px', display: 'flex', flexDirection: 'column' }}>
      {tabsComponent}
      {containerComponent}
    </div>
  );
}

export type GraphContainerProps = {
  dataRef: React.MutableRefObject<FireResponseDataRow[]>,
};
