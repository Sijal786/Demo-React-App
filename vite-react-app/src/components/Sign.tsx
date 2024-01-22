// Example React component
import React, { useState } from 'react';
import axios from 'axios';

const Sign = () => {
  const [customerId, setCustomerId] = useState(null);

  const handleCreateCustomer = async () => {
    try {
      const response = await axios.post('http://localhost:5173/v1/customers', {
        email: 'customer@example.com',
        name: 'John Doe',
      });

      setCustomerId(response.data.customerId);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div>
      <h1>Stripe Customer Registration</h1>
      <button onClick={handleCreateCustomer}>Create Customer</button>
      {customerId && <p>Customer ID: {customerId}</p>}
    </div>
  );
};

export default Sign;
