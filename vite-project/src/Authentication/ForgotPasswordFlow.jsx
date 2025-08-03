
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import "./auth.css";

function ForgotPasswordStep({ onNext }) {
  const [email, setEmail] = useState("");
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
      <Button
        variant="contained"
        fullWidth
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={onNext}
      >
        Submit
      </Button>
    </div>
  );
}

function VerifyCodeStep({ onNext }) {
  const [code, setCode] = useState("");
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
      <Typography sx={{ fontSize: 13, mb: 3 }}>
        Didn't receive code? <span style={{ color: '#111', fontWeight: 500, cursor: 'pointer' }}>Resend</span>
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ background: "#F7C04A", color: "#111", fontWeight: 600, borderRadius: 2, boxShadow: "none", '&:hover': { background: '#e6b13d' } }}
        onClick={onNext}
      >
        Verify
      </Button>
    </div>
  );
}

function ResetPasswordStep() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="auth-card">
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Reset Password
      </Typography>
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
      >
        Set Password
      </Button>
    </div>
  );
}

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(0);
  return (
    <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {step === 0 && <ForgotPasswordStep onNext={() => setStep(1)} />}
      {step === 1 && <VerifyCodeStep onNext={() => setStep(2)} />}
      {step === 2 && <ResetPasswordStep />}
    </div>
  );
}
