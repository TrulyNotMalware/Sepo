function login_write(){
    if(sessionStorage.email!=user.ID){
        document.write('<li><a href=login.html>Login</a></li>');
    }else{
        document.write('<li><a href=login.html>Logout</a></li>');
    }
}