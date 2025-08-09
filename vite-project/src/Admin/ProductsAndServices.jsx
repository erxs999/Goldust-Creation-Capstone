

import React, { useState, useEffect } from 'react';

import SecondaryCategoryDetails from './SecondaryCategoryDetails';
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
                  onClick={() => setSelectedCategory({ ...cat, idx })}
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
          selectedCategory.idx === 0 ? (
            <CategoryDetails1 category={selectedCategory} onBack={() => setSelectedCategory(null)} />
          ) : (
            <SecondaryCategoryDetails category={selectedCategory} onBack={() => setSelectedCategory(null)} />
          )
        )}
      </div>
    </div>
  );
}
