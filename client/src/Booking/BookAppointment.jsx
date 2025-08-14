import React from "react";
import TopBar from '../Home/TopBar';
import { useNavigate } from "react-router-dom";
import "./booking.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  return (
    <div className="booking-root" style={{ minHeight: '100vh', background: '  #ffffffff', color: '#111' }}>
      <TopBar />
      <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: 48, textAlign: 'center', color: '#111' }}>
        <h2 style={{ fontWeight: 700, marginBottom: 32, color: '#000000ff' }}>Your booking is being reviewed by our team, we'll notify your account and email as soon as we reviewed it! Thank you
        </h2>
       
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
