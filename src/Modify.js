import React from 'react';
import  axios  from 'axios';
import { Link} from 'react-router-dom';

class Modify extends React.Component{
    
    state = {
        first_comment : '',
        second_comment : ''
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

        });
    }

    render(){
        return(
            <div classNmae = "userModify">
                <div>
                        <div>
                            <p>닉네임</p>
                            <input type ="text" name = "first" onChange = {this.changeFirst}/>
                        </div>
                        <div>
                            <p>비밀번호</p>
                            <input type = "password" name = "second" onChange = {this.changeSecond} />
                        </div>
                        <button onClick = {this.postData}>send</button> 
                </div>
            </div>
        );
    }
}

export default Modify;
