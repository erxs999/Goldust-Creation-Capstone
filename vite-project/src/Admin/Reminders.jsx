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
          <h2>Reminders</h2>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
            {reminders.map(reminder => (
              <li key={reminder.id} style={{ background: '#73ba76ff', border: 'none', borderRadius: 8, padding: '16px 20px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 500, fontSize: 18, color: '#fff' }}>{reminder.title}</div>
                <div style={{ color: '#fff', fontSize: 14, marginTop: 4 }}>Due: {reminder.due}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
