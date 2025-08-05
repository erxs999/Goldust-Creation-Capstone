
import React from 'react';
import SupplierSidebar from './SupplierSidebar';
import { TextField, Button } from '@mui/material';
import './supplier-information.css';


const SupplierInformation = () => {
  const [editMode, setEditMode] = React.useState(false);
  return (
    <div style={{ display: 'flex' }}>
      <SupplierSidebar />
      <div className="client-main-content client-personal-info">
        <div className="personal-info-header">
          <span className="personal-info-title">Supplier Profile</span>
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
              <label htmlFor="companyName" className="personal-info-label">Company Name</label>
              <TextField id="companyName" className="personal-info-field" placeholder="Enter your company name" margin="normal" variant="outlined" size="small" fullWidth />
            </div>
            <div>
              <label htmlFor="contactName" className="personal-info-label">Contact Name</label>
              <TextField id="contactName" className="personal-info-field" placeholder="Enter contact person's name" margin="normal" variant="outlined" size="small" fullWidth />
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
              <label htmlFor="address" className="personal-info-label">Business Address</label>
              <TextField id="address" className="personal-info-field" placeholder="Enter your business address" margin="normal" variant="outlined" size="small" fullWidth />
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

export default SupplierInformation;
