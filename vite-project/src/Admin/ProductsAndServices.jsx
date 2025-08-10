
import { useNavigate } from 'react-router-dom';


import Sidebar from './Sidebar';
import './productsandservices.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SecondProductsAndServices from './SecondProductsAndServices';

const LOCAL_KEY = 'gd_categories';

function getStoredCategories() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
}

function setStoredCategories(categories) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(categories));
}

import React, { useState, useEffect } from 'react';

export default function ProductsAndServices() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [fields, setFields] = useState([{ label: '' }]);
  const [editIdx, setEditIdx] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editFields, setEditFields] = useState([{ label: '' }]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  // State for Add Product/Service modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  // State for products/services added in the selected category
  const PRODUCTS_LOCAL_KEY = 'gd_products_by_category';
  const [products, setProducts] = useState([]);

  // Load products for selected category
  useEffect(() => {
    if (selectedCategory && selectedCategory.title) {
      try {
        const all = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL_KEY)) || {};
        setProducts(all[selectedCategory.title] || []);
      } catch {
        setProducts([]);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  const openModal = () => {
    setShowModal(true);
    setNewTitle('');
    setNewImage('');
    setFields([{ label: '' }]);
    setEditIdx(null);
    setEditTitle('');
    setEditImage('');
    setEditFields([{ label: '' }]);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTitle('');
    setNewImage('');
    setFields([{ label: '' }]);
    setEditIdx(null);
    setEditTitle('');
    setEditImage('');
    setEditFields([{ label: '' }]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newCat = { title: newTitle.trim(), image: newImage, fields: fields.map(f => ({ label: f.label })) };
    const updated = [...categories, newCat];
    setCategories(updated);
    setStoredCategories(updated);
    closeModal();
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditTitle(categories[idx].title);
    setEditImage(categories[idx].image || '');
    setEditFields(categories[idx].fields && categories[idx].fields.length > 0 ? categories[idx].fields : [{ label: '' }]);
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    const updated = categories.map((cat, i) =>
      i === editIdx ? { ...cat, title: editTitle.trim(), image: editImage, fields: editFields.map(f => ({ label: f.label })) } : cat
    );
    setCategories(updated);
    setStoredCategories(updated);
    closeModal();
  };

  // Handle image upload and preview
  const handleImageChange = (e, isEdit) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditImage(reader.result);
      } else {
        setNewImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // For adding/removing fields in add/edit mode
  const handleAddField = () => {
    if (editIdx !== null) {
      setEditFields([...editFields, { label: '' }]);
    } else {
      setFields([...fields, { label: '' }]);
    }
  };
  const handleFieldChange = (idx, value) => {
    if (editIdx !== null) {
      setEditFields(editFields.map((f, i) => i === idx ? { ...f, label: value } : f));
    } else {
      setFields(fields.map((f, i) => i === idx ? { ...f, label: value } : f));
    }
  };
  const handleRemoveField = (idx) => {
    if (editIdx !== null) {
      if (editFields.length === 1) return;
      setEditFields(editFields.filter((_, i) => i !== idx));
    } else {
      if (fields.length === 1) return;
      setFields(fields.filter((_, i) => i !== idx));
    }
  };

  const handleDelete = (idx) => {
    if (!window.confirm('Delete this category?')) return;
    const updated = categories.filter((_, i) => i !== idx);
    setCategories(updated);
    setStoredCategories(updated);
  };

  // Navigation logic for category cards
  const handleCategoryClick = (cat, idx) => {
    setSelectedCategory({ ...cat, idx });
  };

  return (
    <div className="admin-products-root">
      <Sidebar />
      <div className="admin-products-main">
        {!selectedCategory ? (
          <>
            <h2 className="admin-products-title">Products & Services</h2>
            <button className="admin-add-btn" onClick={openModal}>Add Category</button>
            <div className="admin-category-list redesign-category-list">
              {categories.length === 0 && <div>No categories yet.</div>}
              {categories.map((cat, idx) => (
                <div
                  key={cat.title + idx}
                  className="redesign-category-card"
                  onClick={() => handleCategoryClick(cat, idx)}
                >
                  <div className="redesign-category-card-content">
                    <div className="redesign-category-card-imgwrap">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.title} className="redesign-category-card-img" />
                      ) : (
                        <div className="redesign-category-card-img redesign-category-card-img-placeholder">No Image</div>
                      )}
                    </div>
                    <div className="redesign-category-card-info">
                      <div className="redesign-category-card-title">{cat.title}</div>
                      {cat.fields && cat.fields.length > 0 && (
                        <ul className="redesign-category-card-fields">
                          {cat.fields.map((f, i) => (
                            <li key={i}>{f.label}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="redesign-category-card-actions">
                    <button className="redesign-category-card-btn" onClick={e => { e.stopPropagation(); handleEdit(idx); }}>Edit</button>
                    <button className="redesign-category-card-btn" onClick={e => { e.stopPropagation(); handleDelete(idx); }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <Dialog open={showModal} onClose={closeModal} maxWidth="xs" fullWidth>
              <DialogTitle>{editIdx !== null ? 'Edit' : 'Add'} Category</DialogTitle>
              <form onSubmit={editIdx !== null ? handleUpdate : handleAdd}>
                <DialogContent>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
                    {(editIdx !== null ? editImage : newImage) ? (
                      <img
                        src={editIdx !== null ? editImage : newImage}
                        alt="Category Preview"
                        style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8, border: '1px solid #ccc' }}
                      />
                    ) : (
                      <div style={{ width: 120, height: 120, background: '#eee', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', border: '1px solid #ccc' }}>
                        No Image
                      </div>
                    )}
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{ mb: 1 }}
                    >
                      {editIdx !== null ? 'Edit Picture' : 'Upload Picture'}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={e => handleImageChange(e, editIdx !== null)}
                      />
                    </Button>
                  </div>
                  <TextField
                    label="Category Title"
                    value={editIdx !== null ? editTitle : newTitle}
                    onChange={e => editIdx !== null ? setEditTitle(e.target.value) : setNewTitle(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeModal} color="secondary">Cancel</Button>
                  <Button type="submit" variant="contained">{editIdx !== null ? 'Update' : 'Add'}</Button>
                </DialogActions>
              </form>
            </Dialog>
          </>
        ) : (
          selectedCategory.idx === 0 || selectedCategory.idx > 0 ? (
            <div style={{padding:32}}>
              <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 18 }}>
                {selectedCategory.title}
              </h2>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    background: '#e6b800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    height: 56,
                    minWidth: 120,
                    padding: '0 32px',
                    fontWeight: 600,
                    fontSize: 20,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    background: '#e6b800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    height: 56,
                    minWidth: 220,
                    padding: '0 32px',
                    fontWeight: 600,
                    fontSize: 20,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Add Secondary Category
                </button>
                <button
                  style={{
                    background: '#fff',
                    color: '#e6b800',
                    border: '2px solid #e6b800',
                    borderRadius: 6,
                    height: 56,
                    minWidth: 220,
                    padding: '0 32px',
                    fontWeight: 600,
                    fontSize: 20,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setShowProductModal(true)}
                >
                  Add Product/Service
                </button>
              </div>
              {/* Product/Service Modal */}
              <Dialog open={showProductModal} onClose={() => setShowProductModal(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Add Product/Service</DialogTitle>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (!productTitle.trim() || !productDescription.trim()) return;
                  const newProduct = {
                    image: productImage,
                    title: productTitle,
                    description: productDescription
                  };
                  setProducts(prev => {
                    const updated = [...prev, newProduct];
                    // Save to localStorage by category
                    try {
                      const all = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL_KEY)) || {};
                      all[selectedCategory.title] = updated;
                      localStorage.setItem(PRODUCTS_LOCAL_KEY, JSON.stringify(all));
                    } catch {}
                    return updated;
                  });
                  setShowProductModal(false);
                  setProductImage("");
                  setProductTitle("");
                  setProductDescription("");
                }}>
                  <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
                      {productImage ? (
                        <img
                          src={productImage}
                          alt="Preview"
                          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8, border: '1px solid #ccc' }}
                        />
                      ) : (
                        <div style={{ width: 120, height: 120, background: '#eee', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', border: '1px solid #ccc' }}>
                          No Image
                        </div>
                      )}
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{ mb: 1 }}
                      >
                        Upload Picture
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setProductImage(reader.result);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </Button>
                    </div>
                    <TextField
                      label="Product/Service Title"
                      value={productTitle}
                      onChange={e => setProductTitle(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Description"
                      value={productDescription}
                      onChange={e => setProductDescription(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                      multiline
                      minRows={3}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setShowProductModal(false)} color="secondary">Cancel</Button>
                    <Button type="submit" variant="contained">Add</Button>
                  </DialogActions>
                </form>
              </Dialog>
              {/* List of added products/services */}
              <div style={{ marginTop: 32 }}>
                {products.length === 0 ? (
                  <div style={{ color: '#888', textAlign: 'center' }}>No products/services added yet.</div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
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
                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{prod.title}</div>
                        <div style={{ color: '#555', fontSize: 15 }}>{prod.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <SecondProductsAndServices category={selectedCategory} onBack={() => setSelectedCategory(null)} />
          )
        )}
      </div>
    </div>
  );
}
