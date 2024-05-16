import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('token'); 
    history.push('/login'); 
  };

  
  const handleFileUpload = () => {
    
  };

  const handleFileDownload = () => {
    
  };

  const handleCreateTask = () => {
    
  };

 

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleFileUpload}>Upload File</button>
      <button onClick={handleFileDownload}>Download File</button>
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default Dashboard;