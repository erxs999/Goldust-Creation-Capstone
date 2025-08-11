
import React, { useEffect, useState } from "react";
import "./topbar.css";


const CART_LOCAL_KEY = 'gd_event_cart';

const TopBar = () => {
  const [expanded, setExpanded] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update cart count on mount and when storage changes
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem(CART_LOCAL_KEY)) || [];
      setCartCount(cart.length);
    }
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <header className={`topbar${expanded ? " topbar-expanded" : ""}`}>
      <div className="topbar-logo">GOLDUST CREATION</div>

      <nav className="topbar-center">
        <a href="/" className="topbar-link">Home</a>
        <a href="/?scroll=services" className="topbar-link">Services</a>
        <a href="/booking" className="topbar-link">Book Now</a>
        <a href="/policy" className="topbar-link">Policy</a>
      </nav>

      <div className="topbar-right">
        <span style={{ position: 'relative', display: 'inline-block', marginLeft: 16 }}>
          <a href="/event-cart" className="topbar-link">Event Cart</a>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: -10,
              right: -10,
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              background: 'none',
              padding: 0,
              borderRadius: 0,
              minWidth: 'unset',
              height: 'unset',
              boxShadow: 'none',
              display: 'block',
            }}>{cartCount}</span>
          )}
        </span>
        <a href="/signup" className="topbar-link" style={{ marginLeft: 36 }}>Sign up</a>
      </div>
    </header>
  );
};

export default TopBar;
