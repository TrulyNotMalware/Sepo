import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import LoginPage from '../Login';
import App from '../App';
import Modify from '../Modify';
const PermissionRoute = ({component: Component, ...others}) =>{
    return (
        <Route 
            {...others}
            render={props =>{
                if (Component){
                    return <Component {...props} />
                }else{
                    return null;
                } 
            }}
        />
    );
};

class Nrouter extends Component{
   render(){
        return(    
        <Router>
        <Switch>
            <PermissionRoute path ="/" exact component = {App} />
            <PermissionRoute path = "/login" component = {LoginPage} />
            <PermissionRoute path = "/join" component = {LoginPage} />
            <PermissionRoute path = "/email_auth" component = {LoginPage} />
            <PermissionRoute path = "/modify" component = {Modify} />
        </Switch>
        </Router>
        );
   }

}

export default Nrouter;
