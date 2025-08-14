import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import SignUpModal from "./SignUpModal";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

const Login = () => {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await auth.login({
        email: form.emailOrPhone,
        password: form.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      const role = response.data.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'supplier') navigate('/supplier/dashboard');
      else navigate('/client/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="emailOrPhone"
                value={form.emailOrPhone}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                className="auth-input"
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
              <Box className="auth-form-row">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<span className="auth-checkbox-label">Remember me</span>}
                  />
                </FormGroup>
                <span className="auth-link-forgot" style={{ cursor: 'pointer' }} onClick={() => navigate('/forgot-password')}>
                  Forgot your password?
                </span>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="auth-btn"
              >
                Log in
              </Button>
              <Typography align="center" className="auth-link-row">
                Don't have an account?{' '}
                <span
                  className="auth-link-signup"
                  onClick={() => setShowSignUpModal(true)}
                >
                  Sign Up
                </span>
              </Typography>
              {showSignUpModal && (
                <SignUpModal
                  open={showSignUpModal}
                  onClose={() => setShowSignUpModal(false)}
                  onSelect={(type) => {
                    setShowSignUpModal(false);
                    navigate(`/signup?type=${type}`);
                  }}
                />
              )}
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

export default Login;