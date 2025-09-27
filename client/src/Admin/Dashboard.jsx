import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';

export default function Dashboard() {
  const [pendingEvents, setPendingEvents] = useState(null);
  const [approvedBookings, setApprovedBookings] = useState(null);
  const [finishedBookings, setFinishedBookings] = useState(null);
  const [totalSignIns, setTotalSignIns] = useState(null);
  const [filter, setFilter] = useState('thisMonth');

  // Helper to get start date based on filter
  function getStartDate(filter) {
    const now = new Date();
    switch (filter) {
      case 'thisWeek': {
        // Start of this week (Sunday)
        const day = now.getDay();
        const diff = now.getDate() - day;
        return new Date(now.getFullYear(), now.getMonth(), diff);
      }
      case 'thisMonth':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'this6Months': {
        // Start of the 6-month period (from start of current month minus 5 months)
        const month = now.getMonth();
        const year = now.getFullYear();
        let startMonth = month - 5;
        let startYear = year;
        if (startMonth < 0) {
          startMonth += 12;
          startYear -= 1;
        }
        return new Date(startYear, startMonth, 1);
      }
      case 'thisYear':
        return new Date(now.getFullYear(), 0, 1);
      default:
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
  }

  useEffect(() => {
    // Fetch pending events
    fetch('http://localhost:5051/api/bookings/pending')
      .then(res => res.json())
      .then(data => {
        const startDate = getStartDate(filter);
        const count = data.filter(ev => {
          if (!ev.date) return false;
          const d = new Date(ev.date);
          return d >= startDate;
        }).length;
        setPendingEvents(count);
      })
      .catch(() => setPendingEvents(0));

    // Fetch approved bookings
    fetch('http://localhost:5051/api/bookings/approved')
      .then(res => res.json())
      .then(data => {
        const startDate = getStartDate(filter);
        const count = data.filter(ev => {
          if (!ev.date) return false;
          const d = new Date(ev.date);
          return d >= startDate;
        }).length;
        setApprovedBookings(count);
      })
      .catch(() => setApprovedBookings(0));

    // Fetch finished bookings
    fetch('http://localhost:5051/api/bookings/finished')
      .then(res => res.json())
      .then(data => {
        const startDate = getStartDate(filter);
        const count = data.filter(ev => {
          if (!ev.date) return false;
          const d = new Date(ev.date);
          return d >= startDate;
        }).length;
        setFinishedBookings(count);
      })
      .catch(() => setFinishedBookings(0));

    // Fetch total sign-ins (same logic as before)
    fetch('http://localhost:5051/api/customers')
      .then(res => res.json())
      .then(data => {
        const startDate = getStartDate(filter);
        const count = data.filter(c => {
          if (!c.createdAt) return false;
          const d = new Date(c.createdAt);
          return d >= startDate;
        }).length;
        setTotalSignIns(count);
      })
      .catch(() => setTotalSignIns(0));
  }, [filter]);

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 18 }}>
          <label style={{ fontWeight: 500, marginRight: 8 }}>Show:</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ccc', fontSize: '1rem', color: '#222', background: '#fff', outline: 'none', boxShadow: 'none' }}
          >
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="this6Months">This 6 Months</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
        <div className="admin-dashboard-cards-row">
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Pending bookings <span>| {filter === 'thisWeek' ? 'this week' : filter === 'thisMonth' ? 'this month' : filter === 'this6Months' ? 'this 6 months' : 'this year'}</span></div>
            <div className="admin-dashboard-card-value">{pendingEvents !== null ? pendingEvents : '-'}</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Approved bookings <span>| {filter === 'thisWeek' ? 'this week' : filter === 'thisMonth' ? 'this month' : filter === 'this6Months' ? 'this 6 months' : 'this year'}</span></div>
            <div className="admin-dashboard-card-value">{approvedBookings !== null ? approvedBookings : '-'}</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Finished bookings <span>| {filter === 'thisWeek' ? 'this week' : filter === 'thisMonth' ? 'this month' : filter === 'this6Months' ? 'this 6 months' : 'this year'}</span></div>
            <div className="admin-dashboard-card-value">{finishedBookings !== null ? finishedBookings : '-'}</div>
          </div>
        </div>
        <div className="admin-dashboard-cards-row" style={{ marginTop: 16 }}>
          <div className="admin-dashboard-card" style={{ width: '100%' }}>
            <div className="admin-dashboard-card-title">Total Sign-ins <span>| {filter === 'thisWeek' ? 'this week' : filter === 'thisMonth' ? 'this month' : filter === 'this6Months' ? 'this 6 months' : 'this year'}</span></div>
            <div className="admin-dashboard-card-value">{totalSignIns !== null ? totalSignIns : '-'}</div>
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
