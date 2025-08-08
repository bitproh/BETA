import React from 'react';
import Patientlanding from './components/patientlanding.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Patientlanding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;