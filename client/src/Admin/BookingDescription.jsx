
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './booking-description.css';

export default function BookingDescription({ open, onClose, booking }) {
  if (!booking) return null;
  // Helper for date formatting
  const formatDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string') {
      // Try to format ISO string
      const d = new Date(date);
      return isNaN(d) ? date : d.toLocaleDateString();
    }
    if (date.$d) return new Date(date.$d).toLocaleDateString();
    return new Date(date).toLocaleDateString();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={Paper}
      maxWidth={false}
      fullWidth={false}
      className="booking-description-modal"
    >
  <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 800, fontSize: 26, letterSpacing: 1, color: '#222' }}>
        Booking Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
  <div style={{ padding: 32, background: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)', borderRadius: 24, minWidth: 900 }}>
          {/* Booker & Event Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 40, background: '#fedb71', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 32, minWidth: 800 }}>
            <div style={{ minWidth: 320, flex: 2 }}>
              
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Name:</span> <span style={{ color: '#222' }}>{booking?.name || ''}</span></div>
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Contact Number:</span> <span style={{ color: '#222' }}>{booking?.contact || ''}</span></div>
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Email Address:</span> <span style={{ color: '#222' }}>{booking?.email || ''}</span></div>
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Total Price:</span> <span style={{ color: '#222' }}>PHP {booking?.totalPrice || ''}</span></div>
            </div>
            <div style={{ minWidth: 320, flex: 3 }}>
              
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Event Type:</span> <span style={{ color: '#222' }}>{booking?.eventType || ''}</span></div>
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Event Date:</span> <span style={{ color: '#222' }}>{formatDate(booking?.date)}</span></div>
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Event Venue:</span> <span style={{ color: '#222' }}>{booking?.eventVenue || ''}</span></div>
                <div style={{ marginBottom: 10, fontSize: 15 }}><span style={{ fontWeight: 700, color: '#000000ff' }}>Guest Count:</span> <span style={{ color: '#222' }}>{booking?.guestCount || ''}</span></div>
                
            </div>
          </div>
          {/* Services and Products Availed */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontWeight: 800, fontSize: 19, marginBottom: 14, color: '#222' }}>Services and Products Availed</div>
            {booking?.products && booking.products.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {booking.products.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#fedb71',
                   //border: '1px solid #fedb71',
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    {item.image && (
                      <img src={item.image} alt={item.title} style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{item.title}</div>
                      {item.price && <div style={{ color: '#222', fontWeight: 300, fontSize: 14 }}>PHP {item.price}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#fedb71', marginBottom: 16, fontSize: 15 }}>No products/services selected.</div>
            )}
          </div>
          {/* Special Request */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 10, color: '#222' }}>Special Request</div>
            <textarea
              className="booking-special-request"
              style={{ width: '100%', minHeight: 100, fontFamily: 'inherit', fontSize: '1rem', padding: 12, borderRadius: 10, border: '1px solid #fedb71', resize: 'vertical', background: '#ffffffff', color: '#222', boxShadow: '0 2px 8px rgba(33,150,243,0.04)' }}
              value={booking?.specialRequest || ''}
              readOnly
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
