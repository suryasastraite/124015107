import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [formData, setFormData] = useState({
    ownerName: '',
    rollNo: '',
    ownerEmail: '',
    accessCode: '',
  });

  const [authToken, setAuthToken] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to your server
      const response = await axios.post('/register', formData);
      
      // Extract credentials from the response
      const { clientID, clientSecret } = response.data;

      // Use credentials to authenticate with the railway server
      const authResponse = await axios.post('http://20.244.56.144/train/authenticate', {
        clientID,
        clientSecret,
      });

      // Set the authentication token
      setAuthToken(authResponse.data.authToken);
      setRegistrationSuccess(true);

      // Clear registration form
      setFormData({
        ownerName: '',
        rollNo: '',
        ownerEmail: '',
        accessCode: '',
      });
    } catch (error) {
      // Handle registration or authentication errors
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      {registrationSuccess ? (
        <p>Registration successful! You are now authenticated.</p>
      ) : (
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rollNo"
            placeholder="University Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="ownerEmail"
            placeholder="Email"
            value={formData.ownerEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="accessCode"
            placeholder="Access Code"
            value={formData.accessCode}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}





