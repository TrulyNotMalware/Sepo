import { Link, withRouter, RouteComponentProps, Redirect} from 'react-router-dom';
import React,{Component} from 'react';
import axios from 'axios';
class Session extends Component{

    state = {
        apiResponse :''
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
            this.setState({apiResponse :res.data})
        }).then(() => {
            this.sendMessage(this.state.apiResponse);
        });

    }

    logOut = () => {
        
        axios({
            method : 'post',
            url : '/logout',
            data : {
                msg : 'logout',
            }
        }); 
    }
    render(){
        this.postData();
        if(this.state.apiResponse){
            return(
                <div className="Session">
                    <p>{this.state.apiResponse}</p>
                    <p onClick = {this.logOut}>LogOut</p>
                    <a href = '/modify'>회원정보수정</a>
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
