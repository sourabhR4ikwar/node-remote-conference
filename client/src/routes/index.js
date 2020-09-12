import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Pages
import App from "../containers/App";
import RegisterPage from '../pages/Register';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import JoinConference from '../pages/JoinConference';
import HostConference from "../pages/HostConference";
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="" exact component={HomePage} />
    <Route path="register" component={RegisterPage} />
    <Route path="login" component={LoginPage} />
    <Route path="join-conference" component={JoinConference} />
    <Route path="join-conference/:id" component={JoinConference} />
    <Route path="host-conference" component={HostConference} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="profile" component={Profile} />
    <Route path="*" exact component={PageNotFound} />
  </Route>
);