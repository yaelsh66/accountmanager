// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Expense Manager</h1>
      <p>This tool helps you upload and manage your expenses from Excel files.</p>
      <Link to="/Upload">
        <button>Upload Expenses</button>
      </Link>
    </div>
  );
}

export default Home;
