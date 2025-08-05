import React from 'react';
import SupplierSidebar from './SupplierSidebar';

const Message = () => {
  return (
    <div style={{display:'flex'}}>
      <SupplierSidebar />
      <div style={{flex:1, padding:'32px'}}>
        <h2>Messages</h2>
        <p>Check your messages here.</p>
      </div>
    </div>
  );
};

export default Message;
