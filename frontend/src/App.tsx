import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddAccount from './components/AddAccount';
import DataPage from './components/DataPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add-account" element={<AddAccount />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/" element={<AddAccount />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
