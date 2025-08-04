import React from 'react';
import ClientSidebar from './ClientSidebar';
import './BookingInformation.css';

const BookingInformation = () => {
  return (
    <div className="booking-page">
      <ClientSidebar />
      <div className="booking-content">
        <div className="booking-details">
          <h2>Booking Information</h2>
          {[...Array(7)].map((_, index) => (
            <div key={index} className="booking-item">
              Venue Styling: <span>Garden Set</span>
            </div>
          ))}
          <div className="special-request">Special Request:</div>
          <div className="total">Total: <strong>PHP100,000</strong></div>
        </div>
        <div className="payment-details">
          <h3>Payment</h3>
          <p>Down Payment: <strong>PHP50,000</strong></p>
          <p>Remaining Payment: <strong>PHP50,000</strong></p>
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
