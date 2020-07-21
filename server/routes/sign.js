var express = require('express');
var path = require('path');
var app = express();
var mysql = require('/root/rwp/server/db/mysql.js');
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var id_list;
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var empty = require('is-empty');

require('dotenv').config();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//sign_up
function sign_up (req,res){
    
      //joinErr1 = 빈칸 제출
      //joinErr2 = id가 이메일 형식이 아님
      //joinErr3 = 이미 사용 중인 아이디
      //joinErr4 = pwd != pwdchk
    
   
       var user_id = req.body.second;
       var user_pwd = req.body.third;
       var user_name = req.body.first;
       var user_pwdchk = req.body.forth;
       var id_check = 0;
       var mail_num_check = getRandomInt(100000,999999);
     
    
    
    
      //joinErr1
      if(user_id.length > 0 && user_name.length>0 && user_pwd.length >0 && user_pwdchk.length >0){
         //joinErr2
            if(user_id.match(regExp) != null){
               //joinErr3
               mysql.query('SELECT id,name FROM member',function(err,result){
                 for(var i in result){
                        if(result[i].id == user_id || result[i].name == user_name) id_check += 1;
                    }
                 if(id_check == 0){
                     //joinErr4
                     if(user_pwd == user_pwdchk){
                         mysql.query('INSERT INTO member (id,pwd,name,auth) VALUES (?,?,?,?)'
                                 ,[user_id,user_pwd,user_name,mail_num_check]
                                 , function(error,result){
                                     if(error){
                                        console.log(error);
                                     }
                                        else{
                                        mail_post(req,res,mail_num_check);
                                        req.session.result = "j:0";
                                        req.session.save(function(){
                                        res.redirect('/sendState');
                                        });

                                        }


                         });
                        }

                        else{
                            req.session.result = "j:4";
                            req.session.save(function(){
                            res.redirect('/sendState');
                            });
                        }
                    }
    
                 else{
                     req.session.result = "j:3";
                    req.session.save(function(){
                    res.redirect('/sendState');
                    })
                 }
              })
             } 
         else{
            req.session.result = "j:2";
            req.session.save(function(){
            res.redirect('/sendState');
        })
         }   
        }

     else{
        req.session.result = "j:1";
        req.session.save(function(){
            res.redirect('/sendState');
        });
     }
    }



//login
function sign_in(req, res) {

    var check = 0;
    var user_id = req.body.first;
    var user_pw = req.body.second;
    var user_name;
    mysql.query('SELECT * FROM member', function(err, result) {
        for (var i in result) {
            //console.log(result[i].id);
            //console.log(user_id);
            if (result[i].id == user_id) {
                check = i;
                check++;
            }
        }
        //console.log(check);
        if (check > 0) {
            check--;
            if (result[check].pwd == user_pw) {
                if (result[check].active == 1) {
                    req.session.email = user_id;
                    mysql.query('SELECT name from member where id = ?', user_id, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log("result[0].name ="+result[0].name);
                            user_name = result[0].name;
                            req.session.email = user_id;
                            req.session.name = user_name;
                            req.session.result = "l:0";
                            req.session.save(function() {
                                res.redirect('/sendState');
                            });
                            //callbackFunc(req,res,'l:0');
                            //console.log("session.email = " + req.session.email);
                            //console.log("session.name = " + req.session.name);
                        }
                    });
                } else {
                    req.session.result = "l:3";
                    req.session.save(function() {
                        res.redirect('/sendState');
                    });
                }
            } else {
                req.session.result = "l:1";
                req.session.save(function() {
                    res.redirect('/sendState');
                });

            }
        } else {
            req.session.result = "l:2";
            req.session.save(function() {
                res.redirect('/sendState');
            });
        }


    });

}
//email_auth
function email_auth(req, res) {

    var user_id = req.body.first;
    var user_auth = req.body.second;
    var check;

    mysql.query('SELECT * FROM member', function(err, result) {
        for (var i in result) {
            //console.log(result[i].id);
            //console.log(user_id);
            if (result[i].id == user_id) {
                check = i;
                check++;
            }
        }
        //console.log(check);
        if (check > 0) {
            check--;
            if (result[check].auth == user_auth) {
                mysql.query('UPDATE member SET active=? WHERE id = ?',
                    ['1', user_id],
                    function(error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            req.session.result = "e:0";
                            req.session.save(function() {
                                res.redirect('/sendState');
                            });

                        }
                    })
            } else {
                    req.session.result = "e:1";
                            req.session.save(function() {
                                res.redirect('/sendState');
                            });

            }
        } else {
            req.session.result = "e:2";
            req.session.save(function() {
            res.redirect('/sendState');
            });

        }

    });

}
//mail_post

