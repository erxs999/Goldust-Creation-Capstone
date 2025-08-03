import React from 'react';
import ClientSidebar from './ClientSidebar';

const Notification = () => {
  return (
    <div style={{ display: 'flex' }}>
      <ClientSidebar />
      <div className="client-notification" style={{ flex: 1, padding: '32px' }}>
        <h2>Notifications</h2>
        {/* Notification list here */}
      </div>
    </div>
  );
};

export default Notification;
