var express = require('express');
var path = require('path');
var app = express();
var mysql = require('./db/mysql.js');

mysql.connect();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/join',function(req,res){
    
    var user_id = req.body.login_ID;
    var user_pwd = req.body.login_PW;
    var user_name = req.body.login_Name;
    var user_pwdchk = req.body.login_PWCheck;
   
    
    //console.log(user_id,user_pwd,user_name);
    // console.log(req.body.login_ID);
    
   mysql.query('INSERT INTO member (id,pwd,name) VALUES (?,?,?)'
        ,[user_id,user_pwd,user_name]
        , function(error,result){
            if(error){
                console.log(error);
            }
        });
});
/*mysql.query('INSERT INTO member (id,pwd,name) VALUES (?,?,?)',
        ['t1','111','test'],
        function(error,result){
            if(error){
                console.log(error);
            }
 });
*/
mysql.query('SELECT * from member',function(err,rows,fields){
    if(!err) console.log(rows);
    else console.log(err);
    }
);

app.use(express.static(path.join(__dirname,'public')));

app.listen(3000, function(){
    console.log('Server on');
});
