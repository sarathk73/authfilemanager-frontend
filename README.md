# FileTask Portal

FileTask Portal is a comprehensive front-end application built with React. It works in conjunction with the AuthCRUDFileManager API to provide a robust platform for managing tasks and files. Users can securely authenticate, perform CRUD operations on tasks, and manage file uploads and downloads in a user-friendly environment

![FileTask](/src/assets/f4.jpg)
![FileTask](/src/assets/f1.png)
![FileTask](/src/assets/f2.png)
## Features

- **Login & Registration**: Securely register and log in to access your tasks and files.
- **Create, View, Update & Delete Tasks**: Full featured task management to organize your work.
- **File Upload & Download**: Easily manage your files by uploading and downloading as needed.
- **Protected Routes**: Ensures that only authenticated users can access certain areas of the application.
- **Interactive UI**: Modern and interactive user interface for managing tasks and files.
- **Responsive Design**: Works on various devices and screen sizes.

## Folder Structure

Here is a high-level overview of the frontend's directory structure:

```
/frontend
|-- /src
    |-- /assets
        |-- images and other static resources
    |-- /components
        |-- CreateTask.js
        |-- Dashboard.js
        |-- DeleteTask.js
        |-- FileDownload.js
        |-- FileUpload.js
        |-- GetAllTasks.js
        |-- GetTaskById.js
        |-- Login.js
        |-- ProtectedRoute.js
        |-- Register.js
        |-- UpdateTask.js
    |-- /store
        |-- authSlice.js
        |-- store.js
    |-- axiosInterceptor.js
    |-- App.js
    |-- App.css
    |-- index.js
    |-- index.css
    |-- setupTests.js
    |-- reportWebVitals.js
|-- .gitignore
|-- package.json
|-- README.md
|-- tailwind.config.js
```

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To get started with the frontend on your local machine:

1. Clone the repository:

```bash
git clone https://github.com/sarathk73/authfilemanager-frontend
cd authfilemanager-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the project:

```bash
npm start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

Synopsis of the primary components and their use:

- **Register / Login** to create your own account.
- Navigate to the **Dashboard** to manage tasks and files.
- Use **CreateTask** to add new tasks.
- **GetAllTasks** lists all tasks with options to update them via **UpdateTask** or delete via **DeleteTask**.
- **FileUpload** allows easy uploading of files, while **FileDownload** handles downloading files from the server.

## Documentation

For further reference, detailed comments are provided within each component to explain the functionality and state management.


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Reach out to the maintainer at one of the following places:

- LinkedIn at [your-linkedin](https://linkedin.com/in/sarathk73)
- Twitter at [@yourtwitter](https://twitter.com/sarathk73)

## Project Status

The project is actively developed and  do not open to feature suggestions and pull requests.

---

