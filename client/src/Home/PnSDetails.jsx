
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductDetailsModal from './ProductDetailsModal';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';

const PRODUCTS_LOCAL_KEY = 'gd_products_by_category';

const CART_LOCAL_KEY = 'gd_event_cart';

export default function PnSDetails() {
  // Add to cart handler
  function handleAddToCart(product) {
    // Prevent duplicate entries by checking id/title
    const cart = JSON.parse(localStorage.getItem(CART_LOCAL_KEY)) || [];
    // You can use a unique id if available, fallback to title
    const exists = cart.some(item => item.title === product.title);
    if (!exists) {
      cart.push(product);
      localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(cart));
    }
  }
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="pns-card"
                style={{
                  border: 'none',
                  borderRadius: 0,
                  padding: 0,
                  minWidth: 340,
                  maxWidth: 420,
                  background: '#fff',
                  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  overflow: 'hidden',
                }}
                onClick={() => { setSelectedProduct(prod); setModalOpen(true); }}
              >
      <style>{`
        .pns-card:hover {
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
          transform: translateY(-8px);
        }
      `}</style>
                {prod.image ? (
                  <img src={prod.image} alt={prod.title} style={{
                    display: 'block',
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                    borderRadius: 0,
                    margin: 0,
                  }} />
                ) : (
                  <div style={{
                    width: '100%',
                    height: 220,
                    background: '#eee',
                    borderRadius: 0,
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888'
                  }}>No Image</div>
                )}
                  <div style={{ padding: 24, paddingTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, textAlign: 'left', width: '100%' }}>{prod.title}</div>
                        {prod.price && (
                          <div style={{ textAlign: 'left', color: '#888', fontWeight: 600, fontSize: 15, marginBottom: 4, width: '100%' }}>
                            PHP {prod.price}
                          </div>
                        )}
                      </div>
                      <IconButton
                        aria-label="add to cart"
                        onClick={e => { e.stopPropagation(); handleAddToCart(prod); }}
                        style={{ marginLeft: '8px', color: 'orange' }}
                      >
                        <AddShoppingCartIcon style={{ color: 'orange' }} />
                      </IconButton>
                    </div>
                </div>
              </div>
            ))}
            <ProductDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} product={selectedProduct} />
          </div>
        )}
      </div>
    </>
  );
}
