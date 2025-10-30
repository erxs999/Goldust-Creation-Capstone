import React, const user = JSON.parse(localStorage.getItem('user')) || '{}';{ useState, useEffect } from 'react';
import api from '../services/api';
import ClientSidebar from './ClientSidebar';
import './BookingInformation.css';




const BookingInformation = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = user.email;

  useEffect(() => {
    async function fetchBookings() {
      try {
        const [pendingRes, approvedRes, finishedRes] = await Promise.all([
          api.get('/bookings/pending'),
          api.get('/bookings/approved'),
          api.get('/bookings/finished'),
        ]);
        const pending = pendingRes.data.filter(b => b.email === userEmail).map(b => ({ ...b, status: 'Pending' }));
        const approved = approvedRes.data.filter(b => b.email === userEmail).map(b => ({ ...b, status: 'Approved' }));
        const finished = finishedRes.data.filter(b => b.email === userEmail).map(b => ({ ...b, status: 'Finished' }));
        setBookings([...pending, ...approved, ...finished]);
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    if (userEmail) fetchBookings();
  }, [userEmail]);

  const handleCardClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="booking-page">
  <ClientSidebar userType={JSON.parse(localStorage.getItem('user') || '{}').role === 'supplier' ? 'supplier' : 'client'} />
      <div className="booking-content">
        <h2 style={{fontSize: '1.7rem', fontWeight: 800, marginBottom: 18, color: '#333'}}>Your Bookings</h2>
        {loading ? (
          <div>Loading bookings...</div>
        ) : (
          <div className="booking-list">
            {bookings.length === 0 ? (
              <div>No bookings found.</div>
            ) : (
              bookings.map((booking, idx) => (
                <div
                  key={booking._id || idx}
                  className="booking-card"
                  onClick={() => handleCardClick(booking)}
                >
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h4>{booking.eventType || booking.title}</h4>
                    <div style={{fontSize: '1.05rem', color: '#666'}}>{booking.date ? new Date(booking.date).toLocaleDateString() : ''}</div>
                  </div>
                  <span className="status">
                    Status: {booking.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
        {showModal && selectedBooking && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 10, padding: 32, maxWidth: 800, width: '90%', boxShadow: '0 2px 16px rgba(0,0,0,0.15)', position: 'relative'}}>
              <button onClick={handleCloseModal} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 28, cursor: 'pointer'}}>&times;</button>
              <h2 style={{fontWeight: 800, fontSize: '2rem', marginBottom: 24}}>Booking Details</h2>
              <div style={{background: '#ffe066', borderRadius: 24, padding: 24, marginBottom: 32, display: 'flex', flexWrap: 'wrap', gap: 32}}>
                <div style={{flex: 1, minWidth: 220}}>
                  <div><b>Name:</b> {selectedBooking.name}</div>
                  <div><b>Contact Number:</b> {selectedBooking.contact}</div>
                  <div><b>Email Address:</b> {selectedBooking.email}</div>
                  <div><b>Total Price:</b> {selectedBooking.totalPrice || selectedBooking.price}</div>
                </div>
                <div style={{flex: 1, minWidth: 220}}>
                  <div><b>Event Type:</b> {selectedBooking.eventType}</div>
                  <div><b>Event Date:</b> {selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : ''}</div>
                  <div><b>Event Venue:</b> {selectedBooking.eventVenue}</div>
                  <div><b>Guest Count:</b> {selectedBooking.guestCount}</div>
                </div>
              </div>
              <h3 style={{fontWeight: 700, marginBottom: 16}}>Services and Products Availed</h3>
              <div style={{display: 'flex', gap: 18, marginBottom: 32}}>
                {selectedBooking.products && selectedBooking.products.length > 0 ? (
                  selectedBooking.products.map((prod, i) => (
                    <div key={i} style={{background: '#ffe066', borderRadius: 16, padding: 16, minWidth: 180, display: 'flex', alignItems: 'center', gap: 12}}>
                      {prod.image && <img src={prod.image} alt={prod.title} style={{width: 60, height: 60, borderRadius: 8, objectFit: 'cover'}} />}
                      <div>
                        <div style={{fontWeight: 700}}>{prod.title}</div>
                        <div>PHP {prod.price}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No products/services listed.</div>
                )}
              </div>
              <h3 style={{fontWeight: 700, marginBottom: 10}}>Special Request</h3>
              <div style={{background: '#fffbe6', borderRadius: 12, padding: 16, border: '1px solid #ffe066', minHeight: 60}}>
                {selectedBooking.specialRequest || 'None'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingInformation;
