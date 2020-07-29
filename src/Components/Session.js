import { Link, withRouter, RouteComponentProps, Redirect} from 'react-router-dom';
import React,{Component} from 'react';
import axios from 'axios';
class Session extends Component{

    state = {
        apiResponse :'',
        oldSession:'-1'
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
        }).then(()=>{
          
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
        //if(this.state.oldSession != this.state.apiResponse) window.location.replace('/');
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
