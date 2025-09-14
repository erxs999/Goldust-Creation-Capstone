
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import "./auth.css";

function ForgotPasswordStep({ onNext }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      onNext(email);
    } catch (err) {
      setError(err.message);
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
      <TextField
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 4 }}
      />
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Button
        variant="contained"
        fullWidth
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit"}
      </Button>
    </div>
  );
}

function VerifyCodeStep({ email, onNext, onResend }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code");
      onNext();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend code");
      if (onResend) onResend();
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-card">
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Verify Code
      </Typography>
      <Typography sx={{ mb: 2 }}>Enter code</Typography>
      <TextField
        placeholder="Enter code"
        value={code}
        onChange={e => setCode(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 1 }}
      />
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Typography sx={{ fontSize: 13, mb: 3 }}>
        Didn't receive code? <span style={{ color: '#111', fontWeight: 500, cursor: 'pointer' }} onClick={handleResend}>{resending ? 'Resending...' : 'Resend'}</span>
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}

function ResetPasswordStep({ email, onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
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
      {success ? (
        <Typography color="success.main" sx={{ mb: 2 }}>
          Password reset successful! You can now log in.
        </Typography>
      ) : (
        <>
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
            sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Setting..." : "Set Password"}
          </Button>
        </>
      )}
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
      {step === 1 && <VerifyCodeStep email={email} onNext={handleOTPVerified} />}
      {step === 2 && <ResetPasswordStep email={email} />}
    </div>
  );
}
