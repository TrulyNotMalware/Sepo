import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  axios from 'axios';
class LoginPage extends Component{
    state = {
        id: '',
        passwd: ''
    }
    changeID = (e) => {
        this.setState({id: e.target.value});
    }
    changePW = (e) => {
        this.setState({passwd: e.target.value});
    }
    postData = () => {
        console.log("send");
        axios({
            method : 'post',
            url : '/sign_in',
            data : {
                id : this.state.id,
                pw : this.state.passwd
            }
        });
    }

    //test 'send data from nodejs to react'
    constructor(props){
        super(props)
        this.state = {apiRespnse : "" }
    
    }
    callAPI(){
        fetch("http://175.193.68.230:3001/help")
        .then((res) => res.text())
        .then((res) => this.setState({apiResponse : res}))
    }

    componentDidMount(){
        this.callAPI()
        console.log(this.state)
    }
    render(){
        return (
        
    <div className="body">
        <div className="Wrapper">
            <div className="Entry">
               <div className="login_Wrapper">
                        <div className="login_body">
                                <input type="text" name="id"  placeholder="name" onChange={this.changeID} />
                                <input type="text" name="passwd" placeholder="passwd" onChange={this.changePW} />
                        </div>
            
                           <button onClick = {this.postData}> send </button> 
                    </div>
            </div>
        </div>

            <div>

                <p>{this.state.apiResponse}</p>
            </div>
    </div>
        );
    } 
}

export default LoginPage;
