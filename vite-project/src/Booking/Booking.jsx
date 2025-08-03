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
    gownsSuits: '',
    venueStyling: '',
    invitations: '',
    catering: '',
    flower: '',
    photo: '',
    cakes: '',
    tokens: '',
    makeup: '',
    guestCount: '',
    totalPrice: '',
  });
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
                onChange={setDate}
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
          <h3>CHOOSE SERVICES</h3>
          <div className="booking-services-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: '100%' }}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="venue-styling-label">Venue Styling</InputLabel>
              <Select labelId="venue-styling-label" label="Venue Styling" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="gowns-suits-label">Gowns and Suits</InputLabel>
              <Select labelId="gowns-suits-label" label="Gowns and Suits" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="catering-label">Catering Service</InputLabel>
              <Select labelId="catering-label" label="Catering Service" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="flower-label">Flower Entourage</InputLabel>
              <Select labelId="flower-label" label="Flower Entourage" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="invitations-label">Invitations</InputLabel>
              <Select labelId="invitations-label" label="Invitations" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="tokens-label">Tokens</InputLabel>
              <Select labelId="tokens-label" label="Tokens" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="cakes-label">Cakes</InputLabel>
              <Select labelId="cakes-label" label="Cakes" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="makeup-label">Make up and Hairstyle</InputLabel>
              <Select labelId="makeup-label" label="Make up and Hairstyle" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="photo-label">Photo and Video</InputLabel>
              <Select labelId="photo-label" label="Photo and Video" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }} style={{ flex: '1 1 45%', minWidth: 140 }}>
              <InputLabel id="guest-label">Guest Count</InputLabel>
              <Select labelId="guest-label" label="Guest Count" defaultValue="">
                <MenuItem value="">Choose your state</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="booking-field booking-special-request-row" style={{ width: '100%', marginTop: 16 }}>
            <TextField
              className="booking-special-request"
              fullWidth
              multiline
              minRows={5}
              label="Enter your Special Request"
              placeholder="Type any special requests here..."
              variant="outlined"
              size="small"
            />
          </div>
          <div className="booking-actions" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>

            <button type="button" className="booking-btn booking-btn-next booking-btn-orange" style={{ background: '#ff9800', color: '#fff', border: 'none' }} onClick={handleNext}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );

};
export default Booking;
