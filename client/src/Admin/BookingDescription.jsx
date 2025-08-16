
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
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        <div style={{ padding: 8 }}>
          <div style={{ display: 'flex', gap: 48, marginBottom: 24 }}>
            <div style={{ minWidth: 320 }}>
              <Typography variant="body1" gutterBottom><b>Name:</b> {booking?.name || ''}</Typography>
              <Typography variant="body1" gutterBottom><b>Contact Number:</b> {booking?.contact || ''}</Typography>
              <Typography variant="body1" gutterBottom><b>Email Address:</b> {booking?.email || ''}</Typography>
              <Typography variant="body1" gutterBottom><b>Event Type:</b> {booking?.eventType || ''}</Typography>
              <Typography variant="body1" gutterBottom><b>Event Date:</b> {formatDate(booking?.date)}</Typography>
              <Typography variant="body1" gutterBottom><b>Event Venue:</b> {booking?.eventVenue || ''}</Typography>
            </div>
            <div style={{ minWidth: 220 }}>
              <Typography variant="body1" gutterBottom><b>Guest Count:</b> {booking?.guestCount || ''}</Typography>
              <Typography variant="body1" gutterBottom><b>Total Price:</b> {booking?.totalPrice || ''}</Typography>
            </div>
          </div>
          {/* Services and Products Availed */}
          <div style={{ marginBottom: 24 }}>
            <Typography variant="subtitle1" style={{ fontWeight: 500, fontSize: 18, marginBottom: 8 }}>Services and Products Availed:</Typography>
            {booking?.products && booking.products.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {booking.products.map((item, idx) => (
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
            ) : (
              <div style={{ color: '#888', marginBottom: 16 }}>No products/services selected.</div>
            )}
          </div>
          {/* Special Request */}
          <div style={{ marginBottom: 24 }}>
            <Typography variant="subtitle1" style={{ fontWeight: 500 }}>Special Request:</Typography>
            <textarea
              className="booking-special-request"
              style={{ width: '100%', minHeight: 100, fontFamily: 'inherit', fontSize: '1rem', padding: 12, borderRadius: 8, border: '2px solid #222', resize: 'vertical', background: '#fff', color: '#111' }}
              value={booking?.specialRequest || ''}
              readOnly
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
