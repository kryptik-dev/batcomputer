import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BatComputer from '@/pages/BatComputer';

function App() {
  return (
    <div className="App relative z-10">
      <div className="scan-line" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BatComputer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;