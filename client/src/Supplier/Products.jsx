import React from 'react';
import SupplierSidebar from './SupplierSidebar';

const Products = () => {
  return (
    <div style={{display:'flex'}}>
      <SupplierSidebar />
      <div style={{flex:1, padding:'32px'}}>
        <h2>Products</h2>
        <p>Manage your products here.</p>
      </div>
    </div>
  );
};

export default Products;
