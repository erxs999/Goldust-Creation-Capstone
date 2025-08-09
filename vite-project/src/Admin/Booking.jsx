
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BookingDescription from './BookingDescription';
import './booking.css';

export default function AdminBooking() {
  // Temporary bookings data
  const bookings = [
    { id: 1, title: 'John Doe - Wedding', date: '2025-08-10', desc: 'Wedding booking for John Doe at Manila Hotel. 100 guests. Needs catering and photo/video.' },
    { id: 2, title: 'Jane Smith - Birthday', date: '2025-08-12', desc: 'Birthday event for Jane Smith. 50 guests. Venue: Clubhouse. Cake and decorations required.' },
    { id: 3, title: 'Acme Corp - Corporate', date: '2025-08-15', desc: 'Corporate event for Acme Corp. 200 guests. Needs AV setup and catering.' },
  ];
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
  };
  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-booking-root">
          <h2>Admin Booking</h2>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
            {bookings.map(booking => (
              <li
                key={booking.id}
                className="booking-card"
                onClick={() => handleOpenModal(booking)}
              >
                <div style={{ fontWeight: 500, fontSize: 18 }}>{booking.title}</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>Date: {booking.date}</div>
              </li>
            ))}
          </ul>
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
