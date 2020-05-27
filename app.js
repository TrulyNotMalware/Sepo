var express = require('express');
var path = require('path');
var app = express();
var mysql = require('./db/mysql.js');
var updown = require('./db/updown.js');
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var id_list;
var cookieParser = require('cookie-parser');
var sign = require('./db/sign.js');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var http = require('http');
var moment = require('moment');
var $ = require('jquery');
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
var getJSON = require('get-json');
var upload = updown.up();
var send_message = require('./db/send_message.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret : 'secret',
    resave : false,
    saveUninitialized : true,

}));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/download')));

//join
app.post('/join',function(req,res){
    sign.sign_up(req,res);
    }
);

app.get('/joinErr/:tagId',function(req,res){
    tagId = req.params.tagId.substr(1);
    send_message.send_join_message(req,res,tagId);
});

//login
app.post('/sign_in',function(req,res){
    sign.sign_in(req,res);
});
app.get('/login/:tagId',function(req,res){
    tagId = req.params.tagId.substr(1);
    send_message.send_login_message(req,res,tagId);
});

//email_auth
app.post('/email_auth',function(req,res){
   sign.email_auth(req,res); 
});

app.get('/email/:tagId',function(req,res){
    tagId = req.params.tagId.substr(1);
    send_message.send_email_message(req,res,tagId);
});

//modify member_info
app.post('/modify',function(req,res){
    
    sign.modify_member_info(req,res);
    
});

//log_out

app.get('/log_out',function(req,res){
    console.log(req.session.email +" is logged out");
    req.session.destroy();
    res.send('<script type = "text/javascript">alert("로그아웃 되었습니다."); document.location.href = "/"</script>');
});

//post writinig data
app.post('/json',function(req,res,next){
    mysql.query('SELECT * from entries.Programing_C',function(error,result){
        if(error) console.log(error);
        else {
            res.send(result);
            
        }
    });
});

//post comment data
app.post('/jsonComment',function(req,res,next){
    
    mysql.query('SELECT * from entries.Programing_C_comment',function(err,result){
        if(err) console.log(err);
        else {
            res.send(result);
        }
    });
});
//post login session
app.post('/session',function(req,res,next){

    res.send(req.session);
})
//글 작성
app.post('/write',upload,function(req,res,next){
    updown.write(req,res,next);
    console.log("write");
});

//글 삭제
app.post('/delarticle',function(req,res,next){
    updown.del_txt(req,res,next);
});


//댓글 작성
app.post('/writeComment',function(req,res,next){
   
    updown.write_comment(req,res,next);
})


app.post('/getHash',function(req,res){
    
    console.log(req.body);
    res.send(req.body);
});

//server open on port 3000

app.get('/',function(req,res){

    fs.readFile('./public/Index.html',function(error,data){
        if(error) console.log(error);
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    });
});

app.listen(3000, function(){
    console.log('Server on');
});
