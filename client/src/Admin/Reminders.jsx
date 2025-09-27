import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Sidebar from './Sidebar';
import './reminders.css';

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="reminder-modal-overlay">
      <div className="reminder-modal">
        <button className="reminder-modal-close" onClick={onClose} aria-label="Close">×</button>
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
          <div className="reminders-header">
            <h2>Reminders</h2>
            <div className="reminders-header-controls">
              <label className="reminders-filter-label">Show:</label>
              <select
                className="reminders-filter-select"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="1week">1 Week</option>
                <option value="2week">2 Weeks</option>
                <option value="1month">1 Month</option>
              </select>
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
                    className={`reminder-card${isDueSoon ? ' reminder-card-due-soon' : ''}`}
                    onClick={() => { setSelectedReminder(reminder); setModalOpen(true); }}
                    title="Click to view details"
                  >
                    <div className="reminder-card-title">{reminder.title}</div>
                    <div className="reminder-card-date">Due: {reminder.date}</div>
                    {isDueSoon && (
                      <div className="reminder-card-due-label">{dueLabel}</div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            {selectedReminder && (
              <div className="reminder-modal-details">
                <h2 className="reminder-modal-title">{selectedReminder.title}</h2>
                <div className="reminder-modal-row"><span className="reminder-modal-label">Type:</span> <span className="reminder-modal-value">{selectedReminder.type}</span></div>
                <div className="reminder-modal-row"><span className="reminder-modal-label">{selectedReminder.type} Name:</span> <span className="reminder-modal-value">{selectedReminder.person}</span></div>
                <div className="reminder-modal-row"><span className="reminder-modal-label">Date:</span> <span className="reminder-modal-value">{selectedReminder.date}</span></div>
                <div className="reminder-modal-row"><span className="reminder-modal-label">Location:</span> <span className="reminder-modal-value">{selectedReminder.location}</span></div>
                <div className="reminder-modal-row"><span className="reminder-modal-label">Description:</span> <span className="reminder-modal-value">{selectedReminder.description}</span></div>
              </div>
            )}
          </Modal>
        </div>
      </main>
    </div>
  );
}
