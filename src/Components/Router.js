import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from '../Login';
import App from '../App';
import Modify from '../Modify';
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
    render(){
        return(
            <div>
                <br />
                <h1>No Permissions to Access this Page</h1>
            </div>
        );
    }
}


class Nrouter extends Component{
    
   state = {
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
            
        });
    }

    test = () =>{
        console.log(this.state.userPermission.adminPage); 
    }
    
    checkLogin =() =>{
       axios({
        method:'post',
        url:'/check_session',
        data:{
            msg:'isLogin?'
        },
        }).then(res => {
            console.log(res.name);
            
        });
    }

   render(){
       this.checkLogin();
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
            Permission={this.state.userPermission.adminPage}/>
        </Switch>
        </Router>
        );
   }

}

export default Nrouter;
