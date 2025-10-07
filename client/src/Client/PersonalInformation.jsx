import React from 'react';
import ClientSidebar from './ClientSidebar';
import { TextField, Button } from '@mui/material';

import './personal-information.css';

const PersonalInformation = () => {
  const [editMode, setEditMode] = React.useState(false);
  const [user, setUser] = React.useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    contact: '',
    password: ''
  });

  // Generic handler for all fields
  const handleChange = (field) => (event) => {
    setUser((prev) => ({ ...prev, [field]: event.target.value }));
  };

  React.useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser({
          firstName: storedUser.firstName || '',
          middleName: storedUser.middleName || '',
          lastName: storedUser.lastName || '',
          email: storedUser.email || '',
          phone: storedUser.phone || '',
          contact: storedUser.contact || '',
          password: storedUser.password || ''
        });
      }
    } catch {}
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <ClientSidebar />
  <div className="client-main-content client-personal-info" style={{ background: '#fff', border: 'none', boxShadow: 'none', borderRadius: 0 }}>
        <div className="personal-info-header">
          <span className="personal-info-title" style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: 18, color: '#333', display: 'block', marginLeft: -25, marginTop: -20 }}>Profile</span>
          <div className="personal-info-buttons">
            {!editMode && (
              <Button className="personal-info-btn" variant="contained" style={{ background: '#F3C13A', color: '#222', width: 90, fontWeight: 'bold', fontSize: 16, height: 28, minHeight: 28, padding: '8px 0', borderRadius: 8, transition: 'width 0.2s' }} onClick={() => setEditMode(true)}>Edit</Button>
            )}
            {editMode && (
              <Button className="personal-info-btn" variant="contained" style={{ background: '#F3C13A', color: '#222', width: 90, fontWeight: 'bold', fontSize: 16, height: 28, minHeight: 28, padding: '8px 0', borderRadius: 8, transition: 'width 0.2s' }} type="submit">Save</Button>
            )}
          </div>
        </div>
        <form className="personal-info-form" noValidate autoComplete="off">
          {!editMode ? (
            <div className="personal-info-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* 2-column grid, each row is a grid with 2 columns: label and value */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                columnGap: '120px' // extra gap between columns
              }}>
                {/* Column 1 */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="firstName" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>First Name:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>{user.firstName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="lastName" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Last Name:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>{user.lastName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="phone" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Phone Number:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>{user.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="password" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Password:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>&#8226;&#8226;&#8226;</span>
                  </div>
                </div>
                {/* Column 2 */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="middleName" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Middle Name:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>{user.middleName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="email" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Email address:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>{user.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="contact" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Contact:</label>
                    <span className="personal-info-value" style={{ fontWeight: 'normal', fontSize: '1.125rem', textAlign: 'left', marginLeft: 12 }}>{user.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="personal-info-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                columnGap: '120px'
              }}>
                {/* Column 1 */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="firstName" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>First Name:</label>
                    <TextField 
                      id="firstName"
                      className="personal-info-field"
                      value={user.firstName}
                      placeholder="Enter your first name"
                      margin="normal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange('firstName')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="lastName" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Last Name:</label>
                    <TextField 
                      id="lastName"
                      className="personal-info-field"
                      value={user.lastName}
                      placeholder="Enter your last name"
                      margin="normal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange('lastName')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="phone" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Phone Number:</label>
                    <TextField 
                      id="phone"
                      className="personal-info-field"
                      value={user.phone}
                      placeholder="Enter your phone number"
                      margin="normal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange('phone')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="password" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Password:</label>
                    <TextField 
                      id="password"
                      className="personal-info-field"
                      value={user.password}
                      placeholder="Enter your password"
                      margin="normal"
                      variant="outlined"
                      type="password"
                      size="small"
                      fullWidth
                      onChange={handleChange('password')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                {/* Column 2 */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="middleName" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Middle Name:</label>
                    <TextField 
                      id="middleName"
                      className="personal-info-field"
                      value={user.middleName}
                      placeholder="Enter your middle name"
                      margin="normal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange('middleName')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="email" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Email address:</label>
                    <TextField 
                      id="email"
                      className="personal-info-field"
                      value={user.email}
                      placeholder="Enter your email"
                      margin="normal"
                      variant="outlined"
                      type="email"
                      size="small"
                      fullWidth
                      onChange={handleChange('email')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
                    <label htmlFor="contact" className="personal-info-label" style={{ fontWeight: 'bold', fontSize: '1.125rem', textAlign: 'left', minWidth: 180 }}>Contact:</label>
                    <TextField 
                      id="contact"
                      className="personal-info-field"
                      value={user.contact}
                      placeholder="Enter your contact"
                      margin="normal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleChange('contact')}
                      sx={{
                        marginLeft: 1.5,
                        background: '#fff',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          height: 40,
                          '& fieldset': {
                            borderColor: '#ccc',
                          },
                          '&:hover fieldset': {
                            borderColor: '#F3C13A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F3C13A',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
