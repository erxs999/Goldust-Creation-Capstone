import React from 'react';
import SupplierSidebar from './SupplierSidebar';

const SupplierHome = () => {
  return (
    <div style={{display:'flex'}}>
      <SupplierSidebar />
      <div style={{flex:1, padding:'32px'}}>
        <h2>Supplier Home</h2>
        <p>Welcome to the supplier dashboard.</p>
      </div>
    </div>
  );
};

export default SupplierHome;
