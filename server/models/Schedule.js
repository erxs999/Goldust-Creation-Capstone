const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	type: { type: String, required: true }, // Supplier or Customer
	person: { type: String, required: true },
	date: { type: String, required: true }, // YYYY-MM-DD
	location: { type: String, required: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
