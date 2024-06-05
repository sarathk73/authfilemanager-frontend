// src/components/FileDownload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileDownload = () => {
  const [filename, setFilename] = useState('');

  const handleFileDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/files/download/${filename}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Download File</h2>
      <input
        type="text"
        placeholder="Filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleFileDownload} className="bg-yellow-500 text-white px-4 py-2 rounded">
        Download File
      </button>
    </div>
  );
};

export default FileDownload;