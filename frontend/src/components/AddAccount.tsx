import React from 'react';
import axios from 'axios';

const AddAccount: React.FC = () => {
  const handleLogin = async () => {
    try {
      const response = await axios.get('/api/auth/outlook');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during Outlook login:', error);
    }
  };

  return (
    <div className="AddAccount">
      <h2>Add Your Outlook Account</h2>
      <button onClick={handleLogin}>Login with Outlook</button>
    </div>
  );
};

export default AddAccount;
