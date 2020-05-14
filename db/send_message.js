//join

function send_join_message(req,res,tagId){
    
    if(tagId == "1" )res.send('<script type = "text/javascript">alert("공백없이 제출하십시오."); document.location.href = "/login.html#!sign_up"</script>');
    
    else if(tagId == "2") res.send('<script type = "text/javascript">alert("id를 이메일 형식으로 제출하십시오."); document.location.href = "/login.html#!sign_up"</script>');
    
    else if(tagId == "3")res.send('<script type = "text/javascript">alert("이미 사용 중인 아이디 입니다."); document.location.href = "/login.html#!sign_up"</script>');
    
    else if(tagId == "4")res.send('<script type = "text/javascript">alert("비밀번호와 비밀번호 확인이 일치하지 않습니다."); document.location.href = "/login.html#!sign_up"</script>');

    else if(tagId == "success")res.send('<script type = "text/javascript">alert("회원가입 성공!!."); document.location.href = "/"</script>');
    
    else res.redirect('/login.html#!sign_up');
};
//login
function send_login_message(req,res,tagId){

    if(tagId == "success") res.send('<script type = "text/javascript">alert("로그인 성공!!."); document.location.href = "/"</script>');

    else if(tagId == "wrong_pw")res.send('<script type = "text/javascript">alert("비밀번호가 틀렸습니다. "); document.location.href = "/login.html"</script>');

    else if(tagId == "no_id") res.send('<script type = "text/javascript">alert("존재하지 않는 id 입니다."); document.location.href = "/login.html"</script>');

    else if(tagId == "no_active") res.send('<script type = "text/javascript">alert("이메일 인증을 통해 계정을 활성화 하세요."); document.location.href = "/login.html"</script>');
    
    else res.redirect('/login.html') ;
}


//email_auth
function send_email_message(req,res,tagId){

    if(tagId == "id_active") res.send('<script type = "text/javascript">alert("계정이  활성화 되었습니다."); document.location.href = "/login.html"</script>');

    else if(tagId == "wrong_auth")res.send('<script type = "text/javascript">alert("잘못된 인증번호 입니다."); document.location.href = "/login.html#!email_auth"</script>');

    else if(tagId = "no_id_auth")res.send('<script type = "text/javascript">alert("존재하지 않는 id 입니다."); document.location.href = "/login.html#!email_auth"</script>');
    
    else res.redirect('/login.html#!email_auth');
}


module.exports.send_login_message = send_login_message;
module.exports.send_email_message = send_email_message;
module.exports.send_join_message = send_join_message;
