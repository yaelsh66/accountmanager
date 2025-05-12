// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Sorting from './components/Sorting';
import CategoriesPage from './components/CategoriesPage';
import Navbar from './components/Navbar';
import SummaryTable from './components/SummaryTable';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/summary" element={<SummaryTable />} /> 
      </Routes>
    </Router>
  );
}

export default App;
