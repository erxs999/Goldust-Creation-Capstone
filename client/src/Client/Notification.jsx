import React, { useEffect, useState } from 'react';
import ClientSidebar from './ClientSidebar';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user email
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = user.email;

  useEffect(() => {
    async function fetchReminders() {
      try {
        const res = await fetch('/api/schedules');
        if (!res.ok) throw new Error('Failed to fetch reminders');
        const data = await res.json();
  // Get user's name and email
  const userName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  // Filter reminders for this user by name or email
  const filtered = data.filter(rem => rem.type === 'Customer' && (rem.person === userEmail || rem.person === userName));
  setNotifications(filtered);
      } catch (err) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }
    if (userEmail) fetchReminders();
  }, [userEmail]);

  return (
    <div className="notification-page">
      <ClientSidebar />
      <div className="notification-content">
        <h2>Notifications</h2>
        <div className="notification-list">
          {loading ? (
            <div>Loading...</div>
          ) : notifications.length === 0 ? (
            <div>No reminders found.</div>
          ) : (
            notifications.map((notif) => (
              <div key={notif._id} className="notification-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <h4>{notif.title}</h4>
                  <p>{notif.description || notif.location || ''}</p>
                </div>
                <div style={{fontSize: '0.95rem', color: '#888', marginLeft: 16, minWidth: 80, textAlign: 'right'}}>{notif.date}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
