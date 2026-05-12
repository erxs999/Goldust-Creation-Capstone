const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  fields: [{ label: String }],
  events: [{ type: String }], 
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);