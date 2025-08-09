import React from 'react';

export default function SecondaryCategoryDetails({ category, onBack }) {
  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: 24, background: '#e6b800', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Back</button>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px 0 rgba(60,60,60,0.10)',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 300
      }}>
        <img
          src={category.image}
          alt={category.title}
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 16, border: '1px solid #ccc' }}
        />
        <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0 }}>{category.title}</h2>
        <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
          <button style={{ background: '#e6b800', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            Add Subcategory
          </button>
          <button style={{ background: '#fff', color: '#e6b800', border: '2px solid #e6b800', borderRadius: 6, padding: '12px 24px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            Add Product/Service
          </button>
        </div>
      </div>
    </div>
  );
}
