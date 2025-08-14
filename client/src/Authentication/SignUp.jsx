import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormGroup
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

import { useLocation } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const accountType = params.get("type") || "customer";
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    role: accountType,
    agree: false,
  });
  const [type, setType] = useState(accountType);
  const navigate = useNavigate();

  useEffect(() => {
    setType(accountType);
    setForm((prev) => ({ ...prev, role: accountType }));
  }, [accountType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      await auth.register(form);
      setShowOTPModal(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const response = await auth.verifyOTP({
        email: form.email,
        otp
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (form.role === 'supplier') navigate('/supplier/dashboard');
      else navigate('/client/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-panel">
        <Box className="auth-form-panel">
          <Paper elevation={0} className="auth-form">
            <Typography variant="h5" align="left" gutterBottom className="auth-title">
              Get Started
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box className="auth-signup-grid">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  className="auth-input"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  className="auth-input"
                />
                <TextField
                  label="Middle Name"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  className="auth-input"
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  className="auth-input"
                />
                {type === 'supplier' && (
                  <TextField
                    label="Business Name"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                    className="auth-input"
                  />
                )}
                <TextField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  className={`auth-input${type !== 'supplier' ? ' auth-input-span' : ''}`}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  className="auth-input"
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  required
                  className="auth-input"
                />
              </Box>
              <FormGroup className="auth-checkbox-group">
                <FormControlLabel
                  control={<Checkbox name="agree" checked={form.agree} onChange={handleChange} required />}
                  label={<span>I agree to the <a href="#">terms & policy</a></span>}
                />
              </FormGroup>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="auth-btn"
              >
                Sign up
              </Button>
              <Typography align="center" className="auth-link-row">
                Have an account?{' '}
                <Link to="/login" className="auth-link-login">
                  Log in
                </Link>
              </Typography>
            </form>
          </Paper>
        </Box>
        <Box className="auth-side-panel">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Welcome to Goldust Creations</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;