
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
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>
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
        <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 16 }}>
          {/* Booker & Event Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 24 }}>
            <div style={{ minWidth: 320, flex: 2 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#222' }}>Booker Information</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Name:</span> {booking?.name || ''}</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Contact Number:</span> {booking?.contact || ''}</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Email Address:</span> {booking?.email || ''}</div>
            </div>
            <div style={{ minWidth: 320, flex: 3 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#222' }}>Event Information</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Event Type:</span> {booking?.eventType || ''}</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Event Date:</span> {formatDate(booking?.date)}</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Event Venue:</span> {booking?.eventVenue || ''}</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Guest Count:</span> {booking?.guestCount || ''}</div>
              <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: '#444' }}>Total Price:</span> <span style={{ color: '#2196f3', fontWeight: 700 }}>PHP {booking?.totalPrice || ''}</span></div>
            </div>
          </div>
          {/* Services and Products Availed */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12, color: '#222' }}>Services and Products Availed</div>
            {booking?.products && booking.products.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {booking.products.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    {item.image && (
                      <img src={item.image} alt={item.title} style={{ width: 70, height: 54, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 17 }}>{item.title}</div>
                      {item.price && <div style={{ color: '#888', fontWeight: 600, fontSize: 15 }}>PHP {item.price}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#888', marginBottom: 16 }}>No products/services selected.</div>
            )}
          </div>
          {/* Special Request */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#222' }}>Special Request</div>
            <textarea
              className="booking-special-request"
              style={{ width: '100%', minHeight: 100, fontFamily: 'inherit', fontSize: '1rem', padding: 14, borderRadius: 10, border: '2px solid #2196f3', resize: 'vertical', background: '#f9f9fc', color: '#222', boxShadow: '0 2px 8px rgba(33,150,243,0.04)' }}
              value={booking?.specialRequest || ''}
              readOnly
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
