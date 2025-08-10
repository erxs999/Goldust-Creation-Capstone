import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TopBar from '../Home/TopBar';

const Booking = () => {
  const [date, setDate] = useState(null);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    eventType: '',
    eventLocation: '',
    eventVenue: '',
    specialRequest: '',
    products: [], // will hold selected products/services
    guestCount: '',
    totalPrice: '',
  });

  // On mount, load selected products/services from localStorage
  React.useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('gd_booking_selected_products')) || [];
    setForm(f => ({ ...f, products: selected }));
  }, []);
  const navigate = useNavigate();

  // TODO: Wire up form state to inputs if needed

  const handleNext = () => {
    navigate('/booking-summary', { state: { booking: form } });
  };

  return (
    <div className="booking-root">
      <TopBar />
      <div className="booking-header">
        <h2>BOOK NOW</h2>
      </div>
      <div className="booking-center-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh', width: '100%' }}>
        <div className="booking-main-row" style={{ display: 'flex', gap: 0, maxWidth: 1050, width: '100%', justifyContent: 'center', marginBottom: 32 }}>
          <div className="booking-calendar-box" style={{ flex: 1, minWidth: 0, maxWidth: 'none', width: '50%' }}>
            <h3 style={{ color: '#111', fontWeight: 700 }}>Choose your event date</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{
                  textField: { fullWidth: true, size: 'small' },
                  calendarHeader: { sx: { '& .MuiPickersCalendarHeader-label': { color: '#111' }, '& .MuiPickersArrowSwitcher-button': { color: '#111' } } },
                  year: {
                    sx: {
                      color: '#111 !important',
                      '&.Mui-selected': { color: '#111 !important', backgroundColor: '#eee' },
                      '&.Mui-disabled': { color: '#111 !important', opacity: 0.4 },
                      '&:hover': { backgroundColor: '#000000ff' },
                    }
                  },
                  actionBar: { actions: [] }
                }}
                showToolbar={false}
              />
            </LocalizationProvider>
          </div>
          <div className="booking-form-box" style={{ flex: 1, minWidth: 0, maxWidth: 'none', width: '50%', display: 'flex', flexDirection: 'column', padding: '24px 32px', boxSizing: 'border-box' }}>
            <div className="booking-field" style={{ marginBottom: 20 }}>
              <TextField
                fullWidth
                label="Event Location"
                placeholder="Enter your event location"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="booking-field" style={{ marginBottom: 20 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="event-type-label">Event Type</InputLabel>
                <Select
                  labelId="event-type-label"
                  label="Event Type"
                  defaultValue=""
                >
                  <MenuItem value="">Choose your Event Type</MenuItem>
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Birthday">Birthday</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="booking-field" style={{ marginBottom: 0 }}>
              <FormControl component="fieldset" fullWidth>
                <label style={{ fontWeight: 500, color: '#222', marginBottom: 8, display: 'block', fontSize: '1rem', textAlign: 'left' }}>
                  Booking from outside the Philippines?
                </label>
                <RadioGroup
                  row
                  aria-label="Booking from outside the Philippines?"
                  name="outsidePH"
                  style={{ justifyContent: 'flex-start' }}
                >
                  <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* Special Request field moved to services card below */}
          </div>
        </div>
        <div className="booking-services-box" style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
          <h3 style={{ fontWeight: 700 }}>Services and Products Availed</h3>
          {/* Show selected products/services from cart */}
          {form.products && form.products.length > 0 ? (
            <div style={{ width: '100%', marginBottom: 24 }}>
              {form.products.map((item, idx) => (
                <div key={idx} style={{
                  background: '#fafafa',
                  border: '1px solid #eee',
                  borderRadius: 6,
                  padding: 12,
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}>
                  {item.image && (
                    <img src={item.image} alt={item.title} style={{ width: 60, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    {item.price && <div style={{ color: '#888', fontWeight: 500 }}>PHP {item.price}</div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#888', marginBottom: 16 }}>No products/services selected yet.</div>
          )}
          <div className="booking-field booking-special-request-row" style={{ width: '100%', marginTop: 16 }}>
            <TextField
              className="booking-special-request"
              fullWidth
              multiline
              minRows={5}
              label="Enter your Special Request"
              placeholder="Type any special requests here"
              variant="outlined"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );

};
export default Booking;
