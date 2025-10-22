import React, { useState, useEffect } from "react";
const PSGC_API = 'https://psgc.gitlab.io/api';
import { useNavigate } from "react-router-dom";
import "./booking.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TopBar from '../Home/TopBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Booking = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    eventType: '',
    eventLocation: '',
    eventVenue: '',
    specialRequest: '',
    products: [],
    guestCount: '',
    totalPrice: '',
    province: '',
    city: '',
    barangay: '',
    date: null,
    outsidePH: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [loading, setLoading] = useState({ provinces: false, cities: false, barangays: false });
  useEffect(() => {
    setLoading(l => ({ ...l, provinces: true }));
    fetch(`${PSGC_API}/provinces/`)
      .then(res => res.json())
      .then(data => setProvinces(data))
      .finally(() => setLoading(l => ({ ...l, provinces: false })));
  }, []);

  useEffect(() => {
    if (form.province) {
      setLoading(l => ({ ...l, cities: true }));
      setCities([]);
      setBarangays([]);
      setForm(f => ({ ...f, city: '', barangay: '' }));
      fetch(`${PSGC_API}/provinces/${form.province}/cities-municipalities/`)
        .then(res => res.json())
        .then(data => setCities(data))
        .finally(() => setLoading(l => ({ ...l, cities: false })));
    } else {
      setCities([]);
      setBarangays([]);
    }
  }, [form.province]);

  useEffect(() => {
    if (form.city) {
      setLoading(l => ({ ...l, barangays: true }));
      setBarangays([]);
      setForm(f => ({ ...f, barangay: '' }));
      fetch(`${PSGC_API}/cities-municipalities/${form.city}/barangays/`)
        .then(res => res.json())
        .then(data => setBarangays(data))
        .finally(() => setLoading(l => ({ ...l, barangays: false })));
    } else {
      setBarangays([]);
    }
  }, [form.city]);

  React.useEffect(() => {
    // Get userEmail from localStorage user object (same as cart logic)
    let userEmail = null;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      userEmail = user && user.email;
    } catch {}
    if (!userEmail) {
      setForm(f => ({ ...f, products: [] }));
      return;
    }
    fetch(`http://localhost:5051/api/cart?userEmail=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => {
        // include additionals from cart items along with product
        const products = Array.isArray(data) ? data.map(item => {
          // item.product is the base product, item.additionals may exist
          return { ...(item.product || {}), __cart_additionals: Array.isArray(item.additionals) ? item.additionals : [] };
        }) : [];
        setForm(f => ({ ...f, products }));
      })
      .catch(() => setForm(f => ({ ...f, products: [] })));
  }, []);
  const navigate = useNavigate();


  const computeTotalPrice = () => {
    if (!form.products || !Array.isArray(form.products)) return 0;
    return form.products.reduce((sum, item) => {
      const base = Number(item.price) || 0;
      const adds = Array.isArray(item.__cart_additionals) ? item.__cart_additionals.reduce((a, add) => a + (Number(add.price) || 0), 0) : 0;
      return sum + base + adds;
    }, 0);
  };

  const getEventVenue = () => {
    const provinceName = provinces.find(p => p.code === form.province)?.name || '';
    const cityName = cities.find(c => c.code === form.city)?.name || '';
    const barangayName = barangays.find(b => b.code === form.barangay)?.name || '';
    return [barangayName, cityName, provinceName].filter(Boolean).join(', ');
  };
  const isFormValid = () => {
    return (
      form.date &&
      form.province &&
      form.city &&
      form.barangay &&
      form.eventType &&
      form.guestCount
    );
  };

  const handleNext = () => {
    if (!isFormValid()) {
      return;
    }
    const booking = {
      ...form,
      totalPrice: computeTotalPrice(),
      eventVenue: getEventVenue(),
    };
    navigate('/booking-summary', { state: { booking } });
  };

  return (
    <div className="booking-root">
      <TopBar />
      <div className="booking-header">
        <h2>BOOK NOW</h2>
      </div>
      <div className="booking-center-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh', width: '100%' }}>
        <div className="booking-main-row" style={{ display: 'flex', gap: 0, maxWidth: 1050, width: '100%', justifyContent: 'center', marginBottom: 32 }}>
          <div className="booking-calendar-box" style={{ flex: 1, minWidth: 0, maxWidth: 'none', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', height: 340 }}>
            <h3 style={{ color: '#111', fontWeight: 700, textAlign: 'left', marginLeft: 0, marginBottom: 8 }}>Choose your event date</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={form.date}
                onChange={(newValue) => setForm(f => ({ ...f, date: newValue }))}
                minDate={dayjs().startOf('day')}
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
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8, marginTop: 8, color: '#222' }}>Event Venue</div>
            <div className="booking-field" style={{ marginBottom: 20 }}>
              <FormControl fullWidth size="small" style={{ marginBottom: 12 }}>
                <InputLabel id="province-label">Province</InputLabel>
                <Select
                  labelId="province-label"
                  value={form.province}
                  label="Province"
                  onChange={e => setForm(f => ({ ...f, province: e.target.value }))}
                  MenuProps={{ disablePortal: false, style: { zIndex: 2000 } }}
                  disabled={loading.provinces}
                >
                  <MenuItem value="">Select Province</MenuItem>
                  {provinces.map(p => (
                    <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" style={{ marginBottom: 12 }} disabled={!form.province || loading.cities}>
                <InputLabel id="city-label">City/Municipality</InputLabel>
                <Select
                  labelId="city-label"
                  value={form.city}
                  label="City/Municipality"
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  MenuProps={{ disablePortal: false, style: { zIndex: 2000 } }}
                >
                  <MenuItem value="">Select City/Municipality</MenuItem>
                  {cities.map((c, idx) => (
                    <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" disabled={!form.city || loading.barangays}>
                <InputLabel id="barangay-label">Barangay</InputLabel>
                <Select
                  labelId="barangay-label"
                  value={form.barangay}
                  label="Barangay"
                  onChange={e => setForm(f => ({ ...f, barangay: e.target.value }))}
                  MenuProps={{ disablePortal: false, style: { zIndex: 2000 } }}
                >
                  <MenuItem value="">Select Barangay</MenuItem>
                  {barangays.map((b, idx) => (
                    <MenuItem key={b.code} value={b.code}>{b.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ height: 18 }} />
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: '#222' }}>Event Type</div>
            <div className="booking-field" style={{ marginBottom: 20 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="event-type-label">Event Type</InputLabel>
                <Select
                  labelId="event-type-label"
                  label="Event Type"
                  value={form.eventType}
                  onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}
                >
                  <MenuItem value="">Choose your Event Type</MenuItem>
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Birthday">Birthday</MenuItem>
                  <MenuItem value="Debut">Debut</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, marginTop: 12, color: '#222' }}>Guest Count</div>
              <TextField
                fullWidth
                type="number"
                label="Guest Count"
                variant="outlined"
                size="small"
                value={form.guestCount}
                onChange={e => setForm(f => ({ ...f, guestCount: e.target.value }))}
                inputProps={{ min: 1 }}
              />
            </div>
            <div className="booking-field" style={{ marginBottom: 0 }}>
              <FormControl component="fieldset" fullWidth>
                <label style={{ fontWeight: 500, color: '#222', marginBottom: 8, display: 'block', fontSize: '1rem', textAlign: 'left' }}>
                  Are you booking from outside the Philippines?
                </label>
                <RadioGroup
                  row
                  aria-label="Booking from outside the Philippines?"
                  name="outsidePH"
                  value={form.outsidePH}
                  onChange={e => setForm(f => ({ ...f, outsidePH: e.target.value }))}
                  style={{ justifyContent: 'flex-start' }}
                >
                  <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="booking-services-box" style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 0 }}>
            <h3 style={{ fontWeight: 700, margin: 0 }}>Services and Products Availed</h3>
            {form.products && form.products.length > 0 && (
              <IconButton
                aria-label="Delete all products/services"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete all products/services from this list?')) {
                    setForm(f => ({ ...f, products: [] }));
                  }
                }}
                style={{ color: '#e53935', marginRight: 4, outline: 'none', boxShadow: 'none' }}
                title="Delete all products/services"
                disableFocusRipple
                disableRipple
              >
                <DeleteIcon />
                <span style={{ fontWeight: 700, fontSize: 16, marginLeft: 4, userSelect: 'none' }}>Delete All</span>
                <style>{`
                  .MuiIconButton-root:focus,
                  .MuiIconButton-root:active {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                `}</style>
              </IconButton>
            )}
          </div>
          {form.products && form.products.length > 0 ? (
            <div style={{ width: '100%' }}>
              <div style={{ marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {form.products.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#fafafa',
                    border: '1px solid #eee',
                    borderRadius: 6,
                    padding: 12,
                    marginBottom: 0,
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
              {/* New: Selected Additionals Section */}
              <div style={{ width: '100%', marginTop: 8, background: '#fff', borderRadius: 6, padding: 12, border: '1px solid #eee' }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Selected Additionals</div>
                {(() => {
                  // gather all additionals across products
                  const allAdds = [];
                  form.products.forEach((p, i) => {
                    if (Array.isArray(p.__cart_additionals) && p.__cart_additionals.length) {
                      p.__cart_additionals.forEach(add => allAdds.push({ productIndex: i, ...add }));
                    }
                  });
                  if (allAdds.length === 0) return <div style={{ color: '#888' }}>No additionals selected.</div>;
                  return (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 32px' }}>
                        {allAdds.map((add, aidx) => (
                          <div key={add._id || add.title || aidx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                            <div style={{ fontWeight: 600 }}>{add.title}</div>
                            {add.price ? <div style={{ color: '#888' }}>PHP {add.price}</div> : <div style={{ color: '#888' }}>PHP 0</div>}
                          </div>
                        ))}
                      </div>
                      {/* subtotal removed as requested */}
                    </div>
                  );
                })()}
              </div>
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
              placeholder="Type any special requests here (special service, collaboration to other service provider, host and etc."
              variant="outlined"
              size="small"
              value={form.specialRequest}
              onChange={e => setForm(f => ({ ...f, specialRequest: e.target.value }))}
            />
          </div>
        </div>
      </div>
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 80 }}>
        <button
          style={{
            padding: '12px 32px',
            background: isFormValid() ? '#ffb300' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 16,
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            minWidth: 180
          }}
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Confirm
        </button>
      </div>
    </div>
  );

};
export default Booking;
