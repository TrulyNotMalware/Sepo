import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { histroy } from 'histroy';
import App LoginPage from '../Login';


const PermissionRoute = ({component: Component, others}) =>{
    return (
        <Route 
            {others}
            
        />
    );
};

export default PermissionRoute;