function mail_post(req, res, check_num) {

    let email = req.body.second;

    let transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        }

    });

    let mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'check for sign up',
        text: 'Auth Key Number :' + String(check_num)
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }


    });

    return check_num;
}

//modify member info
function modify_member_info(req, res) {

    var id = req.session.email;
    var old_name = req.session.name;
    var new_passwd = NoScriptOrString(req.body.password);
    var new_name = NoScriptOrString(req.body.newname);
    var check = 0;

    console.log(new_passwd,new_name);
    
    
    if ((!empty(new_name) && new_name.length > 30) || (!empty(new_passwd) && new_passwd.length > 30)) {

        res.send('<script type = "text/javascript">alert("이름과 비밀번호는 30자 이하로 작성해 주세요."); document.location.href = "/"</script>');
    } else {
        if (!empty(new_name) && !empty(new_passwd)) {

            mysql.query("SELECT name FROM member_info.member", function(err, result) {
                if (err) console.log(err);
                else {
                    for (var i in result) {
                        if (new_name == result[i].name) check++;
                    }

                    if (check == 0) {
                        mysql.query("UPDATE member_info.member SET name = ?, pwd = ?  where id = ?", [new_name, new_passwd, id], function(err, result) {
                            if (err) console.log(err);
                        });

                        mysql.query("UPDATE entries.Programing_C SET author = ?  where author = ?", [new_name, old_name], function(err, result) {
                            if (err) console.log(err);
                        });

                        mysql.query("UPDATE entries.Programing_C_comment SET author = ?  where author = ?", [new_name, old_name], function(err, result) {
                            if (err) console.log(err);
                        });

                        mysql.query("UPDATE game_board.tetris SET player = ?  where player = ?", [new_name, old_name], function(err, result) {
                            if (err) console.log(err);
                        });

                        req.session.destroy();
                        res.send('<script type = "text/javascript">alert("변경된 정보로 다시 로그인 해주세요."); document.location.href = "/"</script>');
                    } else {

                        res.send('<script type = "text/javascript">alert("이미 사용중인 이름 입니다."); document.location.href = "/"</script>');
                    }
                }
            });
        } else if (!empty(new_name)) {


            mysql.query("SELECT name FROM member_info.member", function(err, result) {
                if (err) console.log(err);
                else {
                    for (var i in result) {
                        if (new_name == result[i].name) check++;
                    }

                    if (check == 0) {
                        mysql.query("UPDATE member_info.member SET name = ? where id = ?", [new_name, id], function(err, result) {
                            if (err) console.log(err);
                        });

                        mysql.query("UPDATE entries.Programing_C SET author = ?  where author = ?", [new_name, old_name], function(err, result) {
                            if (err) console.log(err);
                        });

                        mysql.query("UPDATE entries.Programing_C_comment SET author = ?  where author = ?", [new_name, old_name], function(err, result) {
                            if (err) console.log(err);
                        });

                        mysql.query("UPDATE game_board.tetris SET player = ?  where player = ?", [new_name, old_name], function(err, result) {
                            if (err) console.log(err);
                        });

                        req.session.destroy();
                        res.send('<script type = "text/javascript">alert("변경된 정보로 다시 로그인 해주세요."); document.location.href = "/"</script>');
                    } else {

                        res.send('<script type = "text/javascript">alert("이미 사용중인 이름 입니다."); document.location.href = "/"</script>');
                    }
                }

            });
        } else if (!empty(new_passwd)) {

            mysql.query("UPDATE member_info.member SET pwd = ? where id = ?", [new_passwd, id], function(err, result) {
                if (err) console.log(err);
                else {
                    req.session.destroy();
                    res.send('<script type = "text/javascript">alert("변경된 정보로 다시 로그인 해주세요."); document.location.href = "/"</script>');
                }
            });

        } else {
            res.send('<script type = "text/javascript">alert("변경할 정보를 입력해 주세요."); document.location.href = "/"</script>');
        }
    }
    
    //req.session.destroy();
    //res.send('<script type = "text/javascript">alert("변경된 비밀번호로 다시 로그인 해주세요."); document.location.href = "/"</script>');
    
}

function NoScriptOrString(comments) {
    comments = comments.replace(/</g, "&lt;");
    comments = comments.replace(/>/g, "&gt;");
    comments = comments.replace(/\"/g, "&quot;");
    comments = comments.replace(/\'/g, "&#39;");
    return comments;
}
module.exports.sign_up = sign_up;
module.exports.sign_in = sign_in;
module.exports.email_auth = email_auth;
module.exports.modify_member_info = modify_member_info;
