// App.tsx
import React from 'react';
import Header from './components/Header';
import SankeyChart from './components/SankeyChart';
import SankeyEditor from './components/SankeyEditor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="p-4">
        <SankeyChart />
        <SankeyEditor />
      </main>
    </div>
  );
};

export default App;
