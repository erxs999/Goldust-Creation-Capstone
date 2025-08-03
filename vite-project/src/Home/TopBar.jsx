
import React, { useEffect, useState } from "react";
import "./topbar.css";

const TopBar = () => {
  const [expanded, setExpanded] = useState(true);

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
        <a href="/signup" className="topbar-link">Sign up</a>
      </div>
    </header>
  );
};

export default TopBar;
