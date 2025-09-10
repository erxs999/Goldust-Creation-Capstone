
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './calendars.css';

import { Calendar as RsuiteCalendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';



export default function Calendars() {
  // RSuite Calendar selected date
  const [selectedDate, setSelectedDate] = useState(new Date());



  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-calendars-root">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
            <h2 style={{ color: '#111', marginBottom: 0 }}>Calendars</h2>
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
              onClick={() => alert('Button clicked!')}
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
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
