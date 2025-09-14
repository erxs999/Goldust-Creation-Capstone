const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// ...existing code...

// ...existing code...

// Authentication DB connection (for supplier and customer)
// Authentication DB connection (for supplier and customer)
const authConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
authConnection.on('connected', () => console.log('MongoDB authentication connected!'));
authConnection.on('error', err => console.error('MongoDB authentication connection error:', err));

// Supplier schema/model
const supplierSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: String,
  contact: String,
  createdAt: { type: Date, default: Date.now }
});
const Supplier = authConnection.model('Supplier', supplierSchema);

// Customer schema/model
const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  contact: String,
  createdAt: { type: Date, default: Date.now }
});
const Customer = authConnection.model('Customer', customerSchema);

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5051;
// const User = require('./models/User');
// const auth = require('./middleware/auth');

app.use(cors());


// Main DB for ProductsAndServices
const MONGO_URI = 'mongodb://127.0.0.1:27017/ProductsAndServices';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB ProductsAndServices connected!'))
  .catch(err => console.error('MongoDB ProductsAndServices connection error:', err));

// Booking DB connection
const bookingConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
bookingConnection.on('connected', () => console.log('MongoDB booking connected!'));
bookingConnection.on('error', err => console.error('MongoDB booking connection error:', err));

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

// CART schema/model/routes (must be after mongoose init)
const cartItemSchema = new mongoose.Schema({
  product: Object, // store product snapshot
  createdAt: { type: Date, default: Date.now }
});
const CartItem = mongoose.model('CartItem', cartItemSchema);

// BOOKING SCHEMAS/MODELS (using bookingConnection)
const bookingBaseSchema = new mongoose.Schema({
  userId: String,
  name: String,
  contact: String,
  email: String,
  eventType: String,
  date: Date,
  eventVenue: String,
  guestCount: Number,
  totalPrice: Number,
  products: [
    {
      image: String,
      title: String,
      price: Number
    }
  ],
  specialRequest: String,
  service: String,
  details: Object,
  createdAt: { type: Date, default: Date.now }
});
const PendingBooking = bookingConnection.model('PendingBooking', bookingBaseSchema);
const ApprovedBooking = bookingConnection.model('ApprovedBooking', bookingBaseSchema);
const FinishedBooking = bookingConnection.model('FinishedBooking', bookingBaseSchema);

// Get all cart items
app.get('/api/cart', async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});

// Add to cart
app.post('/api/cart', async (req, res) => {
  const item = new CartItem({ product: req.body });
  await item.save();
  res.status(201).json(item);
});

// Delete from cart
app.delete('/api/cart/:id', async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// BOOKING ROUTES
// Pending Bookings
app.get('/api/bookings/pending', async (req, res) => {
  const bookings = await PendingBooking.find();
  res.json(bookings);
});
app.post('/api/bookings/pending', async (req, res) => {
  const booking = new PendingBooking(req.body);
  await booking.save();
  res.status(201).json(booking);
});
app.delete('/api/bookings/pending/:id', async (req, res) => {
  await PendingBooking.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Approved Bookings
app.get('/api/bookings/approved', async (req, res) => {
  const bookings = await ApprovedBooking.find();
  res.json(bookings);
});
app.post('/api/bookings/approved', async (req, res) => {
  const booking = new ApprovedBooking(req.body);
  await booking.save();
  res.status(201).json(booking);
});
app.delete('/api/bookings/approved/:id', async (req, res) => {
  await ApprovedBooking.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Finished Bookings
app.get('/api/bookings/finished', async (req, res) => {
  const bookings = await FinishedBooking.find();
  res.json(bookings);
});
app.post('/api/bookings/finished', async (req, res) => {
  const booking = new FinishedBooking(req.body);
  await booking.save();
  res.status(201).json(booking);
});
app.delete('/api/bookings/finished/:id', async (req, res) => {
  await FinishedBooking.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

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



// AUTH ROUTES

// Register Supplier
app.post('/api/auth/register-supplier', async (req, res) => {
  try {
    const { email, password, companyName, contact } = req.body;
    if (!email || !password || !companyName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Check if supplier already exists
    const existing = await Supplier.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Supplier already exists' });
    }
    // Create new supplier
    const supplier = new Supplier({ email, password, companyName, contact });
    await supplier.save();
    res.status(201).json({ message: 'Supplier registered successfully', user: supplier });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Register Customer
app.post('/api/auth/register-customer', async (req, res) => {
  try {
    const { email, password, firstName, lastName, contact } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Check if customer already exists
    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Customer already exists' });
    }
    // Create new customer
    const customer = new Customer({ email, password, firstName, lastName, contact });
    await customer.save();
    res.status(201).json({ message: 'Customer registered successfully', user: customer });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
