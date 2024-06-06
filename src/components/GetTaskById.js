import React, { useState } from 'react';
import axios from 'axios';

const GetTaskById = () => {
  const [taskId, setTaskId] = useState('');
  const [task, setTask] = useState(null);

  const handleGetTask = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/tasks/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Error fetching task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Get Task by ID</h2>
      <input
        type="text"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleGetTask} className="bg-yellow-500 text-white px-4 py-2 rounded">
        Get Task
      </button>
      {task && (
        <div className="border p-4 mt-4">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p><strong>ID:</strong> {task._id}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
      )}
    </div>
  );
};

export default GetTaskById;