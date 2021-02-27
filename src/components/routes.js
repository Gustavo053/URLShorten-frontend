import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import isAuthenticate from '../auth/auth';

import Shortener from './Shortener/Shortener';
import Register from './Register/Register';
import Login from './Login/Login';
import Link from './Link/Link';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticate() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )}
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Shortener} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/im" component={Shortener} />
            <PrivateRoute exact path="/user/:id" component={Link} />
        </Switch>
    </BrowserRouter>
)

export default Routes;