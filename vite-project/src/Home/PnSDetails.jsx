
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';

const PRODUCTS_LOCAL_KEY = 'gd_products_by_category';

export default function PnSDetails() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    // Try to get category from location.state or from query param
    let cat = '';
    if (location.state && location.state.category && location.state.category.title) {
      cat = location.state.category.title;
    } else {
      // fallback: try to get from URL (e.g. /pns-details?category=we)
      const params = new URLSearchParams(window.location.search);
      cat = params.get('category') || '';
    }
    setCategoryTitle(cat);
    if (cat) {
      try {
        const all = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL_KEY)) || {};
        setProducts(all[cat] || []);
      } catch {
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  }, [location]);

  return (
    <>
      <TopBar />
      <div style={{ padding: 40, maxWidth: 1000, margin: '0 auto' }}>
        {categoryTitle && (
          <h2 style={{ textAlign: 'center', fontWeight: 700, fontSize: 32, marginBottom: 32 }}>
            {categoryTitle}
          </h2>
        )}
        {products.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', fontSize: 18 }}>No products/services available.</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            {products.map((prod, idx) => (
              <div
                key={idx}
                style={{
                  border: 'none',
                  borderRadius: 16,
                  padding: 16,
                  minWidth: 220,
                  maxWidth: 300,
                  background: '#fff',
                  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(230,184,0,0.10)',
                  transition: 'box-shadow 0.2s',
                }}
              >
                {prod.image ? (
                  <img src={prod.image} alt={prod.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
                ) : (
                  <div style={{ width: '100%', height: 120, background: '#eee', borderRadius: 10, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No Image</div>
                )}
                {/* Removed product title */}
                <div style={{ color: '#555', fontSize: 15 }}>{prod.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
