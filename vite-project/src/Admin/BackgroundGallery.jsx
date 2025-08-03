
import React, { useRef, useState } from 'react';
import Sidebar from './Sidebar';
import './backgroundgallery.css';



const LOCAL_BG_KEY = 'gd_background_gallery';

const getStoredImages = () => {
  try {
    const imgs = JSON.parse(localStorage.getItem(LOCAL_BG_KEY)) || [];
    return imgs;
  } catch {
    return [];
  }
};

const BackgroundGallery = () => {
  const [images, setImages] = useState(getStoredImages());
  const fileInputRef = useRef(null);

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = ev => resolve({
          url: ev.target.result,
          name: file.name
        });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(newImages => {
      const updated = [...images, ...newImages];
      setImages(updated);
      localStorage.setItem(LOCAL_BG_KEY, JSON.stringify(updated));
    });
  };

  const handleDelete = (idx) => {
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    localStorage.setItem(LOCAL_BG_KEY, JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="background-gallery">
          <h2>Background Gallery</h2>
          <button
            className="bg-gallery-add-btn"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{ marginBottom: 20, background: '#d4af37', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}
          >
            Add Pictures
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAddImages}
          />
          <div className="bg-gallery-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {images.length === 0 && <p style={{ color: '#888' }}>No images added yet.</p>}
            {images.map((img, idx) => (
              <div key={img.url} className="bg-gallery-img-card" style={{ position: 'relative', width: 180, height: 120, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={img.url} alt={img.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => handleDelete(idx)}
                  style={{ position: 'absolute', top: 6, right: 6, background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}
                  title="Delete"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BackgroundGallery;
