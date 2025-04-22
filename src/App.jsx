import React from 'react';
import Header from './components/Header';
import SankeyChart from './components/SankeyChart';
import CrudPanel from './components/CrudPanel';
import { useSelector } from 'react-redux';

function App() {
  const { nodes, links } = useSelector(state => state.data);
  return (
    <div className="container">
      <Header />
      <div className="crud-panel">
        <CrudPanel />
      </div>
      <div className="sankey-chart">
        <SankeyChart nodes={nodes} links={links} />
      </div>
    </div>
  );
}

export default App;
