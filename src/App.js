import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import CreateTask from './components/CreateTask';
import GetAllTasks from './components/GetAllTasks';
import UpdateTask from './components/UpdateTask';
import DeleteTask from './components/DeleteTask';
import GetTaskById from './components/GetTaskById';
import ProtectedRoute from './components/ProtectedRoute';
import setupAxiosInterceptors from './axiosInterceptor';

function App() {
  const history = useHistory();

  useEffect(() => {
    setupAxiosInterceptors(history);
  }, [history]);

  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/tasks/create" component={CreateTask} />
        <ProtectedRoute path="/tasks" component={GetAllTasks} exact />
        <ProtectedRoute path="/tasks/update" component={UpdateTask} />
        <ProtectedRoute path="/tasks/delete" component={DeleteTask} />
        <ProtectedRoute path="/tasks/get" component={GetTaskById} />
        <ProtectedRoute path="/upload" component={FileUpload} />
        <ProtectedRoute path="/download" component={FileDownload} />
      </Switch>
    </div>
  );
}

export default App;