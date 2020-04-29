import React, { Fragment } from 'react';
import './App.css';
import Home from './pages/Home';
import Navigation from './component/Navbar';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Login from './component/Login';
import Register from './component/Register';
import Todo from './component/Todo';
import TaskState from './context/Task/TaskState';
import AuthState from './context/Auth/AuthState';
import AlertState from './context/Alert/AlertState';
import Alerts from './component/Alerts';
import setAuthToken from './context/setAuthToken';
import PrivateRoute from './context/PrivateRoute';

function App() {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return (
    <AuthState>
      <TaskState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navigation />
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/todolist" component={Todo} />
                <Redirect to="/" />
              </Switch>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </TaskState>
    </AuthState>
  );
}

export default App;
