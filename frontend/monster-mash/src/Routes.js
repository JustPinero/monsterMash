import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import LoginForm from './Components/LoginPage/LoginForm';


export default () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  </div>
)
