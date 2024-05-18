import React from 'react';
import PieChart from './components/PieChart';
import AgeChart from './components/AgeChart';
import './App.css';


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="charts">
        <div className="chart">
          <h2>House Distribution</h2>
          <PieChart />
        </div>
        <div className="chart">
          <h2>Age Distribution</h2>
          <AgeChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
