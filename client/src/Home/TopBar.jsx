

import React, { useEffect, useState } from "react";
import "./topbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const API_BASE = 'http://localhost:5051/api';

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
    // Fetch cart count from backend on mount and every 5 seconds
    let intervalId;
    async function updateCartCount() {
      try {
        const res = await fetch(`${API_BASE}/cart`);
        const data = await res.json();
        setCartCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setCartCount(0);
      }
    }
    updateCartCount();
    intervalId = setInterval(updateCartCount, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className={`topbar${expanded ? " topbar-expanded" : ""}`}>
      <div className="topbar-logo">GOLDUST CREATION</div>

      <nav className="topbar-center" style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
        <a href="/" className="topbar-link">Home</a>
        <a href="/?scroll=services" className="topbar-link">Services</a>
        <a href="/booking" className="topbar-link">Book Now</a>
        <a href="/policy" className="topbar-link">Policy</a>
      </nav>

      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="/event-cart" className="topbar-link" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <ShoppingCartIcon style={{ fontSize: 22 }} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: -10,
              right: -6,
              color: 'white',
              background: 'transparent',
              fontSize: 18,
              fontWeight: 500,
              zIndex: 1,
              padding: 0,
              boxShadow: 'none',
            }}>{cartCount}</span>
          )}
        </a>
        <a href="/signup" className="topbar-link">Sign up</a>
      </div>
    </header>
  );
};

export default TopBar;
