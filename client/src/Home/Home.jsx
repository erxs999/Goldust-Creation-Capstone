
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import "./home.css";
import "../Authentication/auth.css";


const API_BASE = 'http://localhost:5051/api';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [bgImages, setBgImages] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from API
    fetch(`${API_BASE}/categories`)
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));

    // Scroll to services if ?scroll=services is in the URL
    if (window.location.search.includes('scroll=services')) {
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    // Fetch background images from backend
    fetch(`${API_BASE}/background-images`)
      .then(res => res.json())
      .then(imgs => {
        setBgImages(imgs.map(img => img.url));
        setBgIndex(0);
      })
      .catch(() => {
        setBgImages([]);
        setBgIndex(0);
      });
  }, []);

  // Slideshow effect
  React.useEffect(() => {
    if (bgImages.length <= 1) return;
    const interval = setInterval(() => {
      setBgIndex(idx => (idx + 1) % bgImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [bgImages]);

  const bgImage = bgImages.length > 0 ? bgImages[bgIndex] : null;

  return (
    <div className="home-root">
      <TopBar />
      <section
        className="home-hero"
        style={bgImage ? {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.7s ease',
          minHeight: '90vh',
        } : { minHeight: '100vh' }}
      >
        <div className="home-hero-overlay" style={{ background: 'rgba(0,0,0,0.12)' }}>
          <h1 className="home-hero-title">ONE STOP SHOP</h1>
        </div>
        {bgImages.length > 1 && (
          <div className="home-hero-dots">
            {bgImages.map((_, idx) => (
              <button
                key={idx}
                className={`home-hero-dot${bgIndex === idx ? ' active' : ''}`}
                onClick={() => setBgIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>
      <section className="home-services" id="services">
        <h2 className="home-services-title">SERVICES</h2>
        <div className="home-services-grid">
          {categories.length === 0 && <div>No services yet.</div>}
          {categories.map((cat, idx) => (
            <div
              key={cat.title + idx}
              className="home-service-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/pns-details', { state: { category: cat } })}
            >
              {cat.image ? (
                <div className="home-service-img-wrapper">
                  <img src={cat.image} alt={cat.title} className="home-service-img" />
                  <div className="home-service-title-overlay">
                    {cat.title}
                  </div>
                </div>
              ) : (
                <div className="home-service-img-wrapper">
                  <span className="home-service-title-overlay">{cat.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
