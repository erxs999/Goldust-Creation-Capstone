import React from 'react';
import SupplierSidebar from './SupplierSidebar';
import './supplier-notification.css';

const SupplierNotifications = () => {
  const notifications = [
    { id: 1, title: 'Order Received', message: 'You have received a new order from a client.' },
    { id: 2, title: 'Payment Processed', message: 'A payment has been processed for your service.' },
    { id: 3, title: 'Event Scheduled', message: 'A new event has been scheduled for August 20.' },
  ];

  return (
    <div className="notification-page">
      <SupplierSidebar />
      <div className="notification-content">
        <h2>Notifications</h2>
        <div className="notification-list">
          {notifications.map((notif) => (
            <div key={notif.id} className="notification-card">
              <h4>{notif.title}</h4>
              <p>{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierNotifications;
