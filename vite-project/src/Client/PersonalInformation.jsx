import React from 'react';
import ClientSidebar from './ClientSidebar';
import { TextField, Button } from '@mui/material';

import './personal-information.css';

const PersonalInformation = () => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <div style={{ display: 'flex' }}>
      <ClientSidebar />
      <div className="client-main-content client-personal-info">
        <div className="personal-info-header">
          <span className="personal-info-title">Profile</span>
          <div className="personal-info-buttons">
            <Button className="personal-info-btn" variant="contained" style={{ background: '#F3C13A', color: '#222', width: 140, fontWeight: 'bold', fontSize: 16, padding: '10px 0', borderRadius: 8, transition: 'width 0.2s' }} onClick={() => setEditMode(true)}>Edit</Button>
            {editMode && (
              <Button className="personal-info-btn" variant="contained" style={{ background: '#F3C13A', color: '#222', width: 140, fontWeight: 'bold', fontSize: 16, padding: '10px 0', borderRadius: 8, transition: 'width 0.2s' }} type="submit">Save</Button>
            )}
          </div>
        </div>
        <form className="personal-info-form" noValidate autoComplete="off">
          <div className="personal-info-fields">
            <div>
              <label htmlFor="firstName" className="personal-info-label">First Name</label>
              <TextField id="firstName" className="personal-info-field" placeholder="Enter your first name" margin="normal" variant="outlined" size="small" fullWidth />
            </div>
            <div>
              <label htmlFor="lastName" className="personal-info-label">Last Name</label>
              <TextField id="lastName" className="personal-info-field" placeholder="Enter your last name" margin="normal" variant="outlined" size="small" fullWidth />
            </div>
            <div>
              <label htmlFor="email" className="personal-info-label">Email address</label>
              <TextField id="email" className="personal-info-field" placeholder="Enter your email" margin="normal" variant="outlined" type="email" size="small" fullWidth />
            </div>
            <div>
              <label htmlFor="phone" className="personal-info-label">Phone Number</label>
              <TextField id="phone" className="personal-info-field" placeholder="Enter your phone number" margin="normal" variant="outlined" size="small" fullWidth />
            </div>
            <div className="full-width">
              <label htmlFor="password" className="personal-info-label">Password</label>
              <TextField id="password" className="personal-info-field" placeholder="Enter your password" margin="normal" variant="outlined" type="password" size="small" fullWidth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
