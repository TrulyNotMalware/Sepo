var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var mysql = require('./db/mysql.js');
var send_message = require('./routes/send_message.js');
var cors = require('cors');
var sign = require('./routes/sign.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
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


app.get('/',function(req,res){

    fs.readFile('/root/rwp/public/index.html',function(error,data){
        if(error) console.log(error);
        else{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    });
});


//join
app.post('/join',function(req,res){
    sign.sign_up(req,res);
    }
);

app.get('/sendState',function(req,res){
    res.send(req.session.result);
})
//login
app.post('/login',function(req,res){
     sign.sign_in(req,res);
         /*,result){
         if(result == 'l:0'){
             req.session.email = req.body.first;
             req.session.result = result;
             req.session.save(function(){
                res.redirect('/t');
             });
         }
         else res.send(result);
     });*/
});

//email_auth
app.post('/email_auth',function(req,res){
   sign.email_auth(req,res); 
});

app.get('/help',function(req,res){

    console.log('help');
    console.log("state : " + req.session.state);
    /*
    mysql.query("SELECT * from member_info.member",function(err,result){
        if(err) console.log(err);
        else res.send(result);
    });*/
    res.send(req.session.state);

});

app.post('/json',function(req,res,next){
    console.log(req.body);
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
//check session
app.get('/session',function(req,res){
    console.log('---check session---');
    console.log(req.session.email);
    console.log(req.session.name);
    //console.log(req.session.dd);
});

app.get('/set',function(req,res){
    req.session.dd = 'dd';
    req.session.save(function(){
        console.log('set session');
        res.redirect('/');
    });
})
//login
app.post('/sign_in',function(req,res){

    sign.sign_in(req,res);
});

app.get('/mysql',function(req,res){
    console.log("pls");
    mysql.query("SELECT * from member_info.member",function(err,result){
        if(err) console.log(err);
        else console.log(result);
    });
});
app.listen(3001, function(){
    console.log('Server on ver React');
});
