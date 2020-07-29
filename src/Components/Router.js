import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from '../Login';
import App from '../App';
import Modify from '../Modify';
import AdminPage from './AdminPage';
import axios from 'axios';
const PERMISSION={
    DENY: "DENY",
    READ: "READ",
    WRITE: "WRITE"

};

const PermissionRoute =({Permission, component: Component, ...others}) =>{
    return (
        <Route 
            {...others}
            render={props =>{
                if (!Permission) return <Denied />;
                if (Permission === PERMISSION.DENY){
                    return <Denied />;
                }else{
                    return <Component {...props} Permission={Permission} />;
                }
            
            }}
        />
    );
};


class Denied extends Component{
   
    
    logOut = () => {
       
        axios({
            method : 'post',
            url : '/logout',
            data : {
                msg : 'logout',
            }
        }).then(function(){
            window.location.replace('/');
        });

    }

    render(){
        return(
            <div>
                <br />
                <h1>No Permissions to Access this Page</h1>
                <h2>Or you entered blacklist ID</h2>
                <h2 onClick={this.logOut}>LogOut</h2>
            </div>
        );
    }
}


class Nrouter extends Component{
    
   state = {
        PermissionLevel: '1',
        userPermission: {
            basicPage: PERMISSION.WRITE,
            extraPage: PERMISSION.READ,
            adminPage: PERMISSION.DENY

        }
    }

        

    PermissionLoad = () => {
        axios({
            method:'post',
            url:'/permission',
            data:{
                msg: 'permissionLoad'
            },
        }).then(res => {
            if(res.data != this.state.PermissionLevel) {
                this.setState({PermissionLevel: res.data});
                this.PermissionUpdate();
            }
        });
    }

    
    PermissionUpdate = () => {
        if(this.state.PermissionLevel == '0'){
            this.setState({
                ...this.state,
                userPermission: {
                    basicPage: PERMISSION.DENY,
                    extraPage: PERMISSION.DENY,
                    adminPage: PERMISSION.DENY
                }
            }) 
        }
        if(this.state.PermissionLevel == '3'){
            this.setState({
                ...this.state,
                userPermission: {
                    basicPage: PERMISSION.WRITE,
                    extraPage: PERMISSION.WRITE,
                    adminPage: PERMISSION.WRITE
                }
            })
        }
    }

   render(){
       this.PermissionLoad();
        return(
        <Router>
        <Switch>
            <PermissionRoute path ="/" exact component = {App}
            Permission={this.state.userPermission.basicPage}/>
            <PermissionRoute path = "/login" component = {LoginPage}
            Permission={this.state.userPermission.basicPage}/>
            <PermissionRoute path = "/join" component = {LoginPage}
            Permission={this.state.userPermission.adminPage}/>
            <PermissionRoute path = "/email_auth" component = {LoginPage}
            Permission={this.state.userPermission.adminPage}/>
            <PermissionRoute path = "/modify" component = {Modify}
            Permission={this.state.userPermission.basicPage}/>
            <PermissionRoute path = "/adminPage" component = {AdminPage}
            Permission={this.state.userPermission.adminPage}/>
        </Switch>
        </Router>
        );
   }

}

export default Nrouter;
