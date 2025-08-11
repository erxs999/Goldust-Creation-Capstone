import React from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';

export default function Dashboard() {
  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <h2>Dashboard</h2>
        <div className="admin-dashboard-cards-row">
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Pending event <span>| this month</span></div>
            <div className="admin-dashboard-card-value">3</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Total Customers <span>| this year</span></div>
            <div className="admin-dashboard-card-value">124</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Total Sign-ins <span>| this month</span></div>
            <div className="admin-dashboard-card-value">58</div>
          </div>
        </div>
        <div className="admin-dashboard-revenue-card">
          <div className="admin-dashboard-card-title">Revenue <span>| this month</span></div>
          <div className="admin-dashboard-revenue-chart">
            {/* Simple SVG line chart as a placeholder */}
            <svg width="100%" height="140" viewBox="0 0 400 140">
              <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points="0,120 40,110 80,115 120,100 160,60 200,90 240,50 280,80 320,100 360,120 400,110" />
              <polyline fill="none" stroke="#f43f5e" strokeWidth="2" points="0,110 40,100 80,105 120,90 160,80 200,70 240,100 280,110 320,120 360,130 400,120" />
              <g fontSize="10" fill="#888">
                <text x="0" y="135">JAN</text>
                <text x="40" y="135">FEB</text>
                <text x="80" y="135">MAR</text>
                <text x="120" y="135">APR</text>
                <text x="160" y="135">MAY</text>
                <text x="200" y="135">JUN</text>
                <text x="240" y="135">JUL</text>
                <text x="280" y="135">AUG</text>
                <text x="320" y="135">SEP</text>
                <text x="360" y="135">OCT</text>
                <text x="400" y="135">NOV</text>
              </g>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
