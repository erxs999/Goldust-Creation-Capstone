import React from 'react';
import ClientSidebar from './ClientSidebar';

const Booking = () => {
  return (
    <div style={{ display: 'flex' }}>
      <ClientSidebar />
      <div className="client-booking" style={{ flex: 1, padding: '32px' }}>
        <h2>Booking</h2>
        {/* Booking functionality here */}
      </div>
    </div>
  );
};

export default Booking;
