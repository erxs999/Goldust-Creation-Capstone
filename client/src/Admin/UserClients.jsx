
import React from 'react';
import Sidebar from './Sidebar';
import './userclients.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function UserClients() {
  // Temporary customers data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '09171234567', address: 'Manila' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '09181234567', address: 'Quezon City' },
    { id: 3, name: 'Anna Santos', email: 'anna.santos@email.com', phone: '09191234567', address: 'Makati' },
  ];
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.address}</TableCell>
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
