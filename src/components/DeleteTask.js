import React, { useState } from 'react';
import axios from 'axios';

const DeleteTask = () => {
  const [taskId, setTaskId] = useState('');

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
      alert('Task deleted successfully');
      setTaskId('');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Delete Task</h2>
      <input
        type="text"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleDeleteTask} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete Task
      </button>
    </div>
  );
};

export default DeleteTask;