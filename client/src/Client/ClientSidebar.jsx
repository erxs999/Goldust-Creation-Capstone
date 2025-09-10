import React, { useState } from 'react';
import './client-sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', icon: <HomeIcon />, to: '/client/home' },
  { label: 'Personal Information', icon: <PersonIcon />, to: '/client/personal-information' },
 
  { label: 'Booking Information', icon: <InfoIcon />, to: '/client/booking-information' },
  { label: 'Notification', icon: <NotificationsIcon />, to: '/client/notification' },
  { label: 'Log out', icon: <LogoutIcon />, to: '/logout' },
];

const ClientSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={`client-sidebar${expanded ? '' : ' shrunk'}`}>
      <div className="client-sidebar-header">
        <h2 style={{margin: 0, padding: 0}}>{expanded ? 'Profile Management' : ''}</h2>
        <button className="sidebar-toggle-btn" onClick={() => setExpanded((e) => !e)}>
          {expanded ? '<' : '>'}
        </button>
      </div>
      <ul>
        {navLinks.map((link) => (
          <li key={link.label}>
            <span className="icon">{link.icon}</span>
            {expanded && <Link to={link.to} style={{ textDecoration: 'none', color: 'inherit' }}>{link.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSidebar;
