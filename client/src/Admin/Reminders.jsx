import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Sidebar from './Sidebar';
import './reminders.css';

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 36, minWidth: 340, maxWidth: 480, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 22,
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#888',
            lineHeight: 1,
            padding: 0,
            fontWeight: 700
          }}
          aria-label="Close"
        >×</button>
        {children}
      </div>
    </div>
  );
}

export default function Reminders() {
  // Reminders are fetched from schedules backend
  const [reminders, setReminders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchReminders() {
      try {
        const res = await fetch('/api/schedules');
        if (!res.ok) throw new Error('Failed to fetch schedules');
        const data = await res.json();
        setReminders(Array.isArray(data) ? data : []);
      } catch (err) {
        setReminders([]);
      }
    }
    fetchReminders();
  }, []);
  // Filter reminders by duration
  const getFilteredReminders = () => {
    let filtered = reminders;
    if (filter !== 'all') {
      const now = new Date();
      now.setHours(0,0,0,0); // normalize to midnight
      let endDate;
      if (filter === '1week') {
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
      } else if (filter === '2week') {
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
      } else if (filter === '1month') {
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
      }
      filtered = reminders.filter(reminder => {
        if (!reminder.date) return false;
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(0,0,0,0); // normalize to midnight
        return reminderDate >= now && reminderDate <= endDate;
      });
    }
    // Sort by soonest date first
    return filtered.slice().sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-reminders-root">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>Reminders</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ fontWeight: 500, fontSize: '1rem', color: '#222', marginRight: 8 }}>Show:</label>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  color: '#222',
                  background: '#fff',
                  marginRight: 8,
                  outline: 'none',
                  boxShadow: 'none'
                }}
              >
                <option value="all">All</option>
                <option value="1week">1 Week</option>
                <option value="2week">2 Weeks</option>
                <option value="1month">1 Month</option>
              </select>
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
                  marginLeft: 0
                }}
                onClick={() => alert('Add Reminder clicked!')}
              >
                Add Reminder
              </button>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
            {getFilteredReminders().length === 0 ? (
              <li style={{ color: '#888', fontSize: 16, textAlign: 'center', marginTop: 18 }}>No reminders found.</li>
            ) : (
              getFilteredReminders().map(reminder => {
                // Calculate if due today or tomorrow
                let dueLabel = '';
                let isDueSoon = false;
                if (reminder.date) {
                  const today = new Date();
                  today.setHours(0,0,0,0);
                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1);
                  const reminderDate = new Date(reminder.date);
                  reminderDate.setHours(0,0,0,0);
                  if (reminderDate.getTime() === today.getTime()) {
                    isDueSoon = true;
                    dueLabel = 'Due Today';
                  } else if (reminderDate.getTime() === tomorrow.getTime()) {
                    isDueSoon = true;
                    dueLabel = 'Due Tomorrow';
                  }
                }
                return (
                  <li
                    key={reminder._id}
                    style={{
                      background: isDueSoon ? 'linear-gradient(90deg, #ff4d4f 0%, #ffbe2e 100%)' : 'linear-gradient(90deg, #e6b800 0%, #ffbe2e 100%)',
                      border: 'none',
                      borderRadius: 8,
                      padding: '16px 20px',
                      marginBottom: 16,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={() => { setSelectedReminder(reminder); setModalOpen(true); }}
                    title="Click to view details"
                  >
                    <div style={{ fontWeight: 500, fontSize: 18, color: '#ffffffff' }}>{reminder.title}</div>
                    <div style={{ color: '#ffffffff', fontSize: 14, marginTop: 4 }}>Due: {reminder.date}</div>
                    {isDueSoon && (
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        right: 18,
                        background: '#ff4d4f',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 13,
                        padding: '2px 10px',
                        borderRadius: 6,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                      }}>{dueLabel}</div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            {selectedReminder && (
              <div style={{ minWidth: 320, maxWidth: 480, background: '#fff', borderRadius: 16, padding: '18px 24px 18px 24px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
                <h2 style={{ marginTop: 0, marginBottom: 18, fontWeight: 900, fontSize: '2rem', color: '#e6b800', letterSpacing: 1 }}>{selectedReminder.title}</h2>
                <div style={{ marginBottom: 14, fontSize: 18 }}>
                  <span style={{ fontWeight: 700, color: '#e6b800' }}>Type:</span> <span style={{ fontWeight: 500, color: '#222' }}>{selectedReminder.type}</span>
                </div>
                <div style={{ marginBottom: 14, fontSize: 18 }}>
                  <span style={{ fontWeight: 700, color: '#e6b800' }}>{selectedReminder.type} Name:</span> <span style={{ fontWeight: 500, color: '#222' }}>{selectedReminder.person}</span>
                </div>
                <div style={{ marginBottom: 14, fontSize: 18 }}>
                  <span style={{ fontWeight: 700, color: '#e6b800' }}>Date:</span> <span style={{ fontWeight: 500, color: '#222' }}>{selectedReminder.date}</span>
                </div>
                <div style={{ marginBottom: 14, fontSize: 18 }}>
                  <span style={{ fontWeight: 700, color: '#e6b800' }}>Location:</span> <span style={{ fontWeight: 500, color: '#222' }}>{selectedReminder.location}</span>
                </div>
                <div style={{ marginBottom: 0, fontSize: 18 }}>
                  <span style={{ fontWeight: 700, color: '#e6b800' }}>Description:</span> <span style={{ fontWeight: 500, color: '#222' }}>{selectedReminder.description}</span>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </main>
    </div>
  );
}
