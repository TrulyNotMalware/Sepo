var express = require('express');
var path = require('path');
var app = express();
var mysql = require('./db/mysql.js');
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var id_list;
mysql.connect();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//join
app.post('/join',function(req,res){
    
    //joinErr1 = 빈칸 제출
    //joinErr2 = id가 이메일 형식이 아님
    //joinErr3 = 이미 사용 중인 아이디
    //joinErr4 = pwd != pwdchk
    
   
    var user_id = req.body.login_ID;
    var user_pwd = req.body.login_PW;
    var user_name = req.body.login_Name;
    var user_pwdchk = req.body.login_PWCheck;
    var id_check = 0;
    
    
    
    
    //joinErr1
    if(user_id.length > 0 && user_name.length>0 && user_pwd.length >0 && user_pwdchk.length >0){
        //joinErr2
        if(user_id.match(regExp) != null){
            //joinErr3
            mysql.query('SELECT id FROM member',function(err,result){
                for(var i in result){
                    if(result[i].id == user_id) id_check += 1;
                }
                if(id_check == 0){
                    //joinErr4
                    if(user_pwd == user_pwdchk){
                        mysql.query('INSERT INTO member (id,pwd,name) VALUES (?,?,?)'
                                ,[user_id,user_pwd,user_name]
                                , function(error,result){
                                    if(error){
                                       console.log(error);
                                    }
                                    else{
                                        res.redirect('/joinSuccess');
                                    }


                        });
                    }

                    else{
                        res.redirect('/joinErr4');
                    }
                }

                else{
                    res.redirect('/joinErr3');
                }
             })
            } 
        else{
            res.redirect('/joinErr2');
        }   
    }

    else{
        res.redirect('/joinErr1');
    }
});

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
app.use(express.static(path.join(__dirname,'public')));

//login

app.post('/sign_in',function(req,res){
    
   var check = 0;
   var user_id = req.body.login_ID;
   var user_pw = req.body.login_PW;
    
   mysql.query('SELECT * FROM member',function(err,result){
        for(var i in result){
            if(result[i].id == user_id) {
                check = i;
                check++;
            }
        }
        console.log(check);
        if(check > 0){
                check--;
                if(result[check].pwd == user_pw) res.redirect('/login_success');
                else res.redirect('/wrong_pw');
        }
        
        else{
            res.redirect('/no_id');
        }

   });
    
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
app.listen(3000, function(){
    console.log('Server on');
});
