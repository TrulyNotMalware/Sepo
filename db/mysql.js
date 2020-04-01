var mysql = require('mysql');

var connection = mysql.createConnection({
    host : '172.30.1.15',
    user : 'h2',
    password : 'Rjstw750',
    database : 'member_info'
});

module.exports = connection;
