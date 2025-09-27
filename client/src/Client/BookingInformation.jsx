
import React from 'react';
import ClientSidebar from './ClientSidebar';
import './BookingInformation.css';

const bookingDetails = {
  name: 'f f f',
  contact: '123',
  email: 'f@gmail.com',
  price: 'PHP 50000',
  eventType: 'Birthday',
  eventDate: '9/19/2025',
  eventVenue: 'General Prim East, Bangar, La Union',
  guestCount: '5656',
};

const services = [
  {
    name: 'Function Hall',
    price: 'PHP 50000',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80',
  },
];


const BookingInformation = () => {
  return (
    <div className="booking-page">
      <ClientSidebar />
      <div className="booking-content" style={{display: 'flex', gap: '32px'}}>
        <div style={{width: '100%'}}>
          <h2 style={{fontWeight: 800, fontSize: '1.7rem', marginBottom: 24}}>Booking Details</h2>
          <div style={{background: '#ffde7a', borderRadius: 24, padding: '32px 40px', display: 'flex', justifyContent: 'space-between', marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
            <div>
              <div style={{marginBottom: 10}}><strong>Name:</strong> {bookingDetails.name}</div>
              <div style={{marginBottom: 10}}><strong>Contact Number:</strong> {bookingDetails.contact}</div>
              <div style={{marginBottom: 10}}><strong>Email Address:</strong> {bookingDetails.email}</div>
              <div style={{marginBottom: 10}}><strong>Total Price:</strong> {bookingDetails.price}</div>
            </div>
            <div>
              <div style={{marginBottom: 10}}><strong>Event Type:</strong> {bookingDetails.eventType}</div>
              <div style={{marginBottom: 10}}><strong>Event Date:</strong> {bookingDetails.eventDate}</div>
              <div style={{marginBottom: 10}}><strong>Event Venue:</strong> {bookingDetails.eventVenue}</div>
              <div style={{marginBottom: 10}}><strong>Guest Count:</strong> {bookingDetails.guestCount}</div>
            </div>
          </div>

          <h3 style={{fontWeight: 700, fontSize: '1.4rem', marginBottom: 18}}>Services and Products Availed</h3>
          {services.map((service, idx) => (
            <div key={idx} style={{background: '#ffde7a', borderRadius: 16, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
              <img src={service.img} alt={service.name} style={{width: 60, height: 60, borderRadius: 8, objectFit: 'cover'}} />
              <div>
                <div style={{fontWeight: 700, fontSize: '1.1rem'}}>{service.name}</div>
                <div>{service.price}</div>
              </div>
            </div>
          ))}

          <h3 style={{fontWeight: 700, fontSize: '1.2rem', marginBottom: 10}}>Special Request</h3>
          <div style={{background: 'none', border: '2px solid #ffde7a', borderRadius: 16, minHeight: 100, marginBottom: 32, padding: 16}}></div>
        </div>
        {/* Payment Details Section */}
        <div style={{minWidth: 320, maxWidth: 400, height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
          <h3 style={{fontWeight: 700, fontSize: '1.4rem', marginBottom: 18}}>Payment Details</h3>
          <div style={{background: '#ffde7a', borderRadius: 16, padding: '24px 32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%'}}>
            <div style={{marginBottom: 14}}><strong>Down Payment:</strong> PHP 50,000</div>
            <div style={{marginBottom: 14}}><strong>Remaining Payment:</strong> PHP 50,000</div>
            <div style={{marginBottom: 0}}><strong>Payment Status:</strong> Paid</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
