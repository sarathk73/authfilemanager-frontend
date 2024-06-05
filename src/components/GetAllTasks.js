// src/components/GetAllTasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="border p-4 mb-2">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllTasks;