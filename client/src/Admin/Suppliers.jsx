
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './suppliers.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch('http://localhost:5051/api/suppliers');
        if (!res.ok) throw new Error('Failed to fetch suppliers');
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);
  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <main className="admin-dashboard-main">
        <div className="admin-suppliers-root">
          <h2>Suppliers</h2>
          {loading ? (
            <p>Loading suppliers...</p>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Middle Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {error ? null : suppliers.length > 0 ? (
                    suppliers.map((supplier) => (
                      <TableRow key={supplier._id}>
                        <TableCell>{supplier.companyName}</TableCell>
                        <TableCell>{supplier.firstName}</TableCell>
                        <TableCell>{supplier.lastName}</TableCell>
                        <TableCell>{supplier.middleName}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.password}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No suppliers found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </main>
    </div>
  );
}
