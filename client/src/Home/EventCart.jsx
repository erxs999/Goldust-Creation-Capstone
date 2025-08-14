import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TopBar from './TopBar';


const API_BASE = 'http://localhost:5051/api';

const EventCart = () => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    fetch(`${API_BASE}/cart`)
      .then(res => res.json())
      .then(data => setCart(Array.isArray(data) ? data : []))
      .catch(() => setCart([]));
  }, []);

  const handleDelete = async (idxToDelete) => {
    const item = cart[idxToDelete];
    if (!item || !item._id) return;
    try {
      await fetch(`${API_BASE}/cart/${item._id}`, { method: 'DELETE' });
      setCart(cart.filter((_, idx) => idx !== idxToDelete));
    } catch {}
  };

  return (
    <>
      <TopBar />
      <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 32 }}>Event Cart</h2>
        {cart.length === 0 ? (
          <p>Your selected events and services will appear here.</p>
        ) : (
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
            {/* Left: Cart Items */}
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {cart.map((item, idx) => (
                <div key={idx} style={{
                  background: '#fff',
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                  borderRadius: 8,
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  position: 'relative'
                }}>
                  {item.product && item.product.image && (
                    <img src={item.product.image} alt={item.product.title} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{item.product ? item.product.title : ''}</div>
                    {item.product && item.product.price && <div style={{ color: '#888', fontWeight: 600, fontSize: 15 }}>PHP {item.product.price}</div>}
                  </div>
                  <IconButton aria-label="delete" onClick={() => handleDelete(idx)} style={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            {/* Right: Summary */}
            <div style={{ flex: 1, background: '#fff', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)', borderRadius: 8, padding: 24, minWidth: 280 }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>Summary</div>
              <div style={{ marginBottom: 18 }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span>{item.product ? item.product.title : ''}</span>
                    <span style={{ fontWeight: 600 }}>PHP {item.product && item.product.price ? item.product.price : 0}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17, marginBottom: 24, borderTop: '1px solid #eee', paddingTop: 12 }}>
                <span>Total</span>
                <span style={{ color: 'orange' }}>PHP {cart.reduce((sum, item) => sum + (parseFloat(item.product && item.product.price) || 0), 0)}</span>
              </div>
              <button
                style={{ width: '100%', background: 'orange', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                onClick={() => {
                  // Save cart to localStorage for Booking page to pick up
                  // Save cart to localStorage for Booking page to pick up (optional: update this to use DB as well)
                  localStorage.setItem('gd_booking_selected_products', JSON.stringify(cart.map(item => item.product)));
                  window.location.href = '/booking';
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventCart;
