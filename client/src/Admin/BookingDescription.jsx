
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './booking-description.css';

export default function BookingDescription({ open, onClose, booking }) {
  if (!booking) return null;
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
        <Typography variant="h6" gutterBottom>{booking.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>Date: {booking.date}</Typography>
        <Typography variant="body1">{booking.desc}</Typography>
        {/* Add more temporary details here as needed */}
      </DialogContent>
    </Dialog>
  );
}
