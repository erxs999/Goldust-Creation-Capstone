import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';

export default function Dashboard() {
  // Months for chart labels
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  // Helper to get filter label for cards
  function getFilterLabel(filter) {
    switch (filter) {
      case 'thisWeek': return '| this week';
      case 'thisMonth': return '| this month';
      case 'this6Months': return '| this 6 months';
      case 'thisYear': return '| this year';
      default: return '';
    }
  }
  const [pendingEvents, setPendingEvents] = useState(null);
  const [approvedBookings, setApprovedBookings] = useState(null);
  const [finishedBookings, setFinishedBookings] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [totalSuppliers, setTotalSuppliers] = useState(null);
  const [filter, setFilter] = useState('thisMonth');
  const [revenueData, setRevenueData] = useState([]);
  const [urgentReminders, setUrgentReminders] = useState(0);

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
    // Fetch urgent reminders (schedules due today or tomorrow)
    fetch('http://localhost:5051/api/schedules')
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const count = data.filter(sch => {
          if (!sch.date) return false;
          // sch.date is expected to be 'YYYY-MM-DD'
          const [year, month, day] = sch.date.split('-').map(Number);
          const schedDate = new Date(year, month - 1, day);
          schedDate.setHours(0,0,0,0);
          return schedDate.getTime() === today.getTime() || schedDate.getTime() === tomorrow.getTime();
        }).length;
        setUrgentReminders(count);
      })
      .catch(() => setUrgentReminders(0));
    // Fetch revenue data (monthly, filtered)
    fetch(`http://localhost:5051/api/revenue?filter=${filter}`)
      .then(res => res.json())
      .then(data => {
        // data should be an array of { month: 0-11, value: number }
        setRevenueData(data);
      })
      .catch(() => setRevenueData([]));
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

    // Fetch total customers (filtered by date)
    fetch('http://localhost:5051/api/customers')
      .then(res => res.json())
      .then(data => {
        const startDate = getStartDate(filter);
        const count = data.filter(c => {
          if (!c.createdAt) return false;
          const d = new Date(c.createdAt);
          return d >= startDate;
        }).length;
        setTotalCustomers(count);
      })
      .catch(() => setTotalCustomers(0));

    // Fetch total suppliers (filtered by date)
    fetch('http://localhost:5051/api/suppliers')
      .then(res => res.json())
      .then(data => {
        const startDate = getStartDate(filter);
        const count = data.filter(s => {
          if (!s.createdAt) return false;
          const d = new Date(s.createdAt);
          return d >= startDate;
        }).length;
        setTotalSuppliers(count);
      })
      .catch(() => setTotalSuppliers(0));
  }, [filter]);

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </div>
        <div className="admin-dashboard-cards-row" style={{ marginTop: 16 }}>
          <div className="admin-dashboard-card" style={{ background: 'linear-gradient(90deg, #f43f5e 60%, #f59e42 100%)', color: '#fff' }}>
            <div className="admin-dashboard-card-title" style={{ color: '#fff', fontWeight: 700 }}>Urgent Reminders <span style={{ color: '#fff', fontWeight: 400 }}>| due today or tomorrow</span></div>
            <div className="admin-dashboard-card-value" style={{ color: '#fff' }}>{urgentReminders}</div>
          </div>
        </div>
        <div className="admin-dashboard-cards-row">
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Pending bookings <span style={{ color: '#888', fontWeight: 400 }}>{getFilterLabel(filter)}</span></div>
            <div className="admin-dashboard-card-value">{pendingEvents !== null ? pendingEvents : '-'}</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Approved bookings <span style={{ color: '#888', fontWeight: 400 }}>{getFilterLabel(filter)}</span></div>
            <div className="admin-dashboard-card-value">{approvedBookings !== null ? approvedBookings : '-'}</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Finished bookings <span style={{ color: '#888', fontWeight: 400 }}>{getFilterLabel(filter)}</span></div>
            <div className="admin-dashboard-card-value">{finishedBookings !== null ? finishedBookings : '-'}</div>
          </div>
        </div>
        <div className="admin-dashboard-cards-row" style={{ marginTop: 16 }}>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Total Customers <span style={{ color: '#888', fontWeight: 400 }}>{getFilterLabel(filter)}</span></div>
            <div className="admin-dashboard-card-value">{totalCustomers !== null ? totalCustomers : '-'}</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-title">Total Suppliers <span style={{ color: '#888', fontWeight: 400 }}>{getFilterLabel(filter)}</span></div>
            <div className="admin-dashboard-card-value">{totalSuppliers !== null ? totalSuppliers : '-'}</div>
          </div>
        </div>
        
        <div className="admin-dashboard-revenue-card">
          <div className="admin-dashboard-card-title">Revenue <span style={{ color: '#888', fontWeight: 400 }}>{getFilterLabel(filter)}</span></div>
          <div className="admin-dashboard-revenue-chart">
            {/* Functional SVG line chart for revenue */}
            <svg width="100%" height="140" viewBox="0 0 400 140">
              {/* Calculate points for polyline */}
              {(() => {
                if (!revenueData || revenueData.length === 0) return null;
                // Normalize values for chart height
                const maxValue = Math.max(...revenueData.map(d => d.value), 1);
                const points = revenueData.map((d, i) => {
                  const x = i * (400 / (months.length - 1));
                  const y = 120 - (d.value / maxValue) * 100;
                  return `${x},${y}`;
                }).join(' ');
                return <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={points} />;
              })()}
              {/* Month labels */}
              <g fontSize="10" fill="#888">
                {months.map((m, i) => (
                  <text key={m} x={i * (400 / (months.length - 1))} y="135">{m}</text>
                ))}
              </g>
            </svg>
            {(!revenueData || revenueData.length === 0) && (
              <div style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>No revenue data available.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
