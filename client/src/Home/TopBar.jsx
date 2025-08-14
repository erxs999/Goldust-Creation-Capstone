
import React, { useEffect, useState } from "react";
import "./topbar.css";


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
