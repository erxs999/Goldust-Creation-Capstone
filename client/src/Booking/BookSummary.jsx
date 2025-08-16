
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from '../Home/TopBar';
import "./booking.css";

const BookSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || {};
  return (
    <div className="booking-root">
      <TopBar />
      <div className="booking-header">
        <h2>BOOKING SUMMARY</h2>
      </div>
      <div className="booking-summary-container">
        <div>
          <div className="booking-summary-row">
            <div className="booking-summary-col">
              <div style={{ marginBottom: 12, color: '#111' }}>Name : <span style={{ color: '#111' }}>{booking?.name || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Contact Number : <span style={{ color: '#111' }}>{booking?.contact || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Email Address : <span style={{ color: '#111' }}>{booking?.email || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Event Type : <span style={{ color: '#111' }}>{booking?.eventType || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Event Date : <span style={{ color: '#111' }}>{booking?.date ? (typeof booking.date === 'string' ? booking.date : booking.date?.$d ? new Date(booking.date.$d).toLocaleDateString() : booking.date.toString()) : ""}</span></div>
              {/* Event Location removed as per request */}
              <div style={{ marginBottom: 12, color: '#111' }}>Event Venue : <span style={{ color: '#111' }}>{booking?.eventVenue || ""}</span></div>
            </div>
            <div className="booking-summary-col">
              <div style={{ marginBottom: 12, color: '#111' }}>Guest Count : <span style={{ color: '#111' }}>{booking?.guestCount || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Total Price: <span style={{ color: '#111' }}>{booking?.totalPrice || ""}</span></div>
            </div>
          </div>
          {/* Services and Products Availed */}
          <div style={{ marginTop: 32, marginBottom: 0 }}>
            <div style={{ marginBottom: 12, color: '#111', fontWeight: 500, fontSize: 18 }}>Services and Products Availed:</div>
            {booking?.products && booking.products.length > 0 ? (
              <div style={{ marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {booking.products.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#fafafa',
                    border: '1px solid #eee',
                    borderRadius: 6,
                    padding: 12,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16
                  }}>
                    {item.image && (
                      <img src={item.image} alt={item.title} style={{ width: 60, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      {item.price && <div style={{ color: '#888', fontWeight: 500 }}>PHP {item.price}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#888', marginBottom: 16 }}>No products/services selected.</div>
            )}
          </div>
          {/* Special Request full width */}
          <div style={{ marginTop: 24, marginBottom: 0 }}>
            <div style={{ marginBottom: 12, color: '#111', fontWeight: 500 }}>Special Request :</div>
            <textarea
              className="booking-special-request"
              style={{ width: "100%", minHeight: 140, fontFamily: "inherit", fontSize: "1rem", padding: 12, borderRadius: 8, border: "2px solid #222", resize: "vertical", background: '#fff', color: '#111' }}
              value={booking?.specialRequest || ""}
              readOnly
            />
          </div>
          <div className="booking-summary-btn-row">
            <button
              type="button"
              className="booking-btn booking-btn-orange"
              style={{ minWidth: 100, background: '#ff9800', color: '#fff', border: 'none' }}
              onClick={() => navigate('/booking')}
            >
              Back
            </button>
            <button
              type="button"
              className="booking-btn booking-btn-next booking-btn-orange"
              style={{ minWidth: 100, background: '#ff9800', color: '#fff', border: 'none' }}
              onClick={async () => {
                // Send booking to pending bookings
                try {
                  await fetch('http://localhost:5051/api/bookings/pending', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(booking)
                  });
                  navigate('/book-appointment');
                } catch (err) {
                  alert('Failed to submit booking. Please try again.');
                }
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSummary;
