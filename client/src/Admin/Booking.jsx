
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// Simple modal for approve action
function ApproveModal({ open, onClose, onApprove, booking }) {
  const [date, setDate] = useState(null);
  const [desc, setDesc] = useState('');
  React.useEffect(() => {
    if (open) {
      setDate(null); // Always blank for admin to pick
      setDesc('');
    }
  }, [open]);
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 4px 32px rgba(0,0,0,0.18)' }}>
        <h3 style={{ marginTop: 0, marginBottom: 18 }}>Approve Booking</h3>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Appointment Date</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <DatePicker
              selected={date}
              onChange={d => setDate(d)}
              placeholderText="Pick a date"
              dateFormat="yyyy-MM-dd"
              className="custom-datepicker-input"
              calendarClassName="custom-datepicker-calendar"
              popperPlacement="bottom"
              showPopperArrow={false}
              style={{ width: '100%' }}
            />
            <span
              onClick={() => document.querySelector('.custom-datepicker-input')?.focus()}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                height: 24,
                width: 24,
                color: '#888'
              }}
              tabIndex={0}
              title="Pick a date"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </span>
          </div>
          <style>{`
            .custom-datepicker-input {
              padding: 8px 38px 8px 8px;
              border-radius: 6px;
              border: 1px solid #ccc;
              width: 100%;
              background: #fff;
              color: #222;
              font-size: 16px;
              box-sizing: border-box;
            }
            .custom-datepicker-calendar {
              font-size: 15px;
              min-width: 240px;
              max-width: 260px;
              width: 100%;
              border-radius: 12px;
              box-shadow: 0 4px 24px rgba(0,0,0,0.12);
              padding: 8px 0 12px 0;
              font-weight: 200;
              color: #222;
            }
            .custom-datepicker-calendar .react-datepicker__header {
              background: #fff;
              border-bottom: none;
              padding-top: 10px;
              font-weight: 200;
              color: #222;
            }
            .custom-datepicker-calendar .react-datepicker__current-month {
              font-size: 1.1em;
              font-weight: 200;
              color: #222;
            }
            .custom-datepicker-calendar .react-datepicker__day--selected {
              background: #ff9800;
              color: #fff;
              border-radius: 50%;
              font-weight: 400;
            }
            .custom-datepicker-calendar .react-datepicker__day--keyboard-selected {
              background: #ffe0b2;
              color: #222;
              font-weight: 400;
            }
            .custom-datepicker-calendar .react-datepicker__day {
              border-radius: 50%;
              width: 2.1em;
              height: 2.1em;
              line-height: 2.1em;
              margin: 0.1em;
              font-weight: 200;
              color: #222;
            }
            /* Remove outline from next/prev month buttons */
            .custom-datepicker-calendar .react-datepicker__navigation {
              outline: none !important;
              box-shadow: none !important;
            }
            /* Hide days from previous/next months */
            .custom-datepicker-calendar .react-datepicker__day--outside-month {
              visibility: hidden;
            }
          `}</style>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '100%', minHeight: 80, resize: 'vertical', background: '#fff', color: '#222' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: '#eee', color: '#222', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button type="button" onClick={() => onApprove(date, desc)} style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: '#4caf50', color: '#fff', fontWeight: 600, cursor: 'pointer' }} disabled={!date}>Approve</button>
        </div>
      </div>
    </div>
  );
}
import Sidebar from './Sidebar';
import BookingDescription from './BookingDescription';
import './booking.css';

