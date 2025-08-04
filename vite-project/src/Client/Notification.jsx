import React from 'react';
import ClientSidebar from './ClientSidebar';
import './Notification.css';

const Notification = () => {
  const notifications = [
    { id: 1, title: 'Booking Confirmed', message: 'Your booking for Garden Set has been confirmed.' },
    { id: 2, title: 'Payment Received', message: 'Your down payment of PHP50,000 has been received.' },
    { id: 3, title: 'Event Reminder', message: 'Reminder: Your event is scheduled for August 15.' },
       { id: 1, title: 'Booking Confirmed', message: 'Your booking for Garden Set has been confirmed.' },
    { id: 2, title: 'Payment Received', message: 'Your down payment of PHP50,000 has been received.' },
    { id: 3, title: 'Event Reminder', message: 'Reminder: Your event is scheduled for August 15.' },
       { id: 1, title: 'Booking Confirmed', message: 'Your booking for Garden Set has been confirmed.' },
    { id: 2, title: 'Payment Received', message: 'Your down payment of PHP50,000 has been received.' },
    { id: 3, title: 'Event Reminder', message: 'Reminder: Your event is scheduled for August 15.' },
       { id: 1, title: 'Booking Confirmed', message: 'Your booking for Garden Set has been confirmed.' },
    { id: 2, title: 'Payment Received', message: 'Your down payment of PHP50,000 has been received.' },
    { id: 3, title: 'Event Reminder', message: 'Reminder: Your event is scheduled for August 15.' },
       { id: 1, title: 'Booking Confirmed', message: 'Your booking for Garden Set has been confirmed.' },
    { id: 2, title: 'Payment Received', message: 'Your down payment of PHP50,000 has been received.' },
    { id: 3, title: 'Event Reminder', message: 'Reminder: Your event is scheduled for August 15.' },
  ];

  return (
    <div className="notification-page">
      <ClientSidebar />
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

export default Notification;
