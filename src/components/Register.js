import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); 
    setErrorMessage(''); 
    try {
      const res = await axios.post('http://localhost:3001/api/user/register', { username, password });
      setSuccessMessage('Registration successful! Redirecting to login...');
      
      setTimeout(() => history.push('/login'), 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); 
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Register;