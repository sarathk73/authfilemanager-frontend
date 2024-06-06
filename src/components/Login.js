import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import loginImg from '../assets/login.png'; // Ensure you have this image in the specified path

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeValue);
    if (rememberMeValue) {
      setUsername(localStorage.getItem('username') || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await axios.post('http://localhost:3001/api/user/login', { username, password });
      console.log('Login response:', res.data); // Debugging line
      
      dispatch(setCredentials({ user: username, token: res.data.token }));
      localStorage.setItem('refreshToken', res.data.refreshToken);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', username);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('username');
      }
      console.log('Access Token:', res.data.token); 
      console.log('Refresh Token:', res.data.refreshToken); // Debugging line

      history.push('/dashboard'); 
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An unexpected error occurred.');
        console.error('Login error:', error.response.data); // Detailed error logging
      } else {
        setErrorMessage('An unexpected error occurred.');
        console.error('Login error:', error.message); // Detailed error logging
      }
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="Login" />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
          <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN IN</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Username</label>
            <input
              className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input
              className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-between text-gray-400 py-2'>
            <p className='flex items-center'>
              <input
                className='mr-2'
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
            SIGN IN
          </button>
          {errorMessage && <div className='text-red-500 text-center mt-2'>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;