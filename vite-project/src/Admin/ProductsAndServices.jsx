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
import ProductDetailsModal from '../Home/ProductDetailsModal';

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
  const [productPrice, setProductPrice] = useState("");
  const [showAdditionals, setShowAdditionals] = useState(false);
  const [additionals, setAdditionals] = useState([{ title: '', price: '', description: '' }]);
  // State for products/services added in the selected category
  const PRODUCTS_LOCAL_KEY = 'gd_products_by_category';
  const [products, setProducts] = useState([]);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Edit modal state
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editProductIdx, setEditProductIdx] = useState(null);
  const [editProductData, setEditProductData] = useState({ image: '', title: '', price: '', description: '', additionals: [] });

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

  // Handler to open edit modal with product data
  const handleEditProduct = () => {
    if (!selectedProduct) return;
    setEditProductData(selectedProduct);
    setEditProductIdx(products.findIndex(p => p === selectedProduct));
    setShowEditProductModal(true);
    setShowProductDetails(false);
  };

  // Handler to save edited product
  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editProductData.title.trim() || !editProductData.description.trim() || !editProductData.price.trim()) return;
    const updatedProducts = products.map((p, i) => i === editProductIdx ? editProductData : p);
    setProducts(updatedProducts);
    // Save to localStorage if needed
    const PRODUCTS_LOCAL_KEY = 'gd_products_by_category';
    if (selectedCategory && selectedCategory.title) {
      const all = JSON.parse(localStorage.getItem(PRODUCTS_LOCAL_KEY) || '{}');
      all[selectedCategory.title] = updatedProducts;
      localStorage.setItem(PRODUCTS_LOCAL_KEY, JSON.stringify(all));
    }
    setShowEditProductModal(false);
  };

  return (
    <div className="admin-products-root">
      <Sidebar />
      <div className="admin-products-main">
        {!selectedCategory ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 className="admin-products-title" style={{ margin: 0, fontWeight: 800, fontSize: 34, color: '#232323', letterSpacing: '-1px' }}>Products & Services</h2>
              <button
                className="admin-add-btn"
                style={{
                  background: '#e6b800',
                  color: '#fff',
                  border: '2px solid #e6b800',
                  borderRadius: 6,
                  height: 38,
                  minWidth: 140,
                  padding: '0 14px',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onClick={openModal}
              >
                Add Category
              </button>
            </div>
            <div className="admin-category-list redesign-category-list" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
              justifyContent: 'flex-start',
              width: '100%'
            }}>
              {categories.length === 0 && <div>No categories yet.</div>}
              {categories.map((cat, idx) => (
                <div
                  key={cat.title + idx}
                  className="redesign-category-card"
                  style={{
                    position: 'relative',
                    border: 'none',
                    borderRadius: 0,
                    padding: 0,
                    minWidth: 340,
                    maxWidth: 420,
                    width: 380,
                    background: '#fff',
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    overflow: 'hidden',
                    margin: '0 24px 24px 0',
                  }}
                  onClick={() => handleCategoryClick(cat, idx)}
                >
                  {/* Delete IconButton only, top right, like PnSDetails */}
                  <IconButton
                    aria-label="Delete"
                    size="small"
                    onClick={e => { e.stopPropagation(); handleDelete(idx); }}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: '#fff',
                      zIndex: 2,
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                    }}
                  >
                    <DeleteIcon style={{ color: '#e53935', fontSize: 24 }} />
                  </IconButton>
                    {/* Edit and Delete IconButtons, top right, like PnSDetails */}
                    <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, display: 'flex', gap: 4 }}>
                      <IconButton
                        aria-label="Edit"
                        size="small"
                        onClick={e => { e.stopPropagation(); handleEdit(idx); }}
                        style={{
                          background: '#fff',
                          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                          marginRight: 2,
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e6b800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        size="small"
                        onClick={e => { e.stopPropagation(); handleDelete(idx); }}
                        style={{
                          background: '#fff',
                          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                        }}
                      >
                        <DeleteIcon style={{ color: '#e53935', fontSize: 24 }} />
                      </IconButton>
                    </div>
                  {/* Image flush to top, left, right */}
                  {cat.image ? (
                    <img src={cat.image} alt={cat.title} style={{
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
                  {/* Title */}
                  <div style={{ padding: 24, paddingTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 6, textAlign: 'left', width: '100%' }}>{cat.title}</div>
                    {cat.fields && cat.fields.length > 0 && (
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#888', fontWeight: 500, fontSize: 15 }}>
                        {cat.fields.map((f, i) => (
                          <li key={i}>{f.label}</li>
                        ))}
                      </ul>
                    )}
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
            <div style={{ padding: '0px 48px 0 0px', maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                <h2 style={{ fontWeight: 900, fontSize: 35, margin: 0 }}>
                  {selectedCategory.title}
                </h2>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="admin-back-btn"
                    style={{
                      background: '#e53935',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      height: 38,
                      minWidth: 80,
                      padding: '0 14px',
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                  >
                    Back
                  </button>
                <style>{`
                  .admin-back-btn:hover {
                    background: #b71c1c;
                  }
                `}</style>
                  <button
                    style={{
                      background: '#e6b800',
                      color: '#fff',
                      border: '2px solid #e6b800',
                      borderRadius: 6,
                      height: 38,
                      minWidth: 140,
                      padding: '0 14px',
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => setShowProductModal(true)}
                  >
                    Add Product/Service
                  </button>
                </div>
              </div>
              {/* Product/Service Modal */}
              <Dialog open={showProductModal} onClose={() => setShowProductModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add Product/Service</DialogTitle>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (!productTitle.trim() || !productDescription.trim() || !productPrice.trim()) return;
                  const newProduct = {
                    image: productImage,
                    title: productTitle,
                    description: productDescription,
                    price: productPrice,
                    additionals: showAdditionals ? additionals.filter(a => a.description && a.price) : []
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
                  setProductPrice("");
                  setAdditionals([{ description: '', price: '' }]);
                  setShowAdditionals(false);
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
                      label="Price"
                      type="number"
                      value={productPrice}
                      onChange={e => setProductPrice(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{ min: 0, step: 'any' }}
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
                    <Button
                      variant={showAdditionals ? "contained" : "outlined"}
                      color={showAdditionals ? "primary" : "secondary"}
                      onClick={e => { e.preventDefault(); setShowAdditionals(v => !v); }}
                      sx={{ mt: 2, mb: 1 }}
                    >
                      {showAdditionals ? "Remove Additionals" : "Add Additionals"}
                    </Button>
                    {showAdditionals && (
                      <div style={{ marginTop: 8, marginBottom: 8, overflowX: 'hidden', padding: '0 8px' }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>Additionals</div>
                        {additionals.map((add, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16, width: '100%' }}>
                            <TextField
                              label="Title"
                              value={add.title}
                              onChange={e => setAdditionals(additionals.map((a, i) => i === idx ? { ...a, title: e.target.value } : a))}
                            />
                            <TextField
                              label="Price"
                              type="number"
                              value={add.price}
                              onChange={e => setAdditionals(additionals.map((a, i) => i === idx ? { ...a, price: e.target.value } : a))}
                              inputProps={{ min: 0, step: 'any' }}
                            />
                            <TextField
                              label="Description"
                              value={add.description}
                              onChange={e => setAdditionals(additionals.map((a, i) => i === idx ? { ...a, description: e.target.value } : a))}
                              multiline
                              minRows={2}
                            />
                          </div>
                        ))}
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setAdditionals([...additionals, { title: '', price: '', description: '' }])}>
                          Add Additional
                        </Button>
                      </div>
                    )}
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
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
                      {products.map((prod, idx) => (
                        <div
                          key={idx}
                          className="admin-pns-card"
                          style={{
                            position: 'relative',
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
                          onClick={() => {
                            setSelectedProduct(prod);
                            setShowProductDetails(true);
                          }}
                        >
                          <IconButton
                            aria-label="Delete"
                            size="small"
                            onClick={e => { e.stopPropagation(); /* delete logic here */ }}
                            style={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              background: '#fff',
                              zIndex: 2,
                            }}
                          >
                            <DeleteIcon style={{ color: '#e53935' }} fontSize="small" />
                          </IconButton>
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
                          <div style={{ padding: 24, paddingTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, textAlign: 'left', width: '100%' }}>{prod.title}</div>
                            {prod.price && (
                              <div style={{ textAlign: 'left', color: '#888', fontWeight: 600, fontSize: 15, marginBottom: 4, width: '100%' }}>
                                PHP {prod.price}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    <style>{`
                      .admin-pns-card:hover {
                        box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
                        transform: translateY(-8px);
                      }
                    `}</style>
                    </div>
                    <ProductDetailsModal
                      open={showProductDetails}
                      onClose={() => setShowProductDetails(false)}
                      product={selectedProduct}
                      onEdit={handleEditProduct}
                    />
                    {/* Edit Product Modal */}
                    <Dialog open={showEditProductModal} onClose={() => setShowEditProductModal(false)} maxWidth="sm" fullWidth>
                      <DialogTitle>Edit Product/Service</DialogTitle>
                      <form onSubmit={handleSaveEditProduct}>
                        <DialogContent>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
                            {editProductData.image ? (
                              <img
                                src={editProductData.image}
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
                                  reader.onloadend = () => {
                                    setEditProductData({ ...editProductData, image: reader.result });
                                  };
                                  reader.readAsDataURL(file);
                                }}
                              />
                            </Button>
                          </div>
                          <TextField
                            label="Product/Service Title"
                            value={editProductData.title}
                            onChange={e => setEditProductData({ ...editProductData, title: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                          />
                          <TextField
                            label="Price"
                            type="number"
                            value={editProductData.price}
                            onChange={e => setEditProductData({ ...editProductData, price: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                            inputProps={{ min: 0, step: 'any' }}
                          />
                          <TextField
                            label="Description"
                            value={editProductData.description}
                            onChange={e => setEditProductData({ ...editProductData, description: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                            multiline
                            minRows={3}
                          />
                          {/* Additionals editing can be added here if needed */}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setShowEditProductModal(false)} color="secondary">Cancel</Button>
                          <Button type="submit" variant="contained">Save</Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </>
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
