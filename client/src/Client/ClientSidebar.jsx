import React, { useState } from 'react';
import './client-sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', icon: <HomeIcon />, to: '/client/home' },
  { label: 'Personal Information', icon: <PersonIcon />, to: '/client/personal-information' },
 
  { label: 'Booking Information', icon: <InfoIcon />, to: '/client/booking-information' },
  { label: 'Notification', icon: <NotificationsIcon />, to: '/client/notification' },
  { label: 'Log out', icon: <LogoutIcon />, to: '/logout' },
];

const ClientSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  return (
    <div className={`client-sidebar${expanded ? '' : ' shrunk'}`}>
      <div className="client-sidebar-header">
        <h2 style={{margin: 0, padding: 0}}>{expanded ? 'Profile' : ''}</h2>
        <button className="sidebar-toggle-btn" onClick={() => setExpanded((e) => !e)}>
          {expanded ? '<' : '>'}
        </button>
      </div>
      <ul>
        {navLinks.map((link, idx) => {
          const isActive = location.pathname === link.to;
          if (link.label === 'Log out') {
            return [
              <li key="divider" className="sidebar-divider"><hr className="sidebar-hr" /></li>,
              <li key={link.label} className={isActive ? 'active' : ''}>
                <span className="icon">{link.icon}</span>
                {expanded && <Link to={link.to} style={{ textDecoration: 'none', color: 'inherit' }}>{link.label}</Link>}
              </li>
            ];
          }
          return (
            <li key={link.label} className={isActive ? 'active' : ''}>
              <span className="icon">{link.icon}</span>
              {expanded && <Link to={link.to} style={{ textDecoration: 'none', color: 'inherit' }}>{link.label}</Link>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientSidebar;
