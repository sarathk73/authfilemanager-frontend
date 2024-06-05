import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
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
      </Switch>
    </div>
  );
}

export default App;