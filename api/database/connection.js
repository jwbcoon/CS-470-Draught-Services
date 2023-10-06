const {Client} = require('pg');

/*
var connection = mysql.createConnection({
//    debug: true,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
*/

const connection = new Client({
//    debug: true,

    host: '127.0.0.1',
    port: 3306,
    user: 'lej',
    password: 'password',
    database: 'draught_services'
});
connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('SUCCESSFUL CONNECTION');
    }
});

module.exports = connection;
