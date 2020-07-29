var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var mysql = require('./db/mysql.js');
var cors = require('cors');
var sign = require('./routes/sign.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var updown = require('./routes/updown.js');
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret : 'secret',
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60
    }
}));
mysql.connect();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extended : true}));

app.post('/permission',function(req,res){
    
    var Level = '1';
    var AdminPermissionLists = [
    "wodn3322@naver.com",
    "yds05074@naver.com",
    "junsik1998@naver.com",
    "yslle0@naver.com",
    "sksghgus7175@naver.com"
    ];

    var BlackLists = [
    "blacklist",
    ];

    if(req.session.email) {
        console.log(`${req.session.email}`);
        for(var Rep1=0; Rep1<AdminPermissionLists.length;Rep1++){
           if(req.session.email == AdminPermissionLists[Rep1]) Level = '3'; 
        }
        for(var Rep2=0; Rep2<BlackLists.length;Rep2++){
            if(req.session.email == BlackLists[Rep2]) Level = '0';
        }
        console.log(`Admin user ${req.session.name} is login`);
    }
    res.send(Level);

});
app.get('/adminPage', (req,res) => {
    console.log(req);

});

app.get('/',function(req,res){

    fs.readFile('/root/rwp/public/index.html',function(error,data){
        if(error) console.log(error);
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    });
});


//send login,join,email_auth state
app.get('/sendState',function(req,res){
    console.log(req.session.result);
    res.send(req.session.result);
});

//send write,del article,comment state
app.get('/sendArticleState',function(req,res){
    console.log(req.session.article);
    res.send(req.session.article);
});
//join
app.post('/join',function(req,res){
    sign.sign_up(req,res);
});

//login
app.post('/login',function(req,res){
     sign.sign_in(req,res);
});

//email_auth
app.post('/email_auth',function(req,res){
   sign.email_auth(req,res); 
});

//logout
app.post('/logout',function(req,res){
    req.session.destroy(function(){
        req.session;
        res.send('1');
    });
});


//modify_info
app.post('/modify_info',function(req,res){
    sign.modify_member_info(req,res);
});

//show article
app.post('/article',function(req,res,next){
    //console.log(req.body);
    //var sql = 'SELECT * from entries.Programing_' + table + 'where chapter = ?';
    mysql.query('SELECT * from entries.Programing_C',function(error,result){
        if(error) console.log(error);
        else {
            res.send(result);
        }
    });
});

//show comment
app.post('/comment',function(req,res,next){
   
    var num = req.body.article_num;

    //var sql = 'SELECT * from ' + table;
    mysql.query('SELECT * from entries.Programing_C_comment where origin_num = ?' ,num,function(err,result){
        if(err) console.log(err);
        else {
            //console.log(result);
            res.send(result);
        }
    });
});

//write article 
app.post('/write_article',function(req,res,next){
  
    console.log(req.body);
    updown.write_article(req,res,next);
    
});

//wirte comment
app.post('/write_comment',function(req,res,next){
    
   console.log(req.body);
  updown.write_comment(req,res,next);
});

//del article
app.post('/del_article',function(req,res,next){
    console.log(req.body);
    updown.del_article(req,res,next);
});
//del comment
app.post('/del_comment',function(req,res,next){
    
    console.log(req.body);
    updown.del_comment(req,res,next);
});
app.post('/check_session',function(req,res){
    console.log(req.body);
    res.send(req.session.name);
});
//check session
app.get('/session',function(req,res){
    console.log('---check session---');
    console.log(req.session.email);
    console.log(req.session.name);
    //console.log(req.session.dd);
});
app.listen(3001, function(){
    console.log('Server on ver React');
});
