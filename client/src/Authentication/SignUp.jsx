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
  FormGroup,
  Select,
  FormControl,
  InputLabel
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
    role: "user",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!form.agree) {
      setError("Please agree to the terms and policy");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5051/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          middleName: form.middleName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
                <FormControl fullWidth margin="dense" className="auth-input">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
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