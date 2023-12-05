// src/App.tsx

import React from 'react';
import MyTable from './components/MyTable';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', background: '#3498db', padding: '10px' }}>
      <h1 style={{ color: '#fff' }}>SABS Pty Ltd.</h1>
      <MyTable />
    </div>
  );
};

export default App;
