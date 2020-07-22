import React, {Component} from 'react';
//import { history } from 'history';
import { Link, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    render(){
        return(
            <div>
                <header>
                    <h1><p className="title"><a href="/">A<sup>+</sup>star</a></p></h1>
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
        forth_comment : '',
        apiResponse : '',
        errMessage: ''
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

    sendMessage = (data) =>{
        var dm = data.split(':');
        
        if(dm[0] === 'l'){
            //console.log('login');    
            if(dm[1] === '0') {
                this.setState({errMessage : '0'});
            }
            else if(dm[1] === '1') this.setState({errMessage : '잘못된 비밀번호입니다.'});
            else if(dm[1] === '2') this.setState({errMessage : '존재하지 않는 id 입니다.'});
            else if(dm[1] === '3') this.setState({errMessage : '이메일 인증을 통해 계정을 활성화 하세요.'});
            else{}
        }
        else if(dm[0] === 'j'){
            //console.log('join');
            if(dm[1] === '0') {
                this.setState({errMessage : '0'});
            }
            else if(dm[1] === '1') this.setState({errMessage : '공백 없이 제출해 주세요.'});
            else if(dm[1] === '2') this.setState({errMessage : 'id를 이메일 형식으로 제출해 주세요.'});
            else if(dm[1] === '3') this.setState({errMessage : '이미 사용중인 아이디 혹은 닉네임 입니다.'});
            else if(dm[1] === '4') this.setState({errMessage : '비밀번호와 비밀번호 확인이 일치하지 않습니다.'});
            else{}

        }
        else if(dm[0] === 'e'){
            //console.log('email')
            if(dm[1] == 0){
                this.setState({errMessage : '0'});
            }
            else if(dm[1] === '1') this.setState({errMessage : '잘못된 인증 번호 입니다.'});
            else if(dm[1] === '2') this.setState({errMessage : '존재하지 않는 id 입니다.'});
            else{}
            
        }
        else{
        
        }
    }
    postData = () => {
        console.log("send");
        axios({
            method : 'post',
            url : this.props.state.path,
            data : {
                first : this.state.first_comment,
                second : this.state.second_comment,
                third : this.state.third_comment,
                forth : this.state.forth_comment,
            },

        }).then(res => {
            this.setState({apiResponse :res.data})
        }).then(() => {
            this.sendMessage(this.state.apiResponse);
        });

    }


    noticeLogin = () =>{
        alert('Login Success');
    }
    render(){
        return(
            <div className="form_body">
                                <Form state = {this.props.state} changeFirst = {this.changeFirst} changeSecond = {this.changeSecond} changeThird = {this.changeThird} changeForth = { this.changeForth}></Form>
                                <button onClick = {this.postData}> send </button>
                                <div className = "errMessage"><p>{this.state.errMessage}</p></div>
                                <div>
                                    {this.state.errMessage === '0'? <Redirect to = '/'/>:null }
                                </div>
            </div>
        )};

    
}
class Form extends Component{
    render(){
        
        if(this.props.state.title == "Join"){
            return(
            
               <div className="login_form_body">
                     <ul>
                        <li><p>{this.props.state.index.first}</p></li>
                         <li><input type="text" name="first_comment" onChange={this.props.changeFirst} /></li>
                         <li><p>{this.props.state.index.second}</p></li>
                        <li><input type="text" name="second_comment"  onChange={this.props.changeSecond} /></li>
                        <li><p>{this.props.state.index.third}</p></li>
                         <li><input type="password" name="third_comment"   onChange={this.props.changeThird} /></li>
                         <li><p>{this.props.state.index.forth}</p></li>
                        <li><input type="password" name="forth_comment"  onChange={this.props.changeForth} /></li>
                    </ul>
                    
               </div>
            )
        }

        else{ 
            return(

               <div className="login_form_body">
                   <form>
                     <ul>
                        <li><p>{this.props.state.index.first}</p></li>
                         <li><input type="text" name="first_comment"   onChange={this.props.changeFirst} /></li>
                         <li><p>{this.props.state.index.second}</p></li>
                        <li><input type="password" name="second_comment"  onChange={this.props.changeSecond} /></li>
                    </ul>
                    </form>
               </div>
        )
       }
    }
}
class Menu extends Component{
    
    render(){
        return(
            <div className = "route_menu">
                    <ul>
                        <li><div className = "button1"><button><a href = {this.props.state.menu.path1}>{this.props.state.menu.first}</a></button></div></li>
                        <hr className = "line" />
                        <li><div className = "button2"><button><a href = {this.props.state.menu.path2}>{this.props.state.menu.second}</a></button></div></li>
                    </ul>
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
            menu : {first : '', second : '', path1 : '', path2 : ''},
            path : ''
        }
    }

    change_for_login = () => {
        this.setState({
            title : 'Login',
            index : {first : 'ID', second : 'PW', third : '', forth : ''},
            menu : {first : 'Join', second : 'Email Auth', path1 : '/join', path2 : 'email_auth'},
            path : '/login'
        });
    }

    change_for_join = () => {
        this.setState({
            title : 'Join',
            index : {first : 'Name', second : 'ID', third : 'PW', forth : 'PWCHK'},
            menu : {first : 'Login', second : 'Email Auth', path1 : '/login' , path2: '/email_auth'},
            path : '/join'
        });
    }

    change_for_email_auth = () => {
        this.setState({
            title : 'Email Auth',
            index : {first : 'ID', second : 'Auth Key', third : '', forth : ''},
            menu : {first : 'Login', second : 'Join', path1 : '/login', path2 : '/join'},
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
            <div className = "Login">
                 <div className="head"><Header title = {this.state.title}></Header></div>
                 <div className="body"><Body state = {this.state}></Body></div>
            </div>
        )};
}

export default withRouter(LoginPage);
