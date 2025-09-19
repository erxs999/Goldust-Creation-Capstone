
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './calendars.css';

import { Calendar as RsuiteCalendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

// Simple modal component
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 350, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 22,
            background: 'none',
            border: 'none',
            fontSize: 18,
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



export default function Calendars() {
  // RSuite Calendar selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  // For viewing events modal
  const [viewEventsModalOpen, setViewEventsModalOpen] = useState(false);
  const [viewEventsDate, setViewEventsDate] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: '',
    type: 'Supplier',
    person: '',
    date: new Date().toISOString().slice(0, 10),
    location: '',
    description: ''
  });

  // Load events from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('calendarEvents');
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  // Save events to localStorage when changed
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Add event handler
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = { ...form, id: Date.now() };
    setEvents([...events, newEvent]);
    setModalOpen(false);
    setForm({ title: '', type: 'Supplier', person: '', date: new Date().toISOString().slice(0, 10), location: '', description: '' });
  };

  // Get events for a specific date (compare as string)
  const getEventsForDate = (date) => {
    // date can be Date or string
    let d;
    if (typeof date === 'string') {
      d = date;
    } else {
      // Use local date string, not UTC
      d = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }
    return events.filter(ev => ev.date === d);
  };

  // Custom render cell for calendar with double-click
  const renderCell = (date) => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length === 0) return null;
    const maxToShow = 3;
    return (
      <div
        style={{ marginTop: 4, cursor: 'pointer' }}
        onDoubleClick={e => {
          e.stopPropagation();
          setViewEventsDate(date);
          setViewEventsModalOpen(true);
        }}
        title="Double-click to view events"
      >
        {dayEvents.length > maxToShow
          ? ([
              ...dayEvents.slice(0, maxToShow).map(ev => (
                <div key={ev.id} style={{ background: '#ffe082', color: '#111', borderRadius: 4, padding: '2px 6px', fontSize: 11, marginBottom: 2 }}>
                  {ev.title}
                </div>
              )),
              <div key="plus-sign" style={{ background: '#ffe082', color: '#111', borderRadius: 4, padding: '2px 6px', fontSize: 11, marginBottom: 2, textAlign: 'center', fontWeight: 700 }}>
                +
              </div>
            ])
          : dayEvents.map(ev => (
              <div key={ev.id} style={{ background: '#ffe082', color: '#111', borderRadius: 4, padding: '2px 6px', fontSize: 11, marginBottom: 2 }}>
                {ev.title}
              </div>
            ))}
      </div>
    );
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-calendars-root">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
            <h2 style={{ color: '#111', marginBottom: 0 }}>Calendar of Event</h2>
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
              onClick={() => setModalOpen(true)}
            >
              Add Event
            </button>
          </div>
          <div
            style={{
              height: 560,
              background: '#fff',
              borderRadius: 12,
              marginTop: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              color: '#111',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, width: '100%', height: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <RsuiteCalendar
                value={selectedDate}
                onChange={setSelectedDate}
                bordered
                style={{ width: '100%', height: '100%', minHeight: 0, background: '#fff', color: '#111' }}
                renderCell={renderCell}
              />
            </div>
          </div>
          {/* Modal for adding event */}
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <h3 style={{ marginTop: 0 }}>Add Event / Meeting</h3>
            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label>
                Title:
                <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ width: '100%', padding: 6, marginTop: 2, background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4 }} />
              </label>
              <label>
                Type:
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ width: '100%', padding: 6, marginTop: 2, background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4 }}>
                  <option>Supplier</option>
                  <option>Customer</option>
                </select>
              </label>
              <label>
                {form.type} Name:
                <input type="text" required value={form.person} onChange={e => setForm(f => ({ ...f, person: e.target.value }))} style={{ width: '100%', padding: 6, marginTop: 2, background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4 }} />
              </label>
              <label>
                Location:
                <input type="text" required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={{ width: '100%', padding: 6, marginTop: 2, background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4 }} />
              </label>
              <label>
                Date:
                <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ width: '100%', padding: 6, marginTop: 2, background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4 }} />
              </label>
              <label>
                Description:
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ width: '100%', padding: 6, marginTop: 2, background: '#fff', color: '#111', border: '1px solid #ccc', borderRadius: 4 }} />
              </label>
              <button type="submit" style={{ background: 'linear-gradient(90deg, #e6b800 0%, #ffbe2e 100%)', color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: '1rem', padding: '0.45rem 1.2rem', cursor: 'pointer', marginTop: 8 }}>Set Schedule</button>
            </form>
          </Modal>
          {/* Modal for viewing events on a day */}
          <Modal open={viewEventsModalOpen} onClose={() => setViewEventsModalOpen(false)}>
            <h2 style={{ marginTop: 0, marginBottom: 14, fontWeight: 800, fontSize: '1.25rem', color: '#222', letterSpacing: 1 }}>
              Schedule for {viewEventsDate ? (typeof viewEventsDate === 'string' ? viewEventsDate : `${viewEventsDate.getFullYear()}-${String(viewEventsDate.getMonth()+1).padStart(2,'0')}-${String(viewEventsDate.getDate()).padStart(2,'0')}`) : ''}
            </h2>
            <div style={{ minHeight: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {viewEventsDate && getEventsForDate(viewEventsDate).length > 0 ? (
                getEventsForDate(viewEventsDate).map(ev => (
                  <div key={ev.id} style={{
                    background: '#ffe082',
                    color: '#111',
                    borderRadius: 6,
                    padding: '8px 12px',
                    fontSize: 13,
                    marginBottom: 0,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    fontWeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 340
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{ev.title}</div>
                    <div style={{ color: '#555', fontSize: 12, marginBottom: 2 }}>
                      {ev.type}: <span style={{ fontWeight: 600 }}>{ev.person}</span>
                    </div>
                    <div style={{ color: '#888', fontSize: 12 }}>{ev.location}</div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#888', fontSize: 14, textAlign: 'center', marginTop: 18 }}>No schedule for this day.</div>
              )}
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}
