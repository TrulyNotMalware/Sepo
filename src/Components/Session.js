import { Link, withRouter, RouteComponentProps, Redirect} from 'react-router-dom';
import React,{Component} from 'react';
import axios from 'axios';

class Session extends Component{

    state = {
        apiResponse :'',
        oldSession:'-1',
        PermissionLevel: '1'
    }

    sendMessage = (data) => {
        //console.log(data);
    }
    postData = () => {
        axios({
            method : 'post',
            url : '/check_session',
            data : {
                msg : 'for session',
            },

        }).then(res => {
            this.setState({oldSession : this.state.apiResponse},function(){
                this.setState({oldSession : this.state.apiResponse},function(){
                    this.setState({apiResponse : res.data});
                }); 
            });
        });

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
                console.log(this.state.PermissionLevel);
            }
        });
    }

    
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
        if((this.state.apiResponse === '' && this.state.oldSession === '-1')  || this.state.apiResponse != this.state.oldSession) {
            console.log(this.state.apiResponse,this.state.oldSession);    
            this.postData();
            
            //window.location.replace('/');
        }
        
        if(this.state.apiResponse){
            this.PermissionLoad();
            if(this.state.PermissionLevel == '3') {
                return( 
                    <div className="Session">
                        <p>{this.state.apiResponse}</p>
                        <p onClick = {this.logOut}>LogOut</p>
                        <a href = '/modify'>회원정보수정</a>
                        <br />
                        <a href = '/adminPage'>AdminPage</a>
                    </div>
                )
            }
            return(
                <div className="Session">
                    <p>{this.state.apiResponse}</p>
                    <p onClick = {this.logOut}>LogOut</p>
                    <a href = '/modify'>회원정보수정</a>
                    <br />
                </div>
            );
        }
        else{
            return(
                <div className = "Session">
                    <a href = '/login'>Login</a>
                </div>
            )
        }
    }
}

export default Session;
