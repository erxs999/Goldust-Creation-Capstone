import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TopBar from './TopBar';
import './EventCart.css';

const API_BASE = 'http://localhost:5051/api';

const EventCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let userEmail = null;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      userEmail = user && user.email;
    } catch {}
    if (!userEmail) {
      setCart([]);
      return;
    }
    fetch(`${API_BASE}/cart?userEmail=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => setCart(Array.isArray(data) ? data : []))
      .catch(() => setCart([]));
  }, []);

  const handleDelete = async (idxToDelete) => {
    const item = cart[idxToDelete];
    if (!item || !item._id) return;
    let userEmail = null;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      userEmail = user && user.email;
    } catch {}
    if (!userEmail) return;
    try {
      await fetch(`${API_BASE}/cart/${item._id}?userEmail=${encodeURIComponent(userEmail)}`, { method: 'DELETE' });
      setCart(cart.filter((_, idx) => idx !== idxToDelete));
    } catch {}
  };

  return (
    <>
      <TopBar />
      <div className="event-cart-root">
        <h2 className="event-cart-title">Event Cart</h2>
        <div className="event-cart-main">
          {/* Left: Cart Items */}
          <div className="event-cart-items">
            {cart.length === 0 ? (
              <p>Your selected events and services will appear here.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="event-cart-item">
                  {item.product && item.product.image && (
                    <img src={item.product.image} alt={item.product.title} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="event-cart-item-title">{item.product ? item.product.title : ''}</div>
                    {item.product && item.product.price && <div className="event-cart-item-price">PHP {item.product.price}</div>}
                  </div>
                  <IconButton aria-label="delete" onClick={() => handleDelete(idx)} style={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            )}
          </div>
          {/* Right: Summary */}
          <div className="event-cart-summary">
            <div className="event-cart-summary-title">Summary</div>
            <div className="event-cart-summary-list">
              {cart.length === 0 ? (
                <div className="event-cart-summary-row" style={{ color: '#888' }}>
                  <span>No items in cart.</span>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="event-cart-summary-row">
                    <span>{item.product ? item.product.title : ''}</span>
                    <span style={{ fontWeight: 600 }}>PHP {item.product && item.product.price ? item.product.price : 0}</span>
                  </div>
                ))
              )}
            </div>
            <div className="event-cart-summary-total">
              <span>Total</span>
              <span>PHP {cart.reduce((sum, item) => sum + (parseFloat(item.product && item.product.price) || 0), 0)}</span>
            </div>
            <button
              className="event-cart-book-btn"
              disabled={cart.length === 0}
              onClick={() => {
                localStorage.setItem('gd_booking_selected_products', JSON.stringify(cart.map(item => item.product)));
                window.location.href = '/booking';
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCart;