export default function AdminBooking() {
  // Bookings state from database
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from backend on mount
  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const [pendingRes, approvedRes, finishedRes] = await Promise.all([
          fetch('http://localhost:5051/api/bookings/pending'),
          fetch('http://localhost:5051/api/bookings/approved'),
          fetch('http://localhost:5051/api/bookings/finished'),
        ]);
        const [pending, approved, finished] = await Promise.all([
          pendingRes.json(),
          approvedRes.json(),
          finishedRes.json(),
        ]);
        // Add status to each booking
        const pendingWithStatus = pending.map(b => ({ ...b, status: 'pending' }));
        const approvedWithStatus = approved.map(b => ({ ...b, status: 'approved' }));
        const finishedWithStatus = finished.map(b => ({ ...b, status: 'finished' }));
        setBookings([...pendingWithStatus, ...approvedWithStatus, ...finishedWithStatus]);
      } catch (err) {
        setBookings([]);
      }
    };
    fetchBookings();
  }, []);
  // Delete booking handler
  const handleDeleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b._id !== id));
    if (selectedBooking && selectedBooking._id === id) setSelectedBooking(null);
  };

  // Approve modal state
  const [approveModal, setApproveModal] = useState({ open: false, booking: null });
  const openApproveModal = (booking) => setApproveModal({ open: true, booking });
  const closeApproveModal = () => setApproveModal({ open: false, booking: null });
  const handleApprove = async (date, desc) => {
    // Move booking to approved in backend
    const booking = approveModal.booking;
    try {
      // 1. Add to approved bookings in backend
      await fetch('http://localhost:5051/api/bookings/approved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...booking,
          status: 'approved',
          approvedDate: date,
          approvedDesc: desc
        })
      });
      // 2. Remove from pending bookings in backend
      await fetch(`http://localhost:5051/api/bookings/pending/${booking._id}`, {
        method: 'DELETE'
      });
      // 3. Update frontend state
      setBookings(prev => prev.map(b =>
        b._id === booking._id ? { ...b, status: 'approved', approvedDate: date, approvedDesc: desc } : b
      ));
    } catch (err) {
      alert('Failed to approve booking. Please try again.');
    }
    closeApproveModal();
  };
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'
  const [search, setSearch] = useState('');

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
  };
  const handleCloseModal = () => {
    setSelectedBooking(null);
  };


  // Filter bookings by status
  let filteredPending = bookings.filter(b => b.status === 'pending');
  let filteredApproved = bookings.filter(b => b.status === 'approved');
  let filteredFinished = bookings.filter(b => b.status === 'finished');
  if (filter === 'pending') {
    filteredApproved = [];
    filteredFinished = [];
  } else if (filter === 'approved') {
    filteredPending = [];
    filteredFinished = [];
  } else if (filter === 'finished') {
    filteredPending = [];
    filteredApproved = [];
  }
  // Further filter by search
  const searchLower = search.trim().toLowerCase();
  if (searchLower) {
    filteredPending = filteredPending.filter(b =>
      b.title.toLowerCase().includes(searchLower) ||
      b.desc.toLowerCase().includes(searchLower)
    );
    filteredApproved = filteredApproved.filter(b =>
      b.title.toLowerCase().includes(searchLower) ||
      b.desc.toLowerCase().includes(searchLower)
    );
    filteredFinished = filteredFinished.filter(b =>
      b.title.toLowerCase().includes(searchLower) ||
      b.desc.toLowerCase().includes(searchLower)
    );
  }

  // Handler to mark an approved booking as finished
  const handleDoneBooking = async (booking) => {
    try {
      // 1. Add to finished bookings in backend
      await fetch('http://localhost:5051/api/bookings/finished', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...booking, status: 'finished' })
      });
      // 2. Remove from approved bookings in backend
      await fetch(`http://localhost:5051/api/bookings/approved/${booking._id}`, {
        method: 'DELETE'
      });
      // 3. Update frontend state
      setBookings(prev => prev.map(b =>
        b._id === booking._id ? { ...b, status: 'finished' } : b
      ));
    } catch (err) {
      alert('Failed to mark as finished. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-booking-root">
          {/* Header Row: Title, Search, and Filter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            margin: '0 0 32px 0',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: 32 }}>Admin Booking</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="text"
                placeholder="Search bookings..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: 16,
                  background: '#fff',
                  color: '#222',
                  minWidth: 200,
                  marginRight: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              />
              <label htmlFor="booking-filter" style={{ fontWeight: 500, marginRight: 8 }}>Show:</label>
              <select
                id="booking-filter"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  fontSize: 16,
                  background: '#fff',
                  color: '#222',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  appearance: 'none',
                  minWidth: 160,
                  cursor: 'pointer'
                }}
              >
                <option value="all" style={{ background: '#fff', color: '#222' }}>All</option>
                <option value="pending" style={{ background: '#fff', color: '#222' }}>Pending Only</option>
                <option value="approved" style={{ background: '#fff', color: '#222' }}>Approved Only</option>
                <option value="finished" style={{ background: '#fff', color: '#222' }}>Finished Only</option>
              </select>
            </div>
          </div>
          {/* Pending Bookings Section */}
          {filteredPending.length > 0 && (
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Pending Bookings</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 0 }}>
                {filteredPending.map(booking => (
                  <li
                    key={booking._id}
                    className="booking-card"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 64, padding: 10 }}
                  >
                    <div
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleOpenModal(booking)}
                    >
                      <div style={{ fontWeight: 500, fontSize: 18 }}>{booking.eventType || booking.title}</div>
                      <div style={{ fontSize: 14, marginTop: 4 }}>Date: {booking.date ? (typeof booking.date === 'string' ? booking.date : new Date(booking.date).toLocaleDateString()) : ''}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        type="button"
                        onClick={() => openApproveModal(booking)}
                        style={{
                          background: '#4caf50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 24px',
                          fontWeight: 600,
                          fontSize: 17,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          minWidth: 100,
                          height: 44
                        }}
                        title="Approve booking"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBooking(booking._id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 6,
                          padding: 8,
                          marginLeft: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'none',
                          transition: 'background 0.2s',
                          height: 44,
                          width: 44
                        }}
                        title="Delete booking"
                        aria-label="Delete booking"
                        onMouseOver={e => e.currentTarget.style.background = '#ffeaea'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5.5" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                          <rect x="9.25" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                          <rect x="13" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                          <path d="M4 6.5H16M8.5 3.5H11.5C12.0523 3.5 12.5 3.94772 12.5 4.5V5.5H7.5V4.5C7.5 3.94772 7.94772 3.5 8.5 3.5Z" stroke="#ff4d4f" strokeWidth="1.2" strokeLinecap="round"/>
                          <rect x="3.5" y="6.5" width="13" height="10" rx="2" stroke="#ff4d4f" strokeWidth="1.2"/>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
        {/* Approve Modal */}
        <ApproveModal
          open={approveModal.open}
          onClose={closeApproveModal}
          onApprove={handleApprove}
          booking={approveModal.booking}
        />
              </ul>
            </div>
          )}
          {/* Approved Bookings Section */}
          {filteredApproved.length > 0 && (
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Approved Bookings</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 0 }}>
                {filteredApproved.map(booking => (
                  <li
                    key={booking._id}
                    className="booking-card"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 64, padding: 10 }}
                  >
                    <div
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleOpenModal(booking)}
                    >
                      <div style={{ fontWeight: 500, fontSize: 18 }}>{booking.eventType || booking.title}</div>
                      <div style={{ fontSize: 14, marginTop: 4 }}>Date: {booking.date ? (typeof booking.date === 'string' ? booking.date : new Date(booking.date).toLocaleDateString()) : ''}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        type="button"
                        onClick={() => handleDoneBooking(booking)}
                        style={{
                          background: '#2196f3',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 24px',
                          fontWeight: 600,
                          fontSize: 17,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          minWidth: 100,
                          height: 44
                        }}
                        title="Mark as finished"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBooking(booking._id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 6,
                          padding: 8,
                          marginLeft: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'none',
                          transition: 'background 0.2s',
                          height: 44,
                          width: 44
                        }}
                        title="Delete booking"
                        aria-label="Delete booking"
                        onMouseOver={e => e.currentTarget.style.background = '#ffeaea'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="5.5" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                          <rect x="9.25" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                          <rect x="13" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                          <path d="M4 6.5H16M8.5 3.5H11.5C12.0523 3.5 12.5 3.94772 12.5 4.5V5.5H7.5V4.5C7.5 3.94772 7.94772 3.5 8.5 3.5Z" stroke="#ff4d4f" strokeWidth="1.2" strokeLinecap="round"/>
                          <rect x="3.5" y="6.5" width="13" height="10" rx="2" stroke="#ff4d4f" strokeWidth="1.2"/>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Finished Bookings Section */}
          {filteredFinished.length > 0 && (
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Finished Bookings</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 0 }}>
                {filteredFinished.map(booking => (
                  <li
                    key={booking._id}
                    className="booking-card"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 64, padding: 10 }}
                  >
                    <div
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleOpenModal(booking)}
                    >
                      <div style={{ fontWeight: 500, fontSize: 18 }}>{booking.eventType || booking.title}</div>
                      <div style={{ fontSize: 14, marginTop: 4 }}>Date: {booking.date ? (typeof booking.date === 'string' ? booking.date : new Date(booking.date).toLocaleDateString()) : ''}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* No bookings message if all are empty */}
          {filteredPending.length === 0 && filteredApproved.length === 0 && filteredFinished.length === 0 && (
            <div style={{ color: '#888', marginBottom: 16 }}>No bookings to show.</div>
          )}
          <BookingDescription
            open={!!selectedBooking}
            onClose={handleCloseModal}
            booking={selectedBooking}
          />
        </div>
      </main>
    </div>
  );
}
