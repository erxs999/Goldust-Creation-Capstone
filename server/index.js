
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5051;

app.use(cors());

// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/ProductsAndServices';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Category schema and model
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  fields: [{ label: String }],
});
const Category = mongoose.model('Category', categorySchema);

// Product schema and model
const productSchema = new mongoose.Schema({
  image: String,
  title: { type: String, required: true },
  description: String,
  price: String,
  additionals: [{ title: String, price: String, description: String }],
  categoryTitle: String, // reference to category title
});
const Product = mongoose.model('Product', productSchema);

// Example route
app.get('/', (req, res) => res.send('Server running with MongoDB!'));

// CATEGORY ROUTES
// Get all categories
app.get('/api/categories', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});
// Add a category
app.post('/api/categories', async (req, res) => {
  const cat = new Category(req.body);
  await cat.save();
  res.status(201).json(cat);
});
// Update a category
app.put('/api/categories/:id', async (req, res) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cat);
});
// Delete a category
app.delete('/api/categories/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// PRODUCT ROUTES
// Get all products for a category
app.get('/api/products/:categoryTitle', async (req, res) => {
  const products = await Product.find({ categoryTitle: req.params.categoryTitle });
  res.json(products);
});
// Add a product
app.post('/api/products', async (req, res) => {
  const prod = new Product(req.body);
  await prod.save();
  res.status(201).json(prod);
});
// Update a product
app.put('/api/products/:id', async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(prod);
});
// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
