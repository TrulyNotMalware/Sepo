import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  axios from 'axios';
/*
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
*/

class Header extends Component {
    render(){
        return(
            <div>
                <header>
                    <h1><p className="title"><a href="Index.html">A<sup>+</sup>star</a></p></h1>
                    <h2><small><div className = "sub_title"><p className = "subtitle">{this.props.title}</p></div></small></h2>
                </header>
            </div>
        )
    }
}

class Body extends Component {

    render(){
        return (
            <div className="Wrapper">
                <div className="Entry">
                    <div className="login_Wrapper">
                        <div className="login_head">
                           <div className = "sub_title"><strong>{this.props.state.title}</strong></div>
                        </div>
                        <div className="login_body">
                            <Submit state = {this.props.state}></Submit>
                            <Menu state = {this.props.state}></Menu>
                        </div>
                    </div>
                </div>
            </div>

       )};
    
}

class Submit extends Component{

    state = {
        first_comment: '',
        second_comment: '',
        third_comment : '',
        forth_comment : ''
    }
    changeFirst = (e) => {
        this.setState({first_comment: e.target.value});
    }
    changeSecond = (e) => {
        this.setState({second_comment: e.target.value});
    }

    changeThird = (e) => {
        this.setState({third_comment: e.target.value});
    }
    changeForth = (e) => {
        this.setState({forth_comment: e.target.value});
    }
    postData = () => {
        console.log("send");
        axios({
            method : 'post',
            url : this.props.state.path,
            data : {
                id : this.state.id,
                pw : this.state.passwd
            }
        });
    }

    render(){
        return(
            <div className="body">
                <div className="Wrapper">
                    <div className="Entry">
                        <div className="login_Wrapper">
                                <Form state = {this.props.state}></Form>
                                <button onClick = {this.postData}> send </button> 
                        </div>
                    </div>
                </div>
                <div>
                    <p>{this.state.apiResponse}</p>
                </div>
            </div>
        )};

    
}
class Form extends Component{
    render(){
        
        if(this.props.state.title == "Join"){
            return(
            
               <div className="login_body">
                     <ul>
                        <li><p>{this.props.state.index.first}</p></li>
                         <li><input type="text" name="id" onChange={this.changeFirst} /></li>
                         <li><p>{this.props.state.index.second}</p></li>
                        <li><input type="text" name="passwd"  onChange={this.changeSecond} /></li>
                        <li><p>{this.props.state.index.third}</p></li>
                         <li><input type="text" name="id"   onChange={this.changeThird} /></li>
                         <li><p>{this.props.state.index.forth}</p></li>
                        <li><input type="text" name="passwd"  onChange={this.changeForth} /></li>
                    </ul>
               </div>
            )
        }

        else return(

               <div className="login_body">
                     <ul>
                        <li><p>{this.props.state.index.first}</p></li>
                         <li><input type="text" name="id"   onChange={this.changeFirst} /></li>
                         <li><p>{this.props.state.index.second}</p></li>
                        <li><input type="text" name="passwd"  onChange={this.changeSecond} /></li>
                    </ul>
               </div>
        )
    }
}
class Menu extends Component{
    
    render(){
        return(
            <div>
                <menu>
                    <ul>
                        <li><p>{this.props.state.menu.first}</p></li>
                        <li><p>{this.props.state.menu.second}</p></li>
                    </ul>
                </menu>
            </div>
        )
    }
}

class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            title : '',
            index : {first : '', second : '', third : '', forth : ''},
            menu : {first : '', second : ''},
            path : ''
        }
    }

    change_for_login = () => {
        this.setState({
            title : 'Login',
            index : {first : 'ID', second : 'PW', third : '', forth : ''},
            menu : {first : 'Join', second : 'Email Auth'},
            path : '/login'
        });
    }

    change_for_join = () => {
        this.setState({
            title : 'Join',
            index : {first : 'Name', second : 'ID', third : 'PW', forth : 'PWCHK'},
            menu : {first : 'Login', second : 'Email Auth'},
            path : '/join'
        });
    }

    change_for_email_auth = () => {
        this.setState({
            title : 'Email Auth',
            index : {first : 'ID', second : 'Auth Key', third : '', forth : ''},
            menu : {first : 'Login', second : 'Join'},
            path : '/email_auth'
        });
    }

    render(){

        let url = this.props.location.pathname.substr(1); 

        if(url == "login"){
            if(this.state.title != "Login") {
                this.change_for_login()
            };
        }   
        else if(url == "join"){
            if(this.state.title != "Join"){
                this.change_for_join()
            }
        }
        else if(url == "email_auth"){
            if(this.state.title != "Email Auth"){
                this.change_for_email_auth()
            }
        }
        else{
        }


        return(
            <div>
                 <div className="head"><Header title = {this.state.title}></Header></div>
                 <div className="body"><Body state = {this.state}></Body></div>
            </div>
        )};
}

export default LoginPage;
