import React from 'react';
import Sidebar from './Sidebar';
import './reminders.css';

export default function Reminders() {
  // Temporary reminders data
  const reminders = [
    { id: 1, title: 'Call supplier for cake order', due: '2025-08-05' },
    { id: 2, title: 'Send invitations to clients', due: '2025-08-10' },
    { id: 3, title: 'Confirm venue booking', due: '2025-08-12' },
    { id: 4, title: 'Follow up with photographer', due: '2025-08-15' },
  ];
  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-reminders-root">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>Reminders</h2>
            <button
              style={{
                background: 'linear-gradient(90deg, #e6b800 0%, #ffbe2e 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '7px',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.45rem 1.2rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px 0 rgba(230, 184, 0, 0.10)',
                marginLeft: 16
              }}
              onClick={() => alert('Add Reminder clicked!')}
            >
              Add Reminder
            </button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
            {reminders.map(reminder => (
                <li key={reminder.id} style={{ background: 'linear-gradient(90deg, #e6b800 0%, #ffbe2e 100%)', border: 'none', borderRadius: 8, padding: '16px 20px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 500, fontSize: 18, color: '#ffffffff' }}>{reminder.title}</div>
                <div style={{ color: '#ffffffff', fontSize: 14, marginTop: 4 }}>Due: {reminder.due}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
