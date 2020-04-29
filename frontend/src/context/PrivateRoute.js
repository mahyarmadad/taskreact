import React, { useContext } from 'react';
import AuthContect from './Auth/AuthContext';
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const authContext = useContext(AuthContect);
    const { isAuthenticated, loading } = authContext;


    return (
        <Route {...rest} render={props => !isAuthenticated && !loading ?
            (<Redirect to="/" />) : (<Component {...props} />)} />
    );
}

export default PrivateRoute;