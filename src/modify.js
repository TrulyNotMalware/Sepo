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
                    </div>         
                </div>
            </div>
        );
    }
}

export default Modify;
