import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from '../Home/TopBar';
import "./booking.css";

const BookSummary = ({ booking }) => {
  const navigate = useNavigate();
  // booking: { name, contact, email, eventType, eventLocation, eventVenue, specialRequest, gownsSuits, venueStyling, invitations, catering, flower, photo, cakes, tokens, makeup, guestCount, totalPrice }
  return (
    <div className="booking-root">
      <TopBar />
      <div className="booking-header">
        <h2>BOOKING SUMMARY</h2>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 0" }}>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{ marginBottom: 12, color: '#111' }}>Name : <span style={{ color: '#111' }}>{booking?.name || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Contact Number : <span style={{ color: '#111' }}>{booking?.contact || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Email Address : <span style={{ color: '#111' }}>{booking?.email || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Event Type : <span style={{ color: '#111' }}>{booking?.eventType || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Event Location : <span style={{ color: '#111' }}>{booking?.eventLocation || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Event Venue : <span style={{ color: '#111' }}>{booking?.eventVenue || ""}</span></div>
            </div>
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{ marginBottom: 12, color: '#111' }}>Gowns and Suits : <span style={{ color: '#111' }}>{booking?.gownsSuits || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Venue Styling : <span style={{ color: '#111' }}>{booking?.venueStyling || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Invitations : <span style={{ color: '#111' }}>{booking?.invitations || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Catering Sevice : <span style={{ color: '#111' }}>{booking?.catering || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Flower Entourage : <span style={{ color: '#111' }}>{booking?.flower || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Photo and Video : <span style={{ color: '#111' }}>{booking?.photo || ""}</span></div>
            </div>
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{ marginBottom: 12, color: '#111' }}>Cakes : <span style={{ color: '#111' }}>{booking?.cakes || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Tokens : <span style={{ color: '#111' }}>{booking?.tokens || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Make up and Hairstyle : <span style={{ color: '#111' }}>{booking?.makeup || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Guest Count : <span style={{ color: '#111' }}>{booking?.guestCount || ""}</span></div>
              <div style={{ marginBottom: 12, color: '#111' }}>Total Price: <span style={{ color: '#111' }}>{booking?.totalPrice || ""}</span></div>
            </div>
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
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 40 }}>
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
            onClick={() => navigate('/book-appointment')}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSummary;
