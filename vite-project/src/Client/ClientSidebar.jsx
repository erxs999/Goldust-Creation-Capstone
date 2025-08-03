import React from 'react';
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
  { label: 'Message', icon: <MessageIcon />, to: '/client/message' },
  { label: 'Services Information', icon: <InfoIcon />, to: '/client/services-information' },
  { label: 'Notification', icon: <NotificationsIcon />, to: '/client/notification' },
  { label: 'Log out', icon: <LogoutIcon />, to: '/logout' },
];

const ClientSidebar = () => {
  return (
    <div className="client-sidebar">
      <h2>Profile Management</h2>
      <ul>
        {navLinks.map((link) => (
          <li key={link.label}>
            <span className="icon">{link.icon}</span>
            <Link to={link.to} style={{ textDecoration: 'none', color: 'inherit' }}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSidebar;
