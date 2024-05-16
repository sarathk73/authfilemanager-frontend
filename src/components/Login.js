import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    try {
      const res = await axios.post('http://localhost:3001/api/user/login', { username, password });
      console.log(res.data);
     
      localStorage.setItem('token', res.data.token); 
      history.push('/');
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Login;