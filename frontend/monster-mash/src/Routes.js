import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ProfilePage from './Components/ProfilePage';
import SignUpPage from './Components/SignUpPage'


export default () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route exact path="/home" component={ProfilePage}/>
          <Route exact path="/signup" component={SignUpPage}/>
      </Switch>
    </Router>
  </div>
)
