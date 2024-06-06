// src/components/Dashboard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useHistory, Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    history.push('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/tasks/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Create Tasks
          </button>
        </Link>
        <Link to="/tasks">
          <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
            Get All Tasks
          </button>
        </Link>
        <Link to="/tasks/update">
          <button className="bg-purple-500 text-white px-4 py-2 rounded w-full">
            Update Task
          </button>
        </Link>
        <Link to="/tasks/delete">
          <button className="bg-red-500 text-white px-4 py-2 rounded w-full">
            Delete Task
          </button>
        </Link>
        <Link to="/tasks/get">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full">
            Get Task by ID
          </button>
        </Link>
        <Link to="/upload">
          <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
            Upload File
          </button>
        </Link>
        <Link to="/download">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full">
            Download File
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;