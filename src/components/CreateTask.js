// src/components/CreateTask.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/tasks', newTask);
      alert('Task created successfully');
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;