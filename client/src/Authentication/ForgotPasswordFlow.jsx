
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import "./auth.css";

function ForgotPasswordStep({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await auth.forgotPassword(email);
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Forgot your Password?
      </Typography>
      <Typography sx={{ mb: 2 }}>Enter your email to recover your password</Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 4 }}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={handleSubmit}
      >
        {loading ? "Sending..." : "Submit"}
      </Button>
    </div>
  );
}

function VerifyCodeStep({ onNext }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      await auth.verifyOTP({
        email: localStorage.getItem('resetEmail'),
        otp: code
      });
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await auth.resendOTP(localStorage.getItem('resetEmail'));
      alert("New code sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="auth-card">
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Verify Code
      </Typography>
      <Typography sx={{ mb: 2 }}>Enter code</Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        placeholder="Enter code"
        value={code}
        onChange={e => setCode(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 1 }}
      />
      <Typography sx={{ fontSize: 13, mb: 3 }}>
        Didn't receive code? <span style={{ color: '#111', fontWeight: 500, cursor: 'pointer' }} onClick={handleResend}>Resend</span>
      </Typography>
      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={handleVerify}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}

function ResetPasswordStep() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await auth.resetPassword({
        token: localStorage.getItem('resetToken'),
        password
      });
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetToken');
      alert("Password reset successful!");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Reset Password
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Enter Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 4 }}
      />
      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={handleReset}
      >
        {loading ? "Resetting..." : "Set Password"}
      </Button>
    </div>
  );
}

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (submittedEmail) => {
    setEmail(submittedEmail);
    localStorage.setItem('resetEmail', submittedEmail);
    setStep(1);
  };

  const handleOTPVerified = () => {
    setStep(2);
  };

  return (
    <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {step === 0 && <ForgotPasswordStep onNext={handleEmailSubmit} />}
      {step === 1 && <VerifyCodeStep onNext={handleOTPVerified} />}
      {step === 2 && <ResetPasswordStep />}
    </div>
  );
}
