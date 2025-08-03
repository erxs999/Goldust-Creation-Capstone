
import React from 'react';
import Sidebar from './Sidebar';
import './suppliers.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Suppliers() {
  // Temporary suppliers data
  const suppliers = [
    { id: 1, name: 'ABC Catering', contact: 'Maria Lopez', phone: '09171234567', email: 'abc@catering.com' },
    { id: 2, name: 'Event Rentals PH', contact: 'Juan Dela Cruz', phone: '09181234567', email: 'rentals@eventph.com' },
    { id: 3, name: 'Floral Designs', contact: 'Anna Santos', phone: '09191234567', email: 'anna@floraldesigns.com' },
  ];
  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-suppliers-root">
          <h2>Suppliers</h2>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact Person</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </div>
  );
}
