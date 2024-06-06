import React, { useState } from 'react';
import axios from 'axios';

const UpdateTask = () => {
  const [taskId, setTaskId] = useState('');
  const [taskData, setTaskData] = useState({ title: '', description: '', status: '' });
  const [loading, setLoading] = useState(false);

  const handleLoadTask = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/tasks/${taskId}`);
      setTaskData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading task:', error);
      alert('Error loading task');
      setLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    const { title, description, status } = taskData; 
    try {
      const response = await axios.put(`http://localhost:3001/api/tasks/${taskId}`, { title, description, status });
      console.log('Task updated successfully:', response.data); // Debugging line
      alert('Task updated successfully');
      setTaskData({ title: '', description: '', status: '' });
      setTaskId('');
    } catch (error) {
      console.error('Error updating task:', error.response ? error.response.data : error.message); 
      alert('Error updating task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <input
        type="text"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleLoadTask} className="bg-blue-500 text-white px-4 py-2 rounded mb-4" disabled={loading}>
        {loading ? 'Loading...' : 'Load Task'}
      </button>
      {taskData.title && (
        <>
          <input
            type="text"
            placeholder="Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <select
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            className="border p-2 mb-2 w-full"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option> 
          </select>
          <button onClick={handleUpdateTask} className="bg-purple-500 text-white px-4 py-2 rounded">
            Update Task
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateTask;