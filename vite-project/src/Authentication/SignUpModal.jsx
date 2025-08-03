import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import "./auth.css";

const options = [
  {
    key: 'customer',
    label: 'Customer',
    icon: <PersonIcon className="signup-modal-icon" />,
    desc: 'Shop, order, and enjoy our services as a valued customer.'
  },
  {
    key: 'supplier',
    label: 'Supplier',
    icon: <StorefrontIcon className="signup-modal-icon" />,
    desc: 'Sell your products and manage your business as a supplier.'
  }
];

const SignUpModal = ({ open, onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
      setSelected(null);
    }
  };

  const handleClose = () => {
    setSelected(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle className="signup-modal-title">Choose Account Type</DialogTitle>
      <DialogContent>
        <Box className="signup-modal-options">
          {options.map(opt => (
            <Box
              key={opt.key}
              className={`signup-modal-option${selected === opt.key ? ' selected' : ''}`}
              onClick={() => setSelected(opt.key)}
            >
              <Avatar className="signup-modal-avatar">
                {opt.icon}
              </Avatar>
              <Box>
                <Typography className="signup-modal-label">{opt.label}</Typography>
                <Typography className="signup-modal-desc">{opt.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions className="signup-modal-actions">
        <Button
          variant="contained"
          disabled={!selected}
          onClick={handleContinue}
          className="signup-modal-continue"
        >
          Continue
        </Button>
        <Button onClick={handleClose} className="signup-modal-cancel">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpModal;
