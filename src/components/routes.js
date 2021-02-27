import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Shortener from './Shortener/Shortener';
import Register from './Register/Register';
import Login from './Login/Login';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Shortener} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/im" component={Shortener} />
            <Route exact path="/user" />
        </Switch>
    </BrowserRouter>
)

export default Routes;