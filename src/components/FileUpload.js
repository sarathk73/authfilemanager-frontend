import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const allowedFormats = ['.png', '.jpg', '.jpeg', '.gif', '.pdf'];
  const maxSize = 5 * 1024 * 1024; // 5 MB

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please provide a file.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedFormats.includes(`.${fileExtension}`)) {
      setError('Unsupported file format. Allowed formats are: .png, .jpg, .jpeg, .gif, .pdf');
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (file.size > maxSize) {
      setError('File size exceeds the allowed limit of 5 MB.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3001/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('File uploaded successfully');
      setFile(null);
      setTimeout(() => setSuccess(''), 5000);
      setError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0 w-full max-w-lg">
        <div className="p-6 md:p-20 flex flex-col justify-between relative w-full">
          <div className="mt-10 md:mt-0">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl animate-pulse">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Upload</span>
              <span className="ml-2 text-gray-500">File</span>.
            </h2>
            <form onSubmit={handleFileUpload} className="bg-white shadow-lg transform transition-transform hover:scale-105 rounded-lg p-6 border border-gray-200">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <div className="mb-4">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="border-2 border-indigo-600 p-3 w-full rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-white bg-green-600 border-2 border-green-600 rounded-full group hover:text-green-600 hover:bg-white">
                  <span className="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="relative z-10">Upload</span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </button>
                <Link to="/dashboard">
                  <a className="relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full group hover:text-white hover:bg-indigo-600">
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span className="relative z-10">Back</span>
                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;