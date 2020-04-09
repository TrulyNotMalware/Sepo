var express = require('express');
var path = require('path');
var app = express();
var mysql = require('./db/mysql.js');
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var id_list;
var cookieParser = require('cookie-parser');
var sign = require('./db/sign.js');
var session = require('express-session');
//mysql.connect();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret : 'secret',
    resave : false,
    saveUninitialized : true,
    cookie :{
        maxAge: 24000 * 60 * 60
    }

}));
app.use(express.static(path.join(__dirname,'public')));

//join
app.post('/join',function(req,res){
    sign.sign_up(req,res);
    }
);
app.get('/joinErr1',function(req,res){    
    res.send('<script type = "text/javascript">alert("공백없이 제출하십시오."); document.location.href = "sign_up.html"</script>');
});
app.get('/joinErr2',function(req,res){
    res.send('<script type = "text/javascript">alert("id를 이메일 형식으로 제출하십시오."); document.location.href = "sign_up.html"</script>');
});
app.get('/joinErr3',function(req,res){
    res.send('<script type = "text/javascript">alert("이미 사용 중인 아이디 입니다."); document.location.href = "sign_up.html"</script>');
});
app.get('/joinErr4',function(req,res){
    res.send('<script type = "text/javascript">alert("비밀번호와 비밀번호 확인이 일치하지 않습니다."); document.location.href = "sign_up.html"</script>');
});

app.get('/joinSuccess',function(req,res){
    res.send('<script type = "text/javascript">alert("회원가입 성공!!."); document.location.href = "index.html"</script>');
});

//login
app.post('/sign_in',function(req,res){
    sign.sign_in(req,res);
});

app.get('/login_success',function(req,res){
    res.send('<script type = "text/javascript">alert("로그인 성공!!."); document.location.href = "index.html"</script>');
});

app.get('/wrong_pw',function(req,res){
    res.send('<script type = "text/javascript">alert("비밀번호가 틀렸습니다. "); document.location.href = "login.html"</script>');
});

app.get('/no_id',function(req,res){
    res.send('<script type = "text/javascript">alert("존재하지 않는 id 입니다."); document.location.href = "login.html"</script>');
});

app.get('/no_active',function(req,res){
    res.send('<script type = "text/javascript">alert("이메일 인증을 통해 계정을 활성화 하세요."); document.location.href = "login.html"</script>');
});
//email_auth

app.post('/email_auth',function(req,res){
   sign.email_auth(req,res); 
});


app.get('/id_active',function(req,res){
    res.send('<script type = "text/javascript">alert("계정이  활성화 되었습니다."); document.location.href = "login.html"</script>');
});

app.get('/wrong_auth',function(req,res){
    res.send('<script type = "text/javascript">alert("잘못된 인증번호 입니다."); document.location.href = "email_auth.html"</script>');
});


app.get('/no_id_auth',function(req,res){
    res.send('<script type = "text/javascript">alert("존재하지 않는 id 입니다."); document.location.href = "email_auth.html"</script>');
});
//server open on port 3000
app.listen(3000, function(){
    console.log('Server on');
});
