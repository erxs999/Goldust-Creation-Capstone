import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './categorydetails.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography } from '@mui/material';

const getLocalKey = (category) => `gd_category_details_${category.title || category.id}`;

export default function CategoryDetails({ category, onAddSubCategory }) {
  const [showModal, setShowModal] = useState(false);
  const [showSecondaryModal, setShowSecondaryModal] = useState(false);
  const localKey = getLocalKey(category);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [secondaryCategories, setSecondaryCategories] = useState([]);
  const [secondaryCategory, setSecondaryCategory] = useState({ title: '', image: null });
  const [secondaryImagePreview, setSecondaryImagePreview] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(localKey));
      if (data) {
        setProducts(data.products || []);
        setSecondaryCategories(data.secondaryCategories || []);
      } else {
        setProducts(category.products || []);
        setSecondaryCategories(category.secondaryCategories || []);
      }
    } catch {
      setProducts(category.products || []);
      setSecondaryCategories(category.secondaryCategories || []);
    }
    // eslint-disable-next-line
  }, [localKey]);

  // Save to localStorage when products or secondaryCategories change
  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify({
      products,
      secondaryCategories
    }));
  }, [products, secondaryCategories, localKey]);


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct({ title: '', description: '', image: null });
    setImagePreview(null);
  };

  const handleOpenSecondaryModal = () => setShowSecondaryModal(true);
  const handleCloseSecondaryModal = () => {
    setShowSecondaryModal(false);
    setSecondaryCategory({ title: '', image: null });
    setSecondaryImagePreview(null);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecondaryInputChange = (e) => {
    const { name, value } = e.target;
    setSecondaryCategory((prev) => ({ ...prev, [name]: value }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSecondaryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSecondaryCategory((prev) => ({ ...prev, image: file }));
      setSecondaryImagePreview(URL.createObjectURL(file));
    }
  };


  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      image: imagePreview,
      id: Date.now(),
    };
    setProducts((prev) => [...prev, productToAdd]);
    handleCloseModal();
  };

  const handleAddSecondaryCategory = (e) => {
    e.preventDefault();
    const secCatToAdd = {
      ...secondaryCategory,
      image: secondaryImagePreview,
      id: Date.now(),
    };
    setSecondaryCategories((prev) => [...prev, secCatToAdd]);
    handleCloseSecondaryModal();
  };

  // Edit and Delete handlers for products and secondary categories
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };
  const handleDeleteSecondaryCategory = (id) => {
    setSecondaryCategories((prev) => prev.filter((c) => c.id !== id));
  };
  // Placeholder for edit (implement as needed)
  const handleEditProduct = (id) => {
    alert('Edit product ' + id);
  };
  const handleEditSecondaryCategory = (id) => {
    alert('Edit secondary category ' + id);
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main" style={{ marginLeft: '-40px' }}>
        <div className="category-details-root" style={{ minHeight: '100vh', boxSizing: 'border-box', width: 'auto' }}>
          {/* Header bar: title left, buttons right, both with consistent margin */}
          <div style={{ width: '100%', marginBottom: 32, minHeight: 80 }}>
            <Typography
              variant="h4"
              sx={{ color: '#111', fontWeight: 700, letterSpacing: 0 }}
            >
              {category.title}
            </Typography>
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <Button
                variant="contained"
                onClick={handleOpenSecondaryModal}
                sx={{ backgroundColor: '#d4af37', color: '#fff', fontWeight: 400, fontSize: '1rem', px: 3, py: 1, borderRadius: '8px', boxShadow: 'none', minWidth: 0, '&:hover': { backgroundColor: '#b58f1b' } }}
              >
                Add Secondary Category
              </Button>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{ backgroundColor: '#ff9800', color: '#fff', fontWeight: 400, fontSize: '1rem', px: 3, py: 1, borderRadius: '8px', boxShadow: 'none', minWidth: 0, '&:hover': { backgroundColor: '#fb8c00' } }}
              >
                Add Services or Products
              </Button>
            </div>
          </div>
          {/* No image, just the header/title flush left */}

          {/* Modal for adding secondary category */}
          <Dialog open={showSecondaryModal} onClose={handleCloseSecondaryModal} maxWidth="xs" fullWidth>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={handleAddSecondaryCategory} sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 140, height: 140, background: '#eee', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, border: '1px solid #ddd' }}>
                    {secondaryImagePreview ? (
                      <img src={secondaryImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                    ) : (
                      <span style={{ color: '#888', fontSize: 20 }}>No Image</span>
                    )}
                  </div>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ color: '#1976d2', borderColor: '#1976d2', fontWeight: 500, mb: 1 }}
                  >
                    Upload Picture
                    <input type="file" accept="image/*" hidden onChange={handleSecondaryImageChange} />
                  </Button>
                </Box>
                <TextField
                  label="Category Title *"
                  name="title"
                  value={secondaryCategory.title}
                  onChange={handleSecondaryInputChange}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{ style: { color: '#222' } }}
                />
                <DialogActions sx={{ px: 0, pt: 2, width: '100%' }}>
                  <Button onClick={handleCloseSecondaryModal} sx={{ color: '#a259c6', fontWeight: 600 }}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#d4af37', color: '#fff', fontWeight: 600, flex: 1, ml: 2, '&:hover': { backgroundColor: '#b58f1b' } }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Modal for adding product/service */}
          <Dialog open={showModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
            <DialogTitle>Add Product or Service</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={handleAddProduct} sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 140, height: 140, background: '#eee', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, border: '1px solid #ddd' }}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                    ) : (
                      <span style={{ color: '#888', fontSize: 20 }}>No Image</span>
                    )}
                  </div>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ color: '#1976d2', borderColor: '#1976d2', fontWeight: 500, mb: 1 }}
                  >
                    Upload Picture
                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                  </Button>
                </Box>
                <TextField
                  label="Title"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{ style: { color: '#222' } }}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  multiline
                  minRows={2}
                  InputProps={{ style: { color: '#222' } }}
                />
                <DialogActions sx={{ px: 0, pt: 2, width: '100%' }}>
                  <Button onClick={handleCloseModal} sx={{ color: '#a259c6', fontWeight: 600 }}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#ff9800', color: '#fff', fontWeight: 600, flex: 1, ml: 2, '&:hover': { backgroundColor: '#fb8c00' } }}
                  >
                    Add
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Secondary Categories Section */}
          <div style={{ marginBottom: 40 }}>
            <Typography variant="h6" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>Secondary Categories</Typography>
            <div className="redesign-category-list">
              {secondaryCategories.length === 0 ? (
                <Typography sx={{ color: '#888', fontWeight: 400, mt: 2 }}>No secondary categories yet.</Typography>
              ) : (
                secondaryCategories.map((cat) => (
                  <div className="redesign-category-card" key={cat.id}>
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
                      </div>
                    </div>
                    <div className="redesign-category-card-actions">
                      <button className="redesign-category-card-btn" onClick={() => handleEditSecondaryCategory(cat.id)}>Edit</button>
                      <button className="redesign-category-card-btn" onClick={() => handleDeleteSecondaryCategory(cat.id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Products/Services Section */}
          <div>
            <Typography variant="h6" sx={{ color: '#222', fontWeight: 700, mb: 2 }}>Services & Products</Typography>
            <div className="redesign-category-list">
              {products.length === 0 ? (
                <Typography sx={{ color: '#888', fontWeight: 400, mt: 2 }}>No products or services yet.</Typography>
              ) : (
                products.map((prod) => (
                  <div className="redesign-category-card" key={prod.id}>
                    <div className="redesign-category-card-content">
                      <div className="redesign-category-card-imgwrap">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.title} className="redesign-category-card-img" />
                        ) : (
                          <div className="redesign-category-card-img redesign-category-card-img-placeholder">No Image</div>
                        )}
                      </div>
                      <div className="redesign-category-card-info">
                        <div className="redesign-category-card-title">{prod.title}</div>
                        <div style={{ color: '#666', fontSize: '1rem', marginTop: 4 }}>{prod.description}</div>
                      </div>
                    </div>
                    <div className="redesign-category-card-actions">
                      <button className="redesign-category-card-btn" onClick={() => handleEditProduct(prod.id)}>Edit</button>
                      <button className="redesign-category-card-btn" onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
