import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function ProductDetailsModal({ open, onClose, product, onEdit }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!product) return null;

  const { images, title, price, description, additionals } = product;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent style={{ background: '#f3f3f1', padding: 0 }}>
        {images && images.length > 0 && (
          <div style={{ position: 'relative', width: '100%', height: 400, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={images[currentImageIndex]} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    zIndex: 2
                  }}
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    zIndex: 2
                  }}
                >
                  →
                </button>
              </>
            )}
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
                background: 'rgba(0,0,0,0.5)',
                padding: '8px 12px',
                borderRadius: 8,
                zIndex: 2
              }}>
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: 'cover',
                      borderRadius: 4,
                      cursor: 'pointer',
                      border: currentImageIndex === idx ? '2px solid #e6b800' : '1px solid rgba(255,255,255,0.5)',
                      opacity: currentImageIndex === idx ? 1 : 0.7,
                      transition: 'all 0.2s'
                    }}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 1100, padding: '32px 32px 0 32px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 32 }}>
              <div style={{ flex: '1 1 260px', minWidth: 260, maxWidth: 340, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 32, marginBottom: 8, color: '#3d4636', letterSpacing: 1 }}>{title}</div>
                {price && <div style={{ color: '#888', fontWeight: 700, fontSize: 20, marginBottom: 24, letterSpacing: 1 }}>PHP {price}</div>}
              </div>
            </div>
            {description && (
              <ul style={{ margin: '32px 0 0 0', paddingLeft: 18, fontSize: 17, color: '#222', width: '100%' }}>
                {description.split(/\n|\r|•|\d+\./).filter(Boolean).map((line, idx) => (
                  <li key={idx}>{line.trim()}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {additionals && Array.isArray(additionals) && additionals.length > 0 && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: 1100, padding: '48px 32px 32px 32px', boxSizing: 'border-box' }}>
              <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 1, marginBottom: 16, color: '#222' }}>ADDITIONAL</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {additionals.map((add, idx) => (
                  <div key={idx} style={{ background: '#fff', borderRadius: 8, padding: 20, minWidth: 220, flex: '1 1 220px', boxShadow: '0 2px 8px #0001' }}>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{add.title || add.category || ''} {add.price ? <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>PHP {add.price}</span> : null}</div>
                    {add.description && (
                      <div style={{ fontSize: 14, color: '#444', marginBottom: 8, whiteSpace: 'pre-line' }}>{add.description}</div>
                    )}
                    {add.items && Array.isArray(add.items) ? (
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {add.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {onEdit && (
          <Button onClick={onEdit} color="primary" style={{ fontWeight: 600 }}>Edit</Button>
        )}
        <Button onClick={onClose} color="secondary" style={{ color: '#b06fa7', fontWeight: 600 }}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}
