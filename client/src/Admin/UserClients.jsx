import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './userclients.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../services/api';

export default function UserClients() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    api.get('/customers')
      .then(res => setCustomers(res.data))
      .catch(() => setCustomers([]));
  }, []);
  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-userclients-root">
          <h2>Users / Clients</h2>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.firstName}</TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.middleName || ''}</TableCell>
                    <TableCell>{customer.contact || customer.phone || ''}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>******</TableCell>
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
