const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    businessName: { type: String },
    role: { type: String, enum: ['customer', 'supplier', 'admin'], default: 'customer' },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: {
        code: String,
        expires: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
