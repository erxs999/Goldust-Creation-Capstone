
import React, { useState } from 'react';
// Simple modal for approve action
function ApproveModal({ open, onClose, onApprove, booking }) {
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  React.useEffect(() => {
    if (open) {
      setDate('');
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
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '100%', background: '#fff', color: '#222' }} />
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
  // Temporary bookings data with status
  const [bookings, setBookings] = useState([
    { id: 1, title: 'John Doe - Wedding', date: '2025-08-10', desc: 'Wedding booking for John Doe at Manila Hotel. 100 guests. Needs catering and photo/video.', status: 'pending' },
    { id: 2, title: 'Jane Smith - Birthday', date: '2025-08-12', desc: 'Birthday event for Jane Smith. 50 guests. Venue: Clubhouse. Cake and decorations required.', status: 'approved' },
    { id: 3, title: 'Acme Corp - Corporate', date: '2025-08-15', desc: 'Corporate event for Acme Corp. 200 guests. Needs AV setup and catering.', status: 'pending' },
    { id: 4, title: 'Mary Ann - Debut', date: '2025-08-20', desc: 'Debut for Mary Ann. 80 guests. Needs lights and sound.', status: 'approved' },
  ]);
  // Delete booking handler
  const handleDeleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    if (selectedBooking && selectedBooking.id === id) setSelectedBooking(null);
  };

  // Approve modal state
  const [approveModal, setApproveModal] = useState({ open: false, booking: null });
  const openApproveModal = (booking) => setApproveModal({ open: true, booking });
  const closeApproveModal = () => setApproveModal({ open: false, booking: null });
  const handleApprove = (date, desc) => {
    // Move booking to approved, optionally store date/desc
    setBookings(prev => prev.map(b =>
      b.id === approveModal.booking.id ? { ...b, status: 'approved', approvedDate: date, approvedDesc: desc } : b
    ));
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
  if (filter === 'pending') {
    filteredApproved = [];
  } else if (filter === 'approved') {
    filteredPending = [];
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
  }

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
                    key={booking.id}
                    className="booking-card"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
                  >
                    <div
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleOpenModal(booking)}
                    >
                      <div style={{ fontWeight: 500, fontSize: 18 }}>{booking.title}</div>
                      <div style={{ fontSize: 14, marginTop: 4 }}>Date: {booking.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => openApproveModal(booking)}
                        style={{
                          background: '#4caf50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 16px',
                          fontWeight: 600,
                          fontSize: 15,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                        title="Approve booking"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBooking(booking.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 6,
                          padding: 6,
                          marginLeft: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'none',
                          transition: 'background 0.2s',
                        }}
                        title="Delete booking"
                        aria-label="Delete booking"
                        onMouseOver={e => e.currentTarget.style.background = '#ffeaea'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    key={booking.id}
                    className="booking-card"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
                  >
                    <div
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleOpenModal(booking)}
                    >
                      <div style={{ fontWeight: 500, fontSize: 18 }}>{booking.title}</div>
                      <div style={{ fontSize: 14, marginTop: 4 }}>Date: {booking.date}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteBooking(booking.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 6,
                        padding: 6,
                        marginLeft: 8,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'none',
                        transition: 'background 0.2s',
                      }}
                      title="Delete booking"
                      aria-label="Delete booking"
                      onMouseOver={e => e.currentTarget.style.background = '#ffeaea'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5.5" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                        <rect x="9.25" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                        <rect x="13" y="8.5" width="1.5" height="6" rx="0.75" fill="#ff4d4f"/>
                        <path d="M4 6.5H16M8.5 3.5H11.5C12.0523 3.5 12.5 3.94772 12.5 4.5V5.5H7.5V4.5C7.5 3.94772 7.94772 3.5 8.5 3.5Z" stroke="#ff4d4f" strokeWidth="1.2" strokeLinecap="round"/>
                        <rect x="3.5" y="6.5" width="13" height="10" rx="2" stroke="#ff4d4f" strokeWidth="1.2"/>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* No bookings message if both are empty */}
          {filteredPending.length === 0 && filteredApproved.length === 0 && (
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
