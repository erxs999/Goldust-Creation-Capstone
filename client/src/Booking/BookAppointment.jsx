import React from "react";
import TopBar from '../Home/TopBar';
import { useNavigate } from "react-router-dom";
import "./booking.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  return (
    <div className="booking-root" style={{ minHeight: '100vh', background: '#fff', color: '#111' }}>
      <TopBar />
      <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: 48, textAlign: 'center', color: '#111' }}>
        <h2 style={{ fontWeight: 700, marginBottom: 32, color: '#111' }}>APPOINTMENT SET!</h2>
        <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: 320, marginBottom: 48, color: '#111' }}>
          <div style={{ marginBottom: 16 }}><b>Date :</b></div>
          <div style={{ marginBottom: 16 }}><b>Time :</b></div>
          <div style={{ marginBottom: 32 }}><b>Location :</b></div>
          <div style={{ color: '#888', fontSize: 13, marginTop: 32, marginBottom: 32 }}>
            <div style={{ fontWeight: 500, marginBottom: 4, color: '#111' }}>Note:</div>
            <span style={{ color: '#888' }}>If you're booking from outside the Philippines,<br />
            we'll contact you through email or SMS.</span>
          </div>
        </div>
        <button
          className="booking-btn"
          style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, minWidth: 180, marginTop: 16, fontWeight: 700 }}
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
