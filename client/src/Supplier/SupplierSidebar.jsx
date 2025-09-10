import React, { useState } from 'react';
import './supplier-sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', icon: <HomeIcon />, to: '/home' },
  { label: 'Personal Information', icon: <PersonIcon />, to: '/supplier/information' },
  
  { label: 'Notifications', icon: <NotificationsIcon />, to: '/supplier/notifications' },
  { label: 'Log out', icon: <LogoutIcon />, to: '/logout' },
];

const SupplierSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  return (
    <div className={`supplier-sidebar${expanded ? '' : ' shrunk'}`}>
      <div className="supplier-sidebar-header">
        <h2 style={{margin: 0, padding: 0}}>{expanded ? 'Supplier Panel' : ''}</h2>
        <button className="sidebar-toggle-btn" onClick={() => setExpanded((e) => !e)}>
          {expanded ? '<' : '>'}
        </button>
      </div>
      <ul>
        {navLinks.map((link) => (
          <li key={link.label} className={location.pathname === link.to ? 'active' : ''}>
            <span className="icon">{link.icon}</span>
            {expanded && <Link to={link.to} style={{ textDecoration: 'none', color: 'inherit' }}>{link.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierSidebar;
