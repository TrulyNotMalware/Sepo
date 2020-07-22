import React from 'react';
import  axios  from 'axios';
import { Link , Redirect } from 'react-router-dom';
class Modify extends React.Component{
    
    state = {
        first_comment : '',
        second_comment : '',
        apiResponse : '',
        errMessage : ''
    }

    changeFirst = (e) =>{
        this.setState({first_comment : e.target.value});
    }
    
    changeSecond = (e) => {
        this.setState({second_comment : e.target.value});
    }

    
    postData = () => {
        console.log("send");
        axios({
            method : 'post',
            url : '/modify_info',
            data : {
                newname : this.state.first_comment,
                password : this.state.second_comment,
            }

        }).then(res => {
            this.setState({apiResponse : res.data})
        }).then(() => {
            this.sendMessage(this.state.apiResponse);
        });
    }

    sendMessage = (data) =>{
        var dm = data.split(':');
        if(dm[1] == 0){
            this.setState({errMessage : '0'});
        }
        else if(dm[1] == 1){
            this.setState({errMessage : '변경할 이름과 비밀번호를 30자 이하로 작성해 주세요.'});
        }
        else if(dm[1] == 2){
        
            this.setState({errMessage : '이미 사용중인 이름입니다.'});
        }
        else if(dm[1] == 3){
            
            this.setState({errMessage : '변경할 정보를 입력해 주세요'});
        }
        else{
        
        }
    }
    render(){
        return(
            <div className="fullBody">
                <div className = "head">
                    <header>
                        <h1><p className="title"><a href="/">A<sup>+</sup>star</a></p></h1>
                        <h2><small><div className = "sub_title"><p className = "subtitle">Modify info</p></div></small></h2>
                    </header>
                </div>
                <div className = "userModify">
                    <div className = "back">
                        <div className = "workName">
                            <h1><p>Modify Info</p></h1>
                        </div>
                        <div  className = "nickname">
                            <p>Nickname</p>
                            <input type ="text" name = "first" onChange = {this.changeFirst}/>
                        </div>
                        <div className = "password">
                            <p>PW</p>
                            <input type = "password" name = "second" onChange = {this.changeSecond} />
                        </div>
                        <button onClick = {this.postData}>send</button>
                        <div className = 'errMessage'><p>{this.state.errMessage}</p></div>
                        <div>{this.state.errMessage === '0'? <Redirect to  = '/'/>:null }</div>
                    </div>         
                </div>
            </div>
        );
    }
}

export default Modify;
