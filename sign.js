var express = require('express');
var path = require('path');
var app = express();
var mysql = require('./mysql.js');
var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var id_list;
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
mysql.connect();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
//sign_up
function sign_up (req,res){
    
      //joinErr1 = 빈칸 제출
      //joinErr2 = id가 이메일 형식이 아님
      //joinErr3 = 이미 사용 중인 아이디
      //joinErr4 = pwd != pwdchk
    
   
       var user_id = req.body.login_ID;
       var user_pwd = req.body.login_PW;
       var user_name = req.body.login_Name;
       var user_pwdchk = req.body.login_PWCheck;
       var id_check = 0;
       var mail_num_check = getRandomInt(100000,999999);
     
    
    
    
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
                         mysql.query('INSERT INTO member (id,pwd,name,auth) VALUES (?,?,?,?)'
                                 ,[user_id,user_pwd,user_name,mail_num_check]
                                 , function(error,result){
                                     if(error){
                                        console.log(error);
                                     }
                                        else{
                                        mail_post(req,res,mail_num_check);
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
    }


//login
function sign_in(req,res){
    
   var check = 0;
   var user_id = req.body.login_ID;
   var user_pw = req.body.login_PW;
    
   mysql.query('SELECT * FROM member',function(err,result){
        for(var i in result){
            //console.log(result[i].id);
            //console.log(user_id);
            if(result[i].id == user_id) {
                check = i;
                check++;
            }
        }
        //console.log(check);
        if(check > 0){
                check--;
                if(result[check].pwd == user_pw){
                    if(result[check].active == 1){
                        req.session.email = user_id;
                        console.log("user_id = " + user_id);
                        console.log("user_pw = " + user_pw)
                        console.log("session = " + req.session.email);
                        res.redirect('/');
                    }
                    else res.redirect('/no_active');
                    
                }
                else res.redirect('/wrong_pw');
        }
        
        else{
            res.redirect('/no_id');
        }

   });
    
}
//email_auth
function email_auth(req,res){
    
    var user_id = req.body.login_ID;
    var user_auth = req.body.auth;
    var check;

    mysql.query('SELECT * FROM member',function(err,result){
        for(var i in result){
            //console.log(result[i].id);
            //console.log(user_id);
            if(result[i].id == user_id) {
                check = i;
                check++;
            }
        }
        //console.log(check);
        if(check > 0){
                check--;
                if(result[check].auth == user_auth){
                    mysql.query('UPDATE member SET active=? WHERE id = ?',
                    ['1',user_id],function(error,result){
                        if(error){
                            console.log(error);
                        }
                        else{
                            res.redirect('/id_active');
                        }
                    })
                }
                else{
                    res.redirect('/wrong_auth')
                }
        }
        
        else{
            res.redirect('/no_id_auth');
        }

   });


}
//mail_post

function mail_post(req,res,check_num){
    
    let email = req.body.login_ID;
    
    let transporter = nodemailer.createTransport({
    
        service : 'gmail',
        auth : {
            user : 'sksghgus7175@gmail.com',
            pass : 'Rjstw750'
        }

    });

    let mailOptions = {
        from : 'sksghgus7175@gmail.com',
        to : email,
        subject : 'check for sign up',
        text : 'Auth Key Number :' + String(check_num)
    };

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email sent');
        }


    });

    return check_num;
}


module.exports.sign_up = sign_up;
module.exports.sign_in = sign_in;
module.exports.email_auth = email_auth;
